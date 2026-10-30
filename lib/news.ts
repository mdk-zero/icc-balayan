/**
 * News posts, newest first. The old site's news page pulled from Facebook and
 * has been empty since the access token expired, so this starts empty.
 *
 * To publish a post, add an entry here:
 *
 *   {
 *     slug: "enrollment-2027-2028",
 *     title: "Enrollment for school year 2027–2028 is open",
 *     date: "2027-04-15",
 *     summary: "One or two sentences shown on the news list.",
 *     body: ["First paragraph.", "Second paragraph."],
 *   },
 */

export type NewsPost = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary: string;
  body: string[];
};

export const posts: NewsPost[] = [];

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+08:00`).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  });
}
