import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, posts } from "@/lib/news";

export const dynamicParams = false;

// A static export needs at least one page per route, so until the first post
// is added this builds a placeholder that shows the not-found page.
export function generateStaticParams() {
  if (posts.length === 0) return [{ slug: "__placeholder__" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <header className="bg-facade">
        <div className="wrap pb-12 pt-10 sm:pt-14 lg:pb-16 lg:pt-20">
          <Link href="/news" className="link type-ui font-[600]">
            All news
          </Link>
          <h1 className="type-title mt-6 max-w-[20ch]">{post.title}</h1>
          <time dateTime={post.date} className="type-ui mt-5 block text-slate">
            {formatDate(post.date)}
          </time>
        </div>
      </header>
      <div className="wrap py-14 lg:py-20">
        <div className="prose-block max-w-[64ch] text-slate">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
