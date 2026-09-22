"use client";

import { useEffect, useCallback } from "react";

interface LightboxProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function Lightbox({ src, title, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center lightbox-backdrop bg-black/90 p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] w-11 h-11 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
        aria-label="Close lightbox"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300 group-hover:rotate-90"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Video Container */}
      <div className="relative w-full max-w-5xl flex flex-col items-center animate-scale-in">
        {/* Title */}
        <div className="mb-3 flex items-center gap-3 self-start sm:self-center">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
          <h3 className="font-[family-name:var(--font-outfit)] text-lg sm:text-xl font-bold text-white tracking-wide">
            {title}
          </h3>
        </div>

        {/* Player */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.25)] bg-black max-h-[78vh] flex items-center justify-center">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain bg-black"
            controlsList="nodownload"
          />
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-white/40 mt-3">
          Press{" "}
          <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-white/60 text-xs">
            Esc
          </kbd>{" "}
          or click background to close
        </p>
      </div>
    </div>
  );
}
