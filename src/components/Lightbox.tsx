"use client";

import { useEffect, useCallback } from "react";

interface LightboxProps {
  src: string;
  title: string;
  aspectRatio?: "16:9" | "9:16";
  category?: string;
  onClose: () => void;
}

export default function Lightbox({ src, title, aspectRatio = "16:9", category, onClose }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const isVertical = aspectRatio === "9:16";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[210] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-2xl"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className={`w-full flex flex-col gap-3 transition-all ${
          isVertical ? "max-w-sm sm:max-w-md" : "max-w-5xl"
        }`}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            <h3 className="font-[family-name:var(--font-outfit)] font-black text-white text-base sm:text-lg truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {category && (
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                {category}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-white/60">
              {isVertical ? "9:16 REEL" : "16:9 4K"}
            </span>
          </div>
        </div>

        {/* Video Player Container */}
        <div
          className={`relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_0_80px_rgba(124,58,237,0.3)] flex items-center justify-center ${
            isVertical ? "aspect-[9/16] max-h-[82vh]" : "aspect-video max-h-[78vh]"
          }`}
        >
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
            controlsList="nodownload"
          />
        </div>

        {/* Footer info & CTA */}
        <div className="flex items-center justify-between px-2 text-xs text-white/50">
          <p className="hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono text-[10px]">Esc</kbd> or click outside to close
          </p>
          <a
            href={`https://wa.me/918160587315?text=${encodeURIComponent(
              `Hi Harsh, I loved your project "${title}" and want to discuss a similar production!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-auto"
          >
            <span>Commission Similar Project</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
