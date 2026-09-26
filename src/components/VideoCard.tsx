"use client";

import { useRef, useState } from "react";

interface VideoCardProps {
  title: string;
  src: string;
  aspectRatio?: "16:9" | "9:16";
  category?: string;
  duration?: number;
  tools?: string;
  onPlay: (src: string, title: string, aspectRatio: "16:9" | "9:16", category?: string) => void;
}

function getCloudinaryPoster(src: string, isVertical: boolean): string {
  if (!src.includes("res.cloudinary.com")) return "";
  const transform = isVertical
    ? "so_1.0,w_600,h_1067,c_fill,q_auto,f_auto"
    : "so_1.0,w_800,h_450,c_fill,q_auto,f_auto";
  return src
    .replace("/video/upload/", `/video/upload/${transform}/`)
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

export default function VideoCard({
  title,
  src,
  aspectRatio = "16:9",
  category,
  duration,
  tools,
  onPlay,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isVertical = aspectRatio === "9:16";
  const posterUrl = getCloudinaryPoster(src, isVertical);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`video-card cursor-pointer group flex flex-col justify-between transition-all duration-300 ${
        isVertical ? "h-full" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(src, title, isVertical ? "9:16" : "16:9", category)}
    >
      {/* Media container */}
      <div
        className={`relative w-full overflow-hidden bg-neutral-900 ${
          isVertical ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {/* Instant Poster Image */}
        {!imgError && posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white/20">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        )}

        {/* Hover Video Preview Layer */}
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-violet-600/15 via-transparent to-cyan-500/15 pointer-events-none transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-black tracking-widest text-cyan-300 uppercase shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {category || (isVertical ? "9:16 REEL" : "COMMERCIAL")}
          </div>

          <div className="flex items-center gap-1">
            {duration && duration > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono font-bold text-white/80 shadow-lg">
                {duration}s
              </span>
            ) : null}
            <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono font-bold text-violet-300 shadow-lg">
              {isVertical ? "9:16" : "16:9"}
            </span>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
              hovered
                ? "scale-110 bg-white/30 border-white/60 shadow-violet-500/40 shadow-xl"
                : "scale-90 opacity-70 group-hover:opacity-100"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-0.5"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        {/* Soundbar / Preview active indicator */}
        <div
          className={`absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-0.5 items-end h-2.5">
            <span className="w-0.5 bg-cyan-400 rounded-full soundbar" style={{ animationDelay: "0s" }} />
            <span className="w-0.5 bg-violet-400 rounded-full soundbar" style={{ animationDelay: "0.2s" }} />
            <span className="w-0.5 bg-cyan-400 rounded-full soundbar" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="text-[8px] font-black tracking-widest text-cyan-300 uppercase">
            Click to Play
          </span>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 bg-neutral-950/90 border-t border-white/[0.08] flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-[family-name:var(--font-outfit)] font-bold text-white text-sm tracking-wide truncate group-hover:text-violet-300 transition-colors">
            {title}
          </h3>
          <p className="text-[10px] text-white/40 font-semibold tracking-wider uppercase mt-0.5 truncate">
            {tools || "Midjourney v6 • Runway Gen-3 • Premiere"}
          </p>
        </div>

        <div className="shrink-0 w-8 h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-violet-500/50 group-hover:bg-violet-500/20 transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
}
