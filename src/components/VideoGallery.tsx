"use client";

import { useState } from "react";
import VideoCard from "./VideoCard";
import Lightbox from "./Lightbox";

export interface VideoItem {
  title: string;
  src: string;
  category?: string;
}

interface VideoGalleryProps {
  id: string;
  title: string;
  subtitle: string;
  accent: "violet" | "cyan";
  videos: VideoItem[];
}

export default function VideoGallery({ id, title, subtitle, accent, videos }: VideoGalleryProps) {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [query, setQuery] = useState("");

  const filtered = videos.filter(v => v.title.toLowerCase().includes(query.toLowerCase()));

  const glow = accent === "violet"
    ? "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)"
    : "radial-gradient(circle, rgba(8,145,178,0.14) 0%, transparent 65%)";

  return (
    <>
      <section
        id={id}
        className="relative py-24 sm:py-32 scroll-mt-24"
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: glow }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full glass">
              <span className={`w-2 h-2 rounded-full ${accent === "violet" ? "bg-violet-400" : "bg-cyan-400"}`} />
              <span className="text-[10px] font-black tracking-widest uppercase text-white/50">Portfolio Showcase</span>
            </div>

            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-black text-white mb-3">
              <span className="gradient-heading">{title}</span>
            </h2>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed">{subtitle}</p>

            {/* Search */}
            <div className="mt-6 relative max-w-xs mx-auto">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full pl-9 pr-4 py-2.5 rounded-full glass text-xs text-white placeholder-white/35 focus:outline-none border border-white/[0.09] focus:border-violet-500/40 transition-colors"
              />
              <svg className="absolute left-3 top-3 text-white/35" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-2.5 text-white/40 hover:text-white text-xs cursor-pointer"
                >✕</button>
              )}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filtered.map((video, i) => (
                <VideoCard
                  key={`${video.src}-${i}`}
                  title={video.title}
                  src={video.src}
                  category={id === "ai-ads" ? "AI ADVERT" : "CONCEPT FILM"}
                  onPlay={(s, t) => setLightbox({ src: s, title: t })}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/35 text-sm">
              No projects matching &quot;{query}&quot;
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
