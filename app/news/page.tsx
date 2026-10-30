import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
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
        lead="School notices, events and enrollment dates. The latest also go out on the school's Facebook page."
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

      <section aria-label="Posts" className="wrap py-14 lg:py-20">
        {posts.length === 0 ? (
          <div className="trim max-w-2xl pt-5">
            <h2 className="type-sub">No announcements posted here yet</h2>
            <p className="mt-3 text-slate">
              Until the first post appears, the school&rsquo;s Facebook page has the
              latest announcements and enrollment dates.
            </p>
            <a href={links.facebook} className="link type-ui mt-4 inline-block font-[600]">
              facebook.com/ICCBalayanIncOfficial
            </a>
          </div>
        ) : (
          <ol className="max-w-4xl">
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
        )}
      </section>
    </>
  );
}
