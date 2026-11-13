<?php
/**
 * The school's latest YouTube videos for the News page, from the channel's
 * public feed. No key or setup needed.
 */

require __DIR__ . '/feed-lib.php';

// youtube.com/@immaculateconceptioncolleg7709
const CHANNEL_ID = 'UCLZ3xTMICC4r0nkzKvbvAEw';
const VIDEO_COUNT = 8;

feed_serve('youtube', function (): array {
    // "UULF" + the channel ID without its "UC" is the channel's uploads minus
    // Shorts. YouTube doesn't document it, so the whole-channel feed is the
    // fallback, with Shorts dropped by their /shorts/ links.
    $sources = [
        'playlist_id=UULF' . substr(CHANNEL_ID, 2),
        'channel_id=' . CHANNEL_ID,
    ];
    $failures = [];
    foreach ($sources as $source) {
        [$status, $body] = feed_get("https://www.youtube.com/feeds/videos.xml?$source");
        $xml = $status === 200 ? @simplexml_load_string($body, 'SimpleXMLElement', LIBXML_NONET) : false;
        if ($xml !== false) {
            return youtube_videos($xml);
        }
        $failures[] = "$source gave HTTP $status";
    }
    throw new RuntimeException(implode('; ', $failures));
});

function youtube_videos(SimpleXMLElement $feed): array
{
    $videos = [];
    foreach ($feed->entry as $entry) {
        $id = (string) $entry->children('http://www.youtube.com/xml/schemas/2015')->videoId;
        $link = (string) $entry->link['href'];
        if (!preg_match('/^[\w-]{11}$/', $id) || strpos($link, '/shorts/') !== false) {
            continue;
        }
        $videos[] = [
            'id' => $id,
            'title' => trim((string) $entry->title),
            'date' => feed_date((string) $entry->published),
        ];
    }
    // A playlist feed lists videos in playlist order, not newest first.
    usort($videos, function (array $a, array $b): int {
        return strcmp((string) $b['date'], (string) $a['date']);
    });
    return array_slice($videos, 0, VIDEO_COUNT);
}
