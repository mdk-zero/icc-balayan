<?php
/**
 * Settings for the News page's Facebook feed. On the server, save a copy as
 * iccbi-feeds/config.php in the cPanel home folder, beside public_html and
 * never inside it. The README's "Facebook and YouTube on the News page"
 * section explains where each value comes from.
 */
return [
    // The page's numeric ID.
    'facebook_page_id' => '',
    // A Page access token that never expires.
    'facebook_token' => '',
    // Optional. The Meta app's secret, if "Require app secret" is on.
    'facebook_app_secret' => '',
];
