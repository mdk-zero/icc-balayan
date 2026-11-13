# ICC Balayan — website redesign

A redesign of iccbalayan.edu.ph, built with Next.js 16 (App Router) and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview  # http://localhost:8080, with the News page feeds (needs PHP)
npm run deploy   # build and upload to the server over FTP (see "Deploying with one command")
npm run typecheck
```

## Pages

The menus mirror the old site's, so returning visitors find pages where they left them.

| Path | Old site page |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/about/history` | History of ICC |
| `/about/mission-and-vision` | Mission and Vision, plus the Philosophy of Education |
| `/about/core-values` | Core Values |
| `/about/seal` | School Seal |
| `/about/accreditations` | Accreditations |
| `/about/icc-march` | ICC March |
| `/inside-iccbi/administrators` | ICC Admin 1935–Present |
| `/inside-iccbi/board-of-trustees` | Board of Trustees |
| `/inside-iccbi/administrative-board` | Administrative Board |
| `/inside-iccbi/directory` | Directory |
| `/academics` | Academics |
| `/admissions` | Admission (registration forms) |
| `/facilities` | Facilities |
| `/news`, `/news/[slug]` | News (blog) |
| `/alumni` | Alumni Directory |
| `/contact` | Contact |

Every old WordPress address redirects to its new page (`public/.htaccess`), so links already shared on Facebook or in search results keep working. The old site's Library link is left out because `library.iccbalayan.edu.ph` no longer resolves.

## Editing content

Almost all copy lives in `lib/site.ts`: contact details, mission and vision, core values, programs, accreditation, enrollment steps, history, leadership, the campus directory and the facilities photos. Announcements written for the site go in `lib/news.ts`; the file explains the format. The News page's Facebook posts and YouTube videos update on their own (see below).

The core values, the philosophy of education and the mission/vision wording are transcribed from the school's January 2026 graphics on the old site. Photos, portraits and the ICC March MP3 were copied from the old site into `public/images/` and `public/media/`.

Images are served exactly as they are in `public/`; nothing resizes them on the server. Compress new photos before adding them: about 1,800 px wide for full-width photos and 900 px for portraits, as JPEG or WebP, usually under 300 KB.

## Facebook and YouTube on the News page

The News page shows the school's 10 latest Facebook posts one at a time, and its 8 latest YouTube videos with the newest one large. Videos play on the page. The site itself is still plain files, so two small PHP files in `public/feeds/` do the fetching on the server:

- `/feeds/facebook.php` reads the page's posts through Meta's Graph API with a Page access token.
- `/feeds/youtube.php` reads the channel's public video list. It needs no key and no setup. It leaves out Shorts, and the channel is set in the file (`CHANNEL_ID`).

Each one fetches at most every 30 minutes and saves a copy, and visitors get the saved copy. If a fetch fails, for example because the Facebook token stopped working, the page keeps showing the last saved posts and the reason goes into a log. If nothing was ever saved, the section shows a link to the Facebook page or YouTube channel instead.

The settings and saved copies live in an `iccbi-feeds` folder in the cPanel home folder, beside `public_html` and never inside it. Visitors can't reach the token there, and uploading a new version of the site doesn't touch it.

`npm run dev` can't run PHP, so on localhost:3000 both sections show their fallback link. `npm run preview` builds the site and serves it with PHP at localhost:8080, where the YouTube section works. Facebook also works there if `iccbi-feeds/config.php` exists in the project folder; git ignores that folder.

### Connecting Facebook (once, by a page admin)

Someone who is an admin of the school's Facebook page does this. It takes about 15 minutes. Meta moves its menus around now and then, so the names below may differ slightly.

