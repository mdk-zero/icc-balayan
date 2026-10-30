"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/site";

/**
 * Photos at their own proportions in columns. Choosing one opens it large in
 * a modal dialog; arrow keys or the buttons step through the set, Escape
 * closes it and focus goes back to the photo that opened it.
 */
export function PhotoGallery({ photos, label }: { photos: Photo[]; label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex((i) => {
        if (i !== null) triggers.current[i]?.focus();
        return null;
      });
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const photo = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-2 gap-4 md:columns-3 lg:gap-5">
        {photos.map((item, i) => (
          <li key={item.src} className="mb-4 break-inside-avoid lg:mb-5">
            <button
              ref={(node) => {
                triggers.current[i] = node;
              }}
              type="button"
              onClick={() => open(i)}
              aria-label={`View larger: ${item.alt}`}
              className="group block w-full overflow-hidden bg-facade-pale"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 31vw, 47vw"
                className="h-auto w-full transition-opacity duration-150 group-hover:opacity-90"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={label}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="photo-dialog m-auto max-h-[100dvh] w-full max-w-6xl bg-transparent p-4 text-white backdrop:bg-royal-deep/90 sm:p-6"
      >
        {photo ? (
          <figure className="on-dark">
            <div className="flex items-center justify-between gap-4 pb-3">
              <p className="type-ui tabular-nums text-white/85">
                {index! + 1} of {photos.length}
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="type-ui rounded-[4px] border-2 border-white/70 px-3 py-1.5 font-[650] text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="mx-auto h-auto max-h-[calc(100dvh-11rem)] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <span className="max-w-[60ch] text-white/90">{photo.alt}</span>
              <span className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="type-ui rounded-[4px] border-2 border-white/70 px-3 py-1.5 font-[650] text-white hover:bg-white/10"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="type-ui rounded-[4px] border-2 border-white/70 px-3 py-1.5 font-[650] text-white hover:bg-white/10"
                >
                  Next
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
