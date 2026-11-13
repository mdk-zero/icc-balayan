import type { Metadata } from "next";
import Link from "next/link";
import { FacebookSpotlight } from "@/components/facebook-spotlight";
import { PageHeader } from "@/components/page-header";
import { YouTubeSpotlight } from "@/components/youtube-spotlight";
import { formatDate, posts } from "@/lib/news";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, events and school notices from Immaculate Conception College of Balayan.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        current="/news"
        title="News and announcements"
        lead="School notices, events and enrollment dates, with the latest from the school’s Facebook page and YouTube channel."
      >
        <div className="flex flex-wrap gap-3">
          <a href={links.facebook} className="btn">
            Follow on Facebook
          </a>
          <a href={links.youtube} className="btn-line">
            Watch on YouTube
          </a>
        </div>
      </PageHeader>

      <div className="wrap space-y-16 py-14 lg:space-y-24 lg:py-20">
        <FacebookSpotlight />
        <YouTubeSpotlight />

        {posts.length > 0 ? (
          <section aria-labelledby="announcements-heading">
            <h2 id="announcements-heading" className="type-section">
              Announcements
            </h2>
            <ol className="mt-8 max-w-4xl">
              {posts.map((post) => (
                <li key={post.slug} className="row-line first:border-t-[3px] first:border-royal">
                  <Link
                    href={`/news/${post.slug}`}
                    className="group grid gap-x-10 gap-y-2 py-7 sm:grid-cols-[10rem_1fr]"
                  >
                    <time dateTime={post.date} className="type-ui pt-1 text-slate-soft">
                      {formatDate(post.date)}
                    </time>
                    <span>
                      <span className="type-sub block decoration-2 underline-offset-4 group-hover:underline">
                        {post.title}
                      </span>
                      <span className="mt-2 block max-w-[60ch] text-slate">{post.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
    </>
  );
}
