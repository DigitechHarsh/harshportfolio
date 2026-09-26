"use client";

import { useRef, useState } from "react";

interface VideoCardProps {
  title: string;
  src: string;
  category?: string;
  onPlay: (src: string, title: string) => void;
}

function cloudinaryPoster(src: string): string | undefined {
  if (!src.includes("res.cloudinary.com")) return undefined;
  return src
    .replace("/video/upload/", "/video/upload/so_1.0,w_800,c_fill,q_auto,f_auto/")
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

export default function VideoCard({ title, src, category, onPlay }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const poster = cloudinaryPoster(src);

  return (
    <div
      className="video-card cursor-pointer group"
      onMouseEnter={() => { setHovered(true); videoRef.current?.play().catch(() => {}); }}
      onMouseLeave={() => {
        setHovered(false);
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
      }}
      onClick={() => onPlay(src, title)}
    >
      {/* Video thumbnail */}
      <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-105" : "scale-100"}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        <div className={`absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-cyan-500/10 pointer-events-none transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`} />

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-black tracking-widest text-cyan-300 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {category || "AI PRODUCTION"}
        </div>

        {/* Quality badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-bold text-white/70">
          4K HDR
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-14 h-14 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
            hovered ? "scale-110 bg-white/25 shadow-violet-500/30 shadow-xl" : "scale-90 opacity-60 sm:opacity-0"
          }`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        {/* Hover soundbar */}
        <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 bg-cyan-400   rounded-full soundbar" style={{ animationDelay: "0s" }}   />
            <span className="w-0.5 bg-violet-400 rounded-full soundbar" style={{ animationDelay: "0.2s" }} />
            <span className="w-0.5 bg-cyan-400   rounded-full soundbar" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="text-[8px] font-black tracking-widest text-cyan-300 uppercase">Preview</span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 py-3.5 flex items-center justify-between bg-neutral-950/90 border-t border-white/[0.07]">
        <div className="min-w-0 pr-3">
          <h3 className="font-[family-name:var(--font-outfit)] font-black text-white text-sm tracking-wide truncate group-hover:text-violet-300 transition-colors">
            {title}
          </h3>
          <p className="text-[10px] text-white/35 font-semibold tracking-wider uppercase mt-0.5">
            Neural AI • Color Mastered
          </p>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full border border-white/12 bg-white/[0.04] flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
}
