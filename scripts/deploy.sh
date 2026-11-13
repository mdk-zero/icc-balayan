#!/usr/bin/env bash
# Uploads the built site in out/ to the server over FTP with TLS. Run it as
# `npm run deploy`, which builds first. The FTP login is read from deploy.env.
#
# Only files that changed since the last deploy are uploaded. After each
# deploy, a list of every file and its checksum is saved in .deploy/, and the
# next deploy compares the new build against it. A file is deleted from the
# server only when an earlier deploy uploaded it and the new build no longer
# has it, so files this script didn't put there are never touched.
#
#   npm run deploy               build, then upload what changed
#   npm run deploy -- --dry-run  build and list the changes without connecting
#   npm run deploy -- --all      upload every file, not just the changed ones
#   npm run deploy -- --check    log in and list the deploy folder, nothing else

set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
out=$root/out
config=$root/deploy.env

dry_run=false
upload_all=false
check=false
for arg in "$@"; do
  case $arg in
    --dry-run) dry_run=true ;;
    --all) upload_all=true ;;
    --check) check=true ;;
    *)
      echo "Unknown option $arg. Use --dry-run, --all or --check." >&2
      exit 2
      ;;
  esac
done

if [[ ! -f $out/index.html ]]; then
  echo "There is no build in out/. Run \`npm run deploy\`, which builds first." >&2
  exit 1
fi
if [[ ! -f $config ]]; then
  echo "deploy.env is missing. Copy deploy.env.example to deploy.env and fill in the FTP login. The README explains each setting." >&2
  exit 1
fi

# deploy.env is read as plain KEY=value lines rather than run as shell code,
# so a password can contain any character. Windows line endings and a pair of
# quotes around a value are tolerated.
FTP_HOST="" FTP_USER="" FTP_PASSWORD="" FTP_PORT=21 FTP_DIR=.
skip_re='^[[:space:]]*(#|$)'
double_quoted_re='^"(.*)"$'
single_quoted_re="^'(.*)'$"
while IFS= read -r line || [[ -n $line ]]; do
  line=${line%$'\r'}
  [[ $line =~ $skip_re ]] && continue
  if [[ $line != *=* ]]; then
    echo "deploy.env: can't read the line \"$line\"" >&2
    exit 1
  fi
  key=${line%%=*}
  key=${key//[[:space:]]/}
  value=${line#*=}
  if [[ $value =~ $double_quoted_re || $value =~ $single_quoted_re ]]; then
    value=${BASH_REMATCH[1]}
  fi
  case $key in
    FTP_HOST | FTP_USER | FTP_PASSWORD | FTP_PORT | FTP_DIR) printf -v "$key" '%s' "$value" ;;
    *)
      echo "deploy.env: unknown setting $key" >&2
      exit 1
      ;;
  esac
done <"$config"

required=(FTP_HOST FTP_USER)
$dry_run || required+=(FTP_PASSWORD)
for key in "${required[@]}"; do
  if [[ -z ${!key} ]]; then
    echo "deploy.env: $key is empty" >&2
    exit 1
  fi
done
if [[ ! $FTP_PORT =~ ^[0-9]+$ ]]; then
  echo "deploy.env: FTP_PORT must be a number" >&2
  exit 1
