"use client";

import { useEffect, useCallback } from "react";

interface LightboxProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function Lightbox({ src, title, onClose }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-8"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-[210] w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-4xl flex flex-col gap-3">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500 shrink-0" />
          <h3 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-white">{title}</h3>
        </div>

        {/* Player */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_0_60px_rgba(124,58,237,0.2)]">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full max-h-[75vh] object-contain bg-black"
            controlsList="nodownload"
          />
        </div>

        <p className="text-center text-xs text-white/30">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono">Esc</kbd> or click outside to close
        </p>
      </div>
    </div>
  );
}
