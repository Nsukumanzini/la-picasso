"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

type VideoItem = {
  src: string;
  label?: string;
};

type VideoCarouselProps = {
  videos: Array<string | VideoItem>;
};

const toLabel = (source: string) => {
  const name = source.split("/").pop() ?? "Video";
  return name
    .replace("-video", "")
    .replace(".mp4", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [index, setIndex] = useState(0);
  const safeVideos = useMemo(() => {
    return videos.map((video) =>
      typeof video === "string" ? { src: video, label: toLabel(video) } : {
        src: video.src,
        label: video.label ?? toLabel(video.src),
      }
    );
  }, [videos]);

  if (safeVideos.length === 0) return null;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % safeVideos.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + safeVideos.length) % safeVideos.length);
  };

  return (
    <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Video Tours
          </p>
          <h2 className="mt-2 font-serif text-2xl text-neutral-900">
            Walk through the res
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-picasso-brown/30 bg-white/80 text-picasso-brown"
            aria-label="Previous video"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-picasso-brown/30 bg-white/80 text-picasso-brown"
            aria-label="Next video"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/40 bg-neutral-900">
        <video
          key={safeVideos[index].src}
          className="h-64 w-full object-cover sm:h-72"
          controls
          preload="metadata"
        >
          <source src={safeVideos[index].src} type="video/mp4" />
        </video>
      </div>

      <div
        className={`mt-4 grid gap-2 ${
          safeVideos.length > 6 ? "sm:grid-cols-4" : "sm:grid-cols-3"
        }`}
      >
        {safeVideos.map((video, videoIndex) => (
          <button
            key={video.src}
            type="button"
            onClick={() => setIndex(videoIndex)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              videoIndex === index
                ? "border-picasso-brown bg-picasso-light/50 text-picasso-brown"
                : "border-white/40 bg-white/70 text-neutral-600"
            }`}
          >
            <PlayCircle className="h-4 w-4" />
            {video.label ?? toLabel(video.src)}
          </button>
        ))}
      </div>
    </section>
  );
}
