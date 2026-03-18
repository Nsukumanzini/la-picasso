"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

type ImageLightboxProps = {
  images: string[];
  isOpen: boolean;
  startIndex: number;
  onClose: () => void;
};

export default function ImageLightbox({
  images,
  isOpen,
  startIndex,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!isOpen) return null;

  const safeImages = images.length ? images : [""];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/80 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-800"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="absolute left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-800"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-800"
          onClick={handleNext}
          aria-label="Next image"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <motion.div
          className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/30 bg-white/10 backdrop-blur"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -120) handleNext();
            if (info.offset.x > 120) handlePrev();
          }}
        >
          <div
            className="h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${safeImages[index]})` }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