fi
FTP_DIR=${FTP_DIR:-.}

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# lftp's quoting: double quotes, with backslashes and quotes escaped.
q() {
  local s=${1//\\/\\\\}
  printf '"%s"' "${s//\"/\\\"}"
}

# The password reaches lftp through LFTP_PASSWORD, never on a command line.
# A failed login or a missing folder stops the run before anything is sent.
# TLS is held to 1.2: in testing, lftp's uploads over TLS 1.3 sometimes
# arrived cut short (whole 16 KB records missing) with no error on either
# side. The host offers TLS 1.2 with ECDHE and AES-GCM, which is still sound.
connect() {
  cat <<EOF
set cmd:fail-exit true
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ftp:ssl-protect-list true
set ssl:priority "NORMAL:-VERS-TLS1.3"
set net:timeout 20
set net:max-retries 2
set net:reconnect-interval-base 5
set dns:fatal-timeout 20
open --env-password -p $FTP_PORT -u $(q "$FTP_USER") $(q "$FTP_HOST")
cd $(q "$FTP_DIR")
lcd $(q "$out")
EOF
}

need_lftp() {
  if ! command -v lftp >/dev/null; then
    echo "lftp isn't installed. Install it with: sudo pacman -S lftp" >&2
    exit 1
  fi
}

if $check; then
  need_lftp
  {
    connect
    echo "echo $(q "Logged in to $FTP_HOST as $FTP_USER. $FTP_DIR holds:")"
    echo "cls -1aF"
  } >"$tmp/check.lftp"
  LFTP_PASSWORD=$FTP_PASSWORD lftp -f "$tmp/check.lftp"
  echo "If that list has public_html, mail and etc, this is the home folder: set FTP_DIR=public_html."
  echo "If it has the site itself (index.html, or WordPress's wp-content), FTP_DIR is right."
  exit 0
fi

# One saved list per server folder, so deploying to a test subdomain doesn't
# mix up the list for the main site. Each line is a checksum, two spaces and
# a path relative to out/.
state_dir=$root/.deploy
saved=$state_dir/$(printf '%s' "$FTP_USER@$FTP_HOST:$FTP_PORT/$FTP_DIR" | tr -c 'A-Za-z0-9.@-' '_').list

(cd "$out" && find . -type f -print0 | LC_ALL=C sort -z | xargs -0 sha256sum) |
  sed 's|^\([0-9a-f]*\)  \./|\1  |' | LC_ALL=C sort >"$tmp/new.list"
if [[ -f $saved ]]; then
  LC_ALL=C sort "$saved" >"$tmp/old.list"
else
  : >"$tmp/old.list"
fi

paths() { cut -c67- "$1" | LC_ALL=C sort; }

if $upload_all; then
  paths "$tmp/new.list" >"$tmp/upload"
else
  # A changed file has a new checksum, so its line is only in the new list.
  LC_ALL=C comm -13 "$tmp/old.list" "$tmp/new.list" | cut -c67- | LC_ALL=C sort >"$tmp/upload"
fi
LC_ALL=C comm -23 <(paths "$tmp/old.list") <(paths "$tmp/new.list") >"$tmp/remove"

# Pages and their data files go up last, and only once everything else has
# arrived, so nobody gets a page whose scripts aren't on the server yet. Old
# files are deleted only after everything new is up.
mapfile -t assets < <(grep -Ev '\.(html|txt)$' "$tmp/upload")
mapfile -t pages < <(grep -E '\.(html|txt)$' "$tmp/upload")
uploads=("${assets[@]}" "${pages[@]}")
mapfile -t removals <"$tmp/remove"

# Folders the new build no longer has, deepest first. rmdir only removes an
# empty folder, so one that still holds someone else's files stays.
mapfile -t gone_dirs < <(
  for path in "${removals[@]}"; do
    dir=$path
    while [[ $dir == */* ]]; do
      dir=${dir%/*}
      [[ -d $out/$dir ]] || printf '%s\n' "$dir"
    done
  done | LC_ALL=C sort -ru
)

echo "Deploying to $FTP_DIR on $FTP_HOST as $FTP_USER"
if [[ ! -s $tmp/old.list ]]; then
  echo "This computer hasn't deployed to that folder before, so every file goes up."
fi
echo "${#uploads[@]} files to upload, ${#removals[@]} to delete."

if $dry_run; then
  for path in "${uploads[@]}"; do echo "  upload  $path"; done
  for path in "${removals[@]}"; do echo "  delete  $path"; done
  echo "Dry run: nothing was sent."
  exit 0
fi

if ((${#uploads[@]} == 0 && ${#removals[@]} == 0)); then
  echo "Nothing changed since the last deploy."
  exit 0
fi

need_lftp

# Uploads a batch of files, then reads back each one's size on the server and
# compares it with the local copy. A transfer can end early without either
# side reporting an error, and a file recorded as deployed isn't sent again,
# so a mismatch stops the deploy before anything is recorded.
sent=0
upload() {
  (($#)) || return 0
  local path dir size failed=false
  local -a bad=()
  local -A remote=()
  {
    connect
    for path; do
      if [[ $path == */* ]]; then printf '%s\n' "${path%/*}"; fi
    done | LC_ALL=C sort -u | while IFS= read -r dir; do
      echo "mkdir -p -f $(q "$dir")"
    done
    for path; do
      sent=$((sent + 1))
      echo "echo $(q "[$sent/${#uploads[@]}] $path")"
      echo "put $(q "$path") -o $(q "$path")"
    done
    echo "cache flush"
    printf 'cls -1 --size --block-size=1'
    for path; do printf ' %s' "$(q "$path")"; done
    printf ' > %s\n' "$(q "$tmp/sizes")"
  } >"$tmp/upload.lftp"

  : >"$tmp/sizes"
  LFTP_PASSWORD=$FTP_PASSWORD lftp -f "$tmp/upload.lftp" || failed=true
  while read -r size path; do remote[$path]=$size; done <"$tmp/sizes"
  for path; do
    [[ ${remote[$path]-} == "$(stat -c %s "$out/$path")" ]] || bad+=("$path")
  done
  ((${#bad[@]})) || return 0

  if $failed && [[ ! -s $tmp/sizes ]]; then
    echo "The upload stopped before it finished." >&2
  else
    echo "${#bad[@]} files didn't arrive whole on the server:" >&2
    printf '  %s\n' "${bad[@]:0:10}" >&2
    ((${#bad[@]} <= 10)) || echo "  and $((${#bad[@]} - 10)) more" >&2
  fi
  echo "Nothing was recorded as deployed. Run npm run deploy again to send the changed files again." >&2
  exit 1
}

upload "${assets[@]}"
upload "${pages[@]}"

if ((${#removals[@]})); then
  {
    connect
    echo "set cmd:fail-exit false"
    for path in "${removals[@]}"; do echo "rm -f $(q "$path")"; done
    for dir in "${gone_dirs[@]}"; do echo "rmdir -f $(q "$dir")"; done
  } >"$tmp/remove.lftp"

  echo "Deleting ${#removals[@]} files the new build no longer has."
  if ! LFTP_PASSWORD=$FTP_PASSWORD lftp -f "$tmp/remove.lftp"; then
    echo "Some old files couldn't be deleted. They do no harm; remove them in File Manager if you like." >&2
  fi
fi

mkdir -p "$state_dir"
cp "$tmp/new.list" "$saved"
echo "Done."
