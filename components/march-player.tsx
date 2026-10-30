"use client";

import { useEffect, useRef, useState } from "react";

function clock(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

/**
 * The ICC March with a ruler for a progress bar: a tall tick every 30
 * seconds and a short one every 10, like the grade ruler on the homepage.
 * Seeking uses a native range input, so it works with keys and touch.
 */
export function MarchPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => {
      setTime(audio.currentTime);
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", sync);
    audio.addEventListener("loadedmetadata", sync);
    audio.addEventListener("durationchange", sync);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    sync();
    return () => {
      audio.removeEventListener("timeupdate", sync);
      audio.removeEventListener("loadedmetadata", sync);
      audio.removeEventListener("durationchange", sync);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  const ticks = duration > 0 ? Array.from({ length: Math.floor(duration / 10) + 1 }, (_, i) => i * 10) : [];
  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div className="grid items-center gap-x-8 gap-y-6 sm:grid-cols-[auto_1fr]">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the ICC March" : "Play the ICC March"}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-royal text-white transition-colors hover:bg-royal-deep"
      >
        {playing ? (
          <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8">
            <rect x="6" y="5" width="4" height="14" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" fill="currentColor" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="ml-1 h-8 w-8">
            <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="min-w-0">
        <div className="relative h-12">
          <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-facade-line" />
          <div
            aria-hidden
            className="absolute left-0 top-0 h-[3px] bg-royal"
            style={{ width: `${progress}%` }}
          />
          {ticks.map((second) => {
            const major = second % 30 === 0;
            return (
              <span
                key={second}
                aria-hidden
                className="absolute top-0"
                style={{ left: `${(second / duration) * 100}%` }}
              >
                <span className={`block w-[2px] ${major ? "h-5 bg-royal" : "h-2.5 bg-royal/50"}`} />
                {major ? (
                  <span
                    className={`type-small absolute top-4 tabular-nums text-slate-soft ${
                      second / duration > 0.9 ? "right-1.5" : "left-1.5"
                    }`}
                  >
                    {clock(second)}
                  </span>
                ) : null}
              </span>
            );
          })}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(event) => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Number(event.target.value);
            }}
            disabled={!duration}
            aria-label="Position in the ICC March"
            aria-valuetext={`${clock(time)} of ${clock(duration)}`}
            className="march-seek absolute inset-x-0 -top-3 h-7 w-full"
          />
        </div>
        <p className="type-ui mt-2 tabular-nums text-slate">
          {clock(time)} <span className="text-slate-soft">of {clock(duration)}</span>
        </p>
      </div>
    </div>
  );
}
