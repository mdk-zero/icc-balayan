<?php
/**
 * Shared by facebook.php and youtube.php, which feed the News page.
 *
 * Each feed is fetched at most once every 30 minutes and saved, and visitors
 * are always sent the saved copy. When a fetch fails, the last good copy keeps
 * being served and the reason is written to errors.log, so an expired
 * Facebook key leaves the page showing older posts instead of nothing.
 *
 * Settings and the saved copies live in an `iccbi-feeds` folder beside the
 * website's folder (on cPanel, /home/<account>/iccbi-feeds/). That keeps the
 * Facebook key out of reach of visitors, and uploading a new copy of the site
 * doesn't wipe them. Written for PHP 7.4 and later.
 */

const FEED_FRESH_FOR = 1800; // seconds a saved copy is served before refetching
const FEED_RETRY_AFTER = 300; // seconds to wait after a failed fetch

function feed_home(): string
{
    return dirname(__DIR__, 2) . '/iccbi-feeds';
}

/** The settings in iccbi-feeds/config.php, or an empty array without one. */
function feed_config(): array
{
    $file = feed_home() . '/config.php';
    $config = is_file($file) ? include $file : [];
    return is_array($config) ? $config : [];
}

function feed_cache_dir(): string
{
    $dir = feed_home() . '/cache';
    if (is_dir($dir) || @mkdir($dir, 0750, true)) {
        return $dir;
    }
    // The home folder isn't writable; a temporary folder still saves fetches.
    $dir = sys_get_temp_dir() . '/iccbi-feeds-cache';
    @mkdir($dir, 0700, true);
    return $dir;
}

function feed_log(string $dir, string $name, string $message): void
{
    $line = sprintf("[%s] %s: %s\n", date(DATE_ATOM), $name, $message);
    @file_put_contents("$dir/errors.log", $line, FILE_APPEND | LOCK_EX);
}

/** GETs a URL. Returns [status, body]; throws only if no response came back. */
function feed_get(string $url): array
{
    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_USERAGENT => 'iccbalayan.edu.ph news feed',
        ]);
        $body = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        $error = curl_error($curl);
        if ($body === false) {
            throw new RuntimeException("no response ($error)");
        }
        return [$status, $body];
    }

    $context = stream_context_create(['http' => [
        'timeout' => 10,
        'ignore_errors' => true,
        'user_agent' => 'iccbalayan.edu.ph news feed',
    ]]);
    $body = @file_get_contents($url, false, $context);
    if ($body === false) {
        throw new RuntimeException('no response');
    }
    $status = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('#^HTTP/\S+ (\d{3})#', $header, $match)) {
            $status = (int) $match[1];
        }
    }
    return [$status, $body];
}

/** The URL if it is https, otherwise null, so nothing like javascript: reaches a link. */
function feed_https_url($value): ?string
{
    return is_string($value) && strpos($value, 'https://') === 0 ? $value : null;
}

/** Any date PHP can read, as ISO 8601 that every browser parses. */
function feed_date($value): ?string
{
    $time = is_string($value) ? strtotime($value) : false;
    return $time === false ? null : date(DATE_ATOM, $time);
}

/**
 * Sends the saved copy of a feed as JSON, refetching it first if it is older
 * than FEED_FRESH_FOR. $fetch returns the feed's items or throws.
 *
 * Response: { items: [...], updated: when it last fetched successfully,
 * stale: true when the last attempt failed }.
 */
function feed_serve(string $name, callable $fetch): void
{
    $dir = feed_cache_dir();
    $file = "$dir/$name.json";
    $saved = is_file($file) ? json_decode((string) @file_get_contents($file), true) : null;
    if (!is_array($saved)) {
        $saved = ['items' => [], 'fetched' => 0, 'attempted' => 0, 'failed' => false];
    }

    $now = time();
    $due = $now - $saved['fetched'] >= FEED_FRESH_FOR && $now - $saved['attempted'] >= FEED_RETRY_AFTER;

    // Only one request refetches; anyone arriving meanwhile gets the saved copy.
    $lock = $due ? @fopen("$dir/$name.lock", 'c') : false;
    if ($lock && flock($lock, LOCK_EX | LOCK_NB)) {
        $saved['attempted'] = $now;
        try {
            $saved['items'] = array_values($fetch());
            $saved['fetched'] = $now;
            $saved['failed'] = false;
        } catch (Throwable $error) {
            $saved['failed'] = true;
            feed_log($dir, $name, $error->getMessage());
        }
        @file_put_contents($file, json_encode($saved), LOCK_EX);
        flock($lock, LOCK_UN);
    }
    if ($lock) {
        fclose($lock);
    }

    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: public, max-age=300');
    header('X-Content-Type-Options: nosniff');
    echo json_encode([
        'items' => $saved['items'],
        'updated' => $saved['fetched'] ? date(DATE_ATOM, $saved['fetched']) : null,
        'stale' => $saved['failed'],
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
