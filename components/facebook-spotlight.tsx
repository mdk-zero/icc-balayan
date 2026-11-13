"use client";

import { useRef, useState } from "react";
import { formatFeedDate, scrollBehavior, useFeed, type FacebookPost } from "@/lib/feeds";
import { links } from "@/lib/site";

/**
 * The school's latest Facebook posts, one at a time. The slides sit side by
 * side in a scroll-snapping row, so phones swipe between them natively and
 * the arrows and dashes only scroll the row. It never moves on its own.
 * Slides out of view are inert, so keyboards and screen readers stay on the
 * one that's showing.
 */
export function FacebookSpotlight() {
  const feed = useFeed<FacebookPost>("/feeds/facebook.php");
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const posts = feed.status === "ready" ? feed.items : [];

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (track && slide) track.scrollTo({ left: slide.offsetLeft, behavior: scrollBehavior() });
  };

  // The track is the slides' offset parent, so the second slide's offset is
  // the distance between any two.
  const onScroll = () => {
    const track = trackRef.current;
    const stride = (track?.children[1] as HTMLElement | undefined)?.offsetLeft;
    if (track && stride) setIndex(Math.round(track.scrollLeft / stride));
  };

  return (
    <section aria-labelledby="facebook-heading" aria-roledescription="carousel">
      <div className="trim flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-4">
        <h2 id="facebook-heading" className="type-section">
          From Facebook
        </h2>
        {posts.length > 1 ? (
          <div className="flex items-center gap-2">
            <p aria-live="polite" className="type-ui mr-2 tabular-nums text-slate-soft">
              {index + 1} of {posts.length}
            </p>
            <ArrowButton direction="previous" atEnd={index === 0} onClick={() => goTo(index - 1)} />
            <ArrowButton direction="next" atEnd={index === posts.length - 1} onClick={() => goTo(index + 1)} />
          </div>
        ) : null}
      </div>

      {feed.status === "loading" ? (
        <div className="mt-8 grid gap-6 md:grid-cols-[5fr_4fr] md:items-center lg:gap-12">
          <p role="status" className="sr-only">
            Loading Facebook posts
          </p>
          <div className="aspect-[4/3] bg-facade-pale" />
          <div aria-hidden="true" className="space-y-3">
            <div className="h-4 w-36 bg-facade-pale" />
            <div className="h-4 bg-facade-pale" />
            <div className="h-4 bg-facade-pale" />
            <div className="h-4 w-2/3 bg-facade-pale" />
          </div>
        </div>
      ) : null}

      {feed.status === "empty" ? (
        <div className="mt-6 max-w-2xl">
          <p className="text-slate">The school&rsquo;s latest announcements are on its Facebook page.</p>
          <a href={links.facebook} className="link type-ui mt-3 inline-block font-[600]">
            facebook.com/ICCBalayanIncOfficial
          </a>
        </div>
      ) : null}

      {posts.length > 0 ? (
        <>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="feed-track relative mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain"
          >
            {posts.map((post, i) => (
              <div
                key={post.link}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${posts.length}`}
                inert={i !== index}
                className="w-full shrink-0 snap-start"
              >
                <article className="grid gap-6 md:grid-cols-[5fr_4fr] md:items-center lg:gap-12">
                  <PostImage src={post.image} eager={i === 0} />
                  <div>
                    {post.date ? (
                      <time dateTime={post.date} className="type-ui text-slate-soft">
                        {formatFeedDate(post.date)}
                      </time>
                    ) : null}
                    <p className="mt-3 line-clamp-10 whitespace-pre-line text-slate">{post.text}</p>
                    <a href={post.link} className="link type-ui mt-5 inline-block font-[600]">
                      Read on Facebook
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {posts.length > 1 ? (
            <div className="-ml-1 mt-5 flex flex-wrap">
              {posts.map((post, i) => (
                <button
                  key={post.link}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show post ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group grid h-8 w-8 place-items-center"
                >
                  <span
                    className={`h-[3px] w-6 transition-colors ${
                      i === index ? "bg-royal" : "bg-facade-line group-hover:bg-facade"
                    }`}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

/** A post's photo, or the seal on façade blue when it has none or it won't load. */
function PostImage({ src, eager }: { src: string | null; eager: boolean }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="grid aspect-[4/3] place-items-center bg-facade">
        <img src="/icc-logo.png" alt="" className="w-1/3" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full bg-facade-pale object-cover"
    />
  );
}

/**
 * aria-disabled rather than disabled at either end, so a keyboard user who
 * reaches the last post keeps focus on the button.
 */
function ArrowButton({
  direction,
  atEnd,
  onClick,
}: {
  direction: "previous" | "next";
  atEnd: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "next" ? "Next post" : "Previous post"}
      aria-disabled={atEnd}
      onClick={atEnd ? undefined : onClick}
      className="grid size-11 place-items-center rounded-[4px] border-2 border-royal text-royal transition-colors hover:bg-royal/8 aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:bg-transparent"
    >
      <svg
        viewBox="0 0 20 20"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={direction === "previous" ? "-scale-x-100" : undefined}
      >
        <path d="M4 10h12M11 5l5 5-5 5" />
      </svg>
    </button>
  );
}
