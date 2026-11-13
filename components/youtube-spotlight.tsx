"use client";

import { useEffect, useRef, useState } from "react";
import { formatFeedDate, useFeed, type YouTubeVideo } from "@/lib/feeds";
import { links } from "@/lib/site";

/**
 * The school's latest video large, with a strip of the others underneath to
 * swap into the frame. YouTube's player only loads when someone presses
 * play, from youtube-nocookie.com, so the page stays light and YouTube sets
 * no cookies until then.
 */
export function YouTubeSpotlight() {
  const feed = useFeed<YouTubeVideo>("/feeds/youtube.php");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const videos = feed.status === "ready" ? feed.items : [];
  const video = videos[index];

  // The play button is replaced by the player, so focus follows it there.
  useEffect(() => {
    if (playing) playerRef.current?.focus();
  }, [playing]);

  return (
    <section aria-labelledby="youtube-heading">
      <div className="trim flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-4">
        <h2 id="youtube-heading" className="type-section">
          On YouTube
        </h2>
        <a href={links.youtube} className="link type-ui font-[600]">
          More on YouTube
        </a>
      </div>

      {feed.status === "loading" ? (
        <div className="mt-8 max-w-5xl">
          <p role="status" className="sr-only">
            Loading videos
          </p>
          <div className="aspect-video bg-facade-pale" />
          <div aria-hidden="true" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="aspect-video bg-facade-pale" />
            <div className="aspect-video bg-facade-pale" />
            <div className="hidden aspect-video bg-facade-pale sm:block" />
            <div className="hidden aspect-video bg-facade-pale sm:block" />
          </div>
        </div>
      ) : null}

      {feed.status === "empty" ? (
        <div className="mt-6 max-w-2xl">
          <p className="text-slate">The school&rsquo;s videos are on its YouTube channel.</p>
          <a href={links.youtube} className="link type-ui mt-3 inline-block font-[600]">
            Watch on YouTube
          </a>
        </div>
      ) : null}

      {/* Capped so the 16:9 frame fits on a laptop screen. */}
      {video ? (
        <div className="max-w-5xl">
          <div className="mt-8 aspect-video overflow-hidden bg-slate">
            {playing ? (
              <iframe
                ref={playerRef}
                key={video.id}
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play: ${video.title}`}
                className="group relative block size-full"
              >
                <Thumbnail key={video.id} id={video.id} large />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 grid h-12 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] bg-royal transition-colors group-hover:bg-royal-deep sm:h-14 sm:w-20"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-white sm:size-7">
                    <path d="M7 4.5v15l12.5-7.5z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <h3 className="type-sub mt-5 max-w-[40ch]">{video.title}</h3>
          {video.date ? (
            <time dateTime={video.date} className="type-ui mt-2 block text-slate-soft">
              {formatFeedDate(video.date)}
            </time>
          ) : null}

          {videos.length > 1 ? (
            <ul aria-label="More videos" className="feed-strip mt-8 flex snap-x gap-4 overflow-x-auto pb-3">
              {videos.map((item, i) => (
                <li key={item.id} className="w-[44%] shrink-0 snap-start sm:w-[calc((100%-3rem)/4)]">
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setPlaying(false);
                    }}
                    aria-current={i === index ? "true" : undefined}
                    className="group block w-full text-left"
                  >
                    <span
                      className={`block aspect-video overflow-hidden bg-facade-pale ${
                        i === index ? "outline-3 -outline-offset-3 outline-royal" : ""
                      }`}
                    >
                      <Thumbnail id={item.id} />
                    </span>
                    <span className="type-small mt-2 line-clamp-2 text-slate group-hover:underline">
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

/**
 * YouTube only makes the larger thumbnails for HD uploads, and a missing one
 * can come back as a 120-pixel grey placeholder rather than an error, so it
 * steps down a size when either happens. The 4:3 sizes have letterbox bars
 * built in, which object-cover crops off in a 16:9 frame.
 */
function Thumbnail({ id, large = false }: { id: string; large?: boolean }) {
  const sizes = large ? ["maxresdefault", "sddefault", "hqdefault"] : ["mqdefault"];
  const [step, setStep] = useState(0);
  const smaller = () => setStep((s) => Math.min(s + 1, sizes.length - 1));

  return (
    <img
      src={`https://i.ytimg.com/vi/${id}/${sizes[step]}.jpg`}
      alt=""
      loading={large ? "eager" : "lazy"}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth <= 120) smaller();
      }}
      onError={smaller}
      className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
    />
  );
}
