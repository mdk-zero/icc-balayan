import { useEffect, useState } from "react";

/**
 * The News page's Facebook and YouTube feeds. The site itself is static
 * files, so the posts are fetched in the browser from the two PHP files in
 * public/feeds/, which keep a saved copy on the server. `next dev` can't run
 * PHP, so there the feeds show their fallback; `npm run preview` runs them.
 */

export type FacebookPost = {
  text: string;
  image: string | null;
  /** The post on facebook.com. */
  link: string;
  /** ISO 8601. */
  date: string | null;
};

export type YouTubeVideo = {
  id: string;
  title: string;
  /** ISO 8601. */
  date: string | null;
};

export type Feed<T> = { status: "loading" } | { status: "ready"; items: T[] } | { status: "empty" };

/** Loads a feed once; "empty" covers both no items and a failed request. */
export function useFeed<T>(url: string): Feed<T> {
  const [feed, setFeed] = useState<Feed<T>>({ status: "loading" });

  useEffect(() => {
    let current = true;
    fetch(url, { headers: { accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { items?: T[] } | null) => {
        if (!current) return;
        const items = Array.isArray(data?.items) ? data.items : [];
        setFeed(items.length > 0 ? { status: "ready", items } : { status: "empty" });
      })
      .catch(() => {
        if (current) setFeed({ status: "empty" });
      });
    return () => {
      current = false;
    };
  }, [url]);

  return feed;
}

export function formatFeedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  });
}

/** Moves to a slide instantly for people who ask for reduced motion. */
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
