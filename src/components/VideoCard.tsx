"use client";

import { useRef, useState } from "react";

interface VideoCardProps {
  title: string;
  src: string;
  index: number;
  onPlay: (src: string, title: string) => void;
}

function getCloudinaryPoster(src: string): string | undefined {
  if (!src || !src.includes("res.cloudinary.com")) return undefined;
  return src
    .replace("/video/upload/", "/video/upload/so_1.0,w_800,c_fill,q_auto,f_auto/")
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

export default function VideoCard({ title, src, index, onPlay }: VideoCardProps) {
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
      className={`group relative rounded-2xl overflow-hidden cursor-pointer glass-3d border border-white/5`}
      style={{
        transform: isHovering ? "translateY(-8px)" : "translateY(0px)",
        boxShadow: isHovering
          ? "inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.25)"
          : "inset 0 1px 1px rgba(255, 255, 255, 0.12), inset 0 -1px 1px rgba(0, 0, 0, 0.4), 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 10px 25px -10px rgba(0, 0, 0, 0.5)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s",
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(src, title)}
    >
      {/* Video Container (Viewfinder view) */}
      <div className="video-container bg-black/60 overflow-hidden relative scanline">
        <video
          ref={videoRef}
          src={src}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Viewfinder Target Overlays (Only visible on hover) */}
        <div className={`absolute inset-0 z-10 p-3 flex flex-col justify-between pointer-events-none transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}>
          {/* Top HUD Row */}
          <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-red-500 bg-black/40 px-2 py-0.5 rounded backdrop-blur-[2px]">
            <div className="flex items-center gap-1.5">
              <span className="led-indicator led-red" />
              <span>● REC</span>
            </div>
            <div className="text-white/60">AI.STREAM_RAW</div>
          </div>

          {/* Center Crosshair Target */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
              <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
            </svg>
          </div>

          {/* Bottom HUD Row */}
          <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-white/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-[2px]">
            <div>16:9 SCALE</div>
            <div className="text-cyan-400">FPS 24.00</div>
          </div>
        </div>

        {/* Gloss overlay to simulate high-end glass screen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none mix-blend-overlay z-10" />

        {/* Ambient bottom light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />

        {/* Tactile 3D Play button */}
        <div
          className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 ${
            isHovering
              ? "opacity-100 scale-100"
              : "opacity-80 scale-90 sm:opacity-0 sm:scale-75"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_8px_16px_rgba(0,0,0,0.5)] group-hover:from-white/25 group-hover:to-white/10 transition-all duration-300">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title bar - styled like a tactile LED label or physical metal plate */}
      <div className="relative z-20 p-4 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 border-t border-white/5">
        <h3 className="font-[family-name:var(--font-outfit)] font-black text-white text-sm sm:text-base tracking-wide truncate">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHovering ? "bg-violet-400" : "bg-neutral-500"}`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isHovering ? "bg-violet-500" : "bg-neutral-600"}`}></span>
          </span>
          <span className="text-[10px] text-white/50 tracking-wider font-semibold uppercase">Preview Stream Available</span>
        </div>
      </div>
    </div>
  );
}
