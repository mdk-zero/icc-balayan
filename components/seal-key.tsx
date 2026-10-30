"use client";

import Image from "next/image";
import { useState } from "react";

export type SealPart = {
  title: string;
  body: string;
  /** Marker position over the seal image, in percent. */
  x: number;
  y: number;
};

/**
 * The seal with a numbered key. Pointing at an entry in the key, or at a
 * marker on the seal, lights up its partner; the text is always visible, so
 * nothing depends on the pointer.
 */
export function SealKey({ parts }: { parts: SealPart[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className="relative mx-auto aspect-[444/445] w-full max-w-[26rem]">
          <Image
            src="/icc-logo.png"
            alt="The seal of Immaculate Conception College of Balayan"
            fill
            sizes="(min-width: 1024px) 416px, 90vw"
            className="object-contain"
            priority
          />
          {parts.map((part, index) => (
            <span
              key={part.title}
              aria-hidden
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              style={{ left: `${part.x}%`, top: `${part.y}%` }}
              className={`type-small absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-2 font-[750] shadow-[0_0_0_3px_rgba(255,255,255,0.9)] transition-transform duration-150 ${
                active === index
                  ? "scale-125 border-white bg-crest text-white"
                  : "border-white bg-royal text-white"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <ol className="lg:col-span-7">
        {parts.map((part, index) => (
          <li
            key={part.title}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className={`row-line grid grid-cols-[2.5rem_1fr] gap-x-4 py-5 transition-colors first:border-0 first:pt-0 ${
              active === index ? "text-royal" : ""
            }`}
          >
            <span
              aria-hidden
              className={`type-small mt-0.5 flex h-8 w-8 items-center justify-center rounded-full font-[750] text-white transition-colors ${
                active === index ? "bg-crest" : "bg-royal"
              }`}
            >
              {index + 1}
            </span>
            <div>
              <h3 className="type-item">{part.title}</h3>
              <p className="mt-1.5 max-w-[56ch] text-slate">{part.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