**1. Create a Meta app.**
1. Sign in at [developers.facebook.com](https://developers.facebook.com) with the admin's Facebook account. Register as a developer if asked; it's free.
2. Choose **My Apps › Create app**. Name it something like "ICCBI website". For the use case, pick **Manage everything on your Page**. If that isn't offered, pick **Other** and then the **Business** app type. If asked, connect it to the school's business portfolio.
3. Leave the app in **Development** mode. Reading the school's own page doesn't need Meta's App Review.

**2. Make a Page access token that doesn't expire.** Use route A if the page belongs to a Meta business portfolio (check at [business.facebook.com/settings](https://business.facebook.com/settings) › Accounts › Pages). Otherwise use route B.

*Route A, a system user (recommended).* A system user belongs to the business rather than to a person, so the token survives staff changes and password resets.
1. In [business settings](https://business.facebook.com/settings), open **Users › System users** and click **Add**. Name it "ICCBI website" and give it the **Employee** role.
2. With the system user selected, click **Assign assets**. Under **Pages**, choose the ICC page and allow it to view content. Under **Apps**, choose the app from step 1.
3. Click **Generate new token**. Choose the app, set the expiration to **Never**, and tick `pages_show_list` and `pages_read_engagement`. Copy the token.
4. Open the [Graph API Explorer](https://developers.facebook.com/tools/explorer/), paste that token into **Access Token**, and run `me/accounts?fields=id,name,access_token`. The ICC page's `id` is the page ID and its `access_token` is the Page token. Copy both.

*Route B, the admin's own account.* This token is tied to that person. It stops working if they lose admin rights on the page, change their Facebook password, or remove the app. When that happens, repeat these steps.
1. Open the [Graph API Explorer](https://developers.facebook.com/tools/explorer/) and choose the app in **Meta App**.
2. Under **Permissions**, add `pages_show_list` and `pages_read_engagement`. Click **Generate Access Token**, approve it, and choose the ICC page when asked.
3. Click the **i** beside the token, then **Open in Access Token Tool**, then **Extend Access Token**. Copy the long-lived token it shows.
4. Back in the Explorer, paste the long-lived token into **Access Token** and run `me/accounts?fields=id,name,access_token`. Copy the ICC page's `id` and `access_token`. If the list comes back empty, add the `business_management` permission in step 2 and start again.

**3. Check the token.** Paste the Page token into the [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/). It should say **Type: Page** and **Expires: Never**.

**4. Put it on the server.**
1. In cPanel **File Manager**, go to the home folder, the one that contains `public_html`. Create a folder named `iccbi-feeds`.
2. Inside it, create a file named `config.php`. Paste in the contents of `feeds-config.example.php` from this project, fill in the page ID and token, and save.
3. Open `https://iccbalayan.edu.ph/feeds/facebook.php`. It should list the latest posts. If it says `"stale": true` with no items, wait five minutes and reload. After a failed attempt the server waits five minutes before trying again.

`facebook_app_secret` is optional. Fill it in (from the app's **App settings › Basic**) only if the app's **Require app secret** setting is turned on.

### When the feeds stop updating

Open `/feeds/facebook.php` or `/feeds/youtube.php` in a browser. `updated` is when the last successful fetch happened. `"stale": true` means the most recent attempt failed, and the reason is in `iccbi-feeds/cache/errors.log` in File Manager. For Facebook, the usual cause is a token that stopped working: make a new one (step 2) and replace it in `config.php`. To refetch right away, delete the feed's `.json` file in `iccbi-feeds/cache/`.

Facebook's photo addresses expire after a few weeks. If the feed has been failing for a long time, the old saved posts start showing the school seal in place of their photos.

## Deploying to cPanel

The site is exported as plain HTML, CSS, JavaScript and images, so any cPanel host can serve it. It needs no Node.js and no terminal on the server. The News page's two feeds use PHP, which cPanel hosts run as standard (the old WordPress site needed it too). Connecting Facebook is a separate one-time step; see [Connecting Facebook](#connecting-facebook-once-by-a-page-admin).

**1. Build the upload file.** On this computer, run `npm run zip`. It builds the site into `out/` and packs it as `iccbi-website.zip` in the project folder. In Windows File Explorer the project is at `\\wsl.localhost\archlinux\home\mdk0\Projects\icc-website`.

**2. Back up the current site.** The WordPress site lives in `public_html`. In cPanel, open **File Manager**, select `public_html`, choose **Compress** and download the archive. Also export the WordPress database from **phpMyAdmin**.

**3. Try it on a subdomain first (recommended).** In cPanel, open **Domains** and create something like `new.iccbalayan.edu.ph`, with its own folder. Upload the zip there as in step 4 and check every page. The site must sit at the top of a domain or subdomain. It will not work in a subfolder like `public_html/new/`, because its links start at `/`.

**4. Upload and extract.**
1. In **File Manager**, open the target folder (`public_html` for the main site).
2. Click **Upload**, choose `iccbi-website.zip` and wait for it to finish.
3. Back in the folder, right-click the zip, choose **Extract**, and extract into the same folder.
4. Delete the zip.

`index.html` and `.htaccess` must end up directly inside the folder, not in a subfolder. Turn on **Settings › Show Hidden Files** to see `.htaccess`.

**5. Replace WordPress (main site only).** Once the backup is downloaded, move the WordPress files out of `public_html` before extracting: `wp-admin`, `wp-content`, `wp-includes`, `wp-*.php`, `index.php`, `xmlrpc.php` and the old `.htaccess`. Leave any folder you don't recognise alone, because subdomains and other services often keep their files inside `public_html`.

**6. Turn on HTTPS.** In **Domains**, switch on **Force HTTPS Redirect** for the domain.

**To update the site later**, edit the files and run `npm run deploy` (set up below). Without it, run `npm run zip` again, then upload and extract the new zip over the old files, choosing to overwrite when asked.

### Deploying with one command

`npm run deploy` builds the site and uploads it over FTP, encrypted with TLS. It replaces steps 1 and 4 above. After the first time it sends only the files that changed. It deletes a file from the server only if an earlier deploy uploaded it and the new build no longer has it, so anything it didn't put there (`.well-known`, `cgi-bin`, other subdomains' folders, a WordPress backup) is never touched. The hosting plan has no SSH, so FTP is the way in.

**Set it up once.**
1. In cPanel, open **FTP Accounts** and add an account just for deploying. Log in: `deploy`. Directory: change it to `public_html`, because cPanel fills in `public_html/deploy`. Generate a strong password and keep a copy. This account can only reach `public_html`, so it can't touch the Facebook settings in `iccbi-feeds`.
2. Install lftp in WSL: `sudo pacman -S lftp`.
3. Copy `deploy.env.example` to `deploy.env`, fill in the username (`deploy@iccbalayan.edu.ph`) and the password, and run `chmod 600 deploy.env`. Git ignores this file.
4. Run `npm run deploy -- --check`. It logs in and lists the folder it would deploy to, without changing anything. You should see the site's own files (`index.html`, or WordPress's `wp-content`). If you see `public_html`, `mail` and `etc`, you're logged in with the main cPanel account: set `FTP_DIR=public_html`.
5. Run `npm run deploy -- --dry-run`. It builds the site and lists what it would upload and delete, without connecting.

**Then, each time,** run `npm run deploy`.

- If it stops partway, run it again. Scripts and images go up, and their sizes on the server are checked, before any page that uses them. Old files are deleted only at the end, so the live site keeps working in the meantime.
- If it stops with a certificate error, the host has probably moved the account to another server. Set `FTP_HOST` in `deploy.env` to the hostname on cPanel's **Server Information** page.
- `npm run deploy -- --all` uploads every file, for example after files were changed or deleted in File Manager.
- The record of what was uploaded is kept in `.deploy/` on this computer. The first deploy from another computer uploads everything once.

The first deploy to `public_html` replaces the WordPress site, so do steps 2 and 5 above first. To try a test subdomain first (step 3), add a second FTP account whose directory is the subdomain's folder and put its login in `deploy.env` while testing.

## Before launch: content the school must confirm

Search the code for `CONFIRM:` to find each one.

1. **Mission and vision labels.** The old About page calls "A life-giving and innovating school community…" the mission and the four commitments the vision. The school's January 2026 Mission and Vision graphic labels them the other way round. Swap the two words in `site.statementLabels` once the school decides.
2. **Accreditation is out of date on the old site.** Its certificates all expired in 2016–2017 (PAASCU elementary to March 2017, PAASCU high school to May 2016, PACUCOA BSBA and BEEd to April 2017). The redesign shows the levels as the old site states them; the school must confirm each program's current level.
3. **Admission requirements** are the usual Philippine school checklist, not an official list from the Registrar's Office.
4. **Enrollment figures** (700+ / 422+ / 260+ / 850+) are carried over from the old homepage.
5. **Sr. Cynthia F. Camuta's years.** The old site lists 1994–2000, which looks like a typo; she is shown as 2024–present.
6. **Facilities photos** date from 2017 and have no room names on the old site, so captions describe what is shown.
7. **Library catalogue.** Restore a Library link once `library.iccbalayan.edu.ph` is back online.
8. **The contact form** composes an email in the visitor's mail app (`mailto:`). Nothing is sent from the server. The alumni directory uses the school's existing Google Form.
9. **Facebook on the News page** needs a page admin to connect it once (see [Connecting Facebook](#connecting-facebook-once-by-a-page-admin)). Until then the section shows a link to the Facebook page.
10. **The YouTube channel's newest video is from August 2022**, so "On YouTube" shows 2019–2022 videos until the school uploads again. If the school now posts to a different channel, change `CHANNEL_ID` in `public/feeds/youtube.php`.

## Design

Colors are sampled from the campus: the powder blue the buildings are painted (`facade`, `#86c1ea`), the shield's royal blue (`royal`, `#2e2e8c`), the dark window frames (`slate`, `#1f2a3d`) and the shield's red (`crest`, used only to mark the current page). Tokens are in `app/globals.css`.

Type is Sofia Sans Extra Condensed for display, echoing the lettering around the seal; Literata for reading text; and Sofia Sans for navigation, buttons and captions.

The grade ruler (`components/grade-ruler.tsx`) draws Grade 1 through the fourth year of college as one ruler, with each level as wide as the years it covers. On the homepage the building photo sits behind the hero and sinks at 30% of the scroll speed over the first screen. It uses a CSS scroll-driven animation where the browser supports it, falls back to `components/hero-parallax.tsx` elsewhere, and stays still under reduced motion.
