"use client";

import { useRef, useState } from "react";

interface VideoCardProps {
  title: string;
  src: string;
  index: number;
  category?: string;
  onPlay: (src: string, title: string) => void;
}

function getCloudinaryPoster(src: string): string | undefined {
  if (!src || !src.includes("res.cloudinary.com")) return undefined;
  return src
    .replace("/video/upload/", "/video/upload/so_1.0,w_800,c_fill,q_auto,f_auto/")
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

export default function VideoCard({ title, src, index, category, onPlay }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const posterUrl = getCloudinaryPoster(src);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      className="glass-panel glass-panel-hover rounded-3xl overflow-hidden cursor-pointer group flex flex-col relative border border-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(src, title)}
    >
      {/* Video Container Frame */}
      <div className="relative w-full aspect-video bg-black/80 overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Gloss & Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top HUD Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-black tracking-widest text-cyan-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{category || "AI PRODUCTION"}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-bold text-white/70">
            <span>4K HDR</span>
          </div>
        </div>

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
              isHovering ? "scale-110 bg-white/25 shadow-[0_0_30px_rgba(139,92,246,0.6)]" : "scale-90 opacity-70 sm:opacity-0"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1 filter drop-shadow-md"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        {/* Bottom Soundwave Indicator on Hover */}
        <div
          className={`absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-black uppercase text-white/70 transition-opacity duration-300 pointer-events-none z-10 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
            <div className="flex gap-0.5 items-end h-2.5">
              <span className="w-0.5 bg-cyan-400 rounded-full soundbar-anim" style={{ animationDelay: "0.1s" }} />
              <span className="w-0.5 bg-violet-400 rounded-full soundbar-anim" style={{ animationDelay: "0.3s" }} />
              <span className="w-0.5 bg-cyan-400 rounded-full soundbar-anim" style={{ animationDelay: "0.5s" }} />
            </div>
            <span className="text-[8px] tracking-widest text-cyan-300">LIVE PREVIEW</span>
          </div>

          <span className="bg-black/60 px-2 py-0.5 rounded-full border border-white/10 text-[8px] tracking-widest text-white/80">
            CLICK TO EXPAND
          </span>
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="p-4 sm:p-5 flex items-center justify-between bg-neutral-950/90 border-t border-white/10 relative z-20">
        <div className="flex flex-col min-w-0 pr-3">
          <h3 className="font-[family-name:var(--font-outfit)] font-black text-white text-sm sm:text-base tracking-wide truncate group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-white/40 uppercase font-semibold tracking-wider truncate">
              Diffusion FX • Color Mastered
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300 shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
}
