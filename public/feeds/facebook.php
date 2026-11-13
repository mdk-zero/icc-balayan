<?php
/**
 * The school's latest Facebook posts for the News page, read through the
 * Graph API with the Page access token in iccbi-feeds/config.php. The README
 * explains how a page admin makes that token.
 */

require __DIR__ . '/feed-lib.php';

// Meta keeps each version for about two years and quietly moves calls on an
// expired one to the oldest version still running.
const GRAPH_VERSION = 'v26.0';
const POST_COUNT = 10;

feed_serve('facebook', function (): array {
    $config = feed_config();
    $page = trim((string) ($config['facebook_page_id'] ?? ''));
    $token = trim((string) ($config['facebook_token'] ?? ''));
    if ($page === '' || $token === '') {
        throw new RuntimeException('facebook_page_id or facebook_token is missing from iccbi-feeds/config.php');
    }

    $query = [
        'fields' => 'message,created_time,permalink_url,full_picture',
        // Extra, because posts without text (cover photo changes) are skipped.
        'limit' => 25,
        'access_token' => $token,
    ];
    $secret = trim((string) ($config['facebook_app_secret'] ?? ''));
    if ($secret !== '') {
        $query['appsecret_proof'] = hash_hmac('sha256', $token, $secret);
    }

    [$status, $body] = feed_get(
        'https://graph.facebook.com/' . GRAPH_VERSION . '/' . rawurlencode($page) . '/posts?' . http_build_query($query)
    );
    $data = json_decode($body, true);
    if ($status !== 200 || !isset($data['data']) || !is_array($data['data'])) {
        throw new RuntimeException($data['error']['message'] ?? "HTTP $status from the Graph API");
    }

    $posts = [];
    foreach ($data['data'] as $post) {
        $text = trim((string) ($post['message'] ?? ''));
        $link = feed_https_url($post['permalink_url'] ?? null);
        if ($text === '' || $link === null) {
            continue;
        }
        $posts[] = [
            'text' => $text,
            'image' => feed_https_url($post['full_picture'] ?? null),
            'link' => $link,
            'date' => feed_date($post['created_time'] ?? null),
        ];
        if (count($posts) === POST_COUNT) {
            break;
        }
    }
    return $posts;
});
