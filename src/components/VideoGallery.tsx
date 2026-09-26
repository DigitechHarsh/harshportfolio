"use client";

import { useState, useMemo } from "react";
import VideoCard from "./VideoCard";
import Lightbox from "./Lightbox";

export interface VideoItem {
  id?: number;
  title: string;
  src: string;
  category?: string;
  aspectRatio?: "16:9" | "9:16";
  duration?: number;
  tools?: string;
  isFeatured?: boolean;
}

interface VideoGalleryProps {
  id: string;
  title: string;
  subtitle: string;
  videos: VideoItem[];
}

export default function VideoGallery({ id, title, subtitle, videos }: VideoGalleryProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    title: string;
    aspectRatio: "16:9" | "9:16";
    category?: string;
  } | null>(null);

  const [activeFilter, setActiveFilter] = useState<"all" | "widescreen" | "vertical">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Separate widescreen and vertical cleanly
  const widescreenVideos = useMemo(() => {
    return videos
      .filter(v => v.aspectRatio === "16:9")
      .filter(v =>
        searchQuery.trim()
          ? v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (v.tools && v.tools.toLowerCase().includes(searchQuery.toLowerCase()))
          : true
      );
  }, [videos, searchQuery]);

  const verticalVideos = useMemo(() => {
    return videos
      .filter(v => v.aspectRatio === "9:16")
      .filter(v =>
        searchQuery.trim()
          ? v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (v.tools && v.tools.toLowerCase().includes(searchQuery.toLowerCase()))
          : true
      );
  }, [videos, searchQuery]);

  return (
    <>
      <section id={id} className="relative py-24 sm:py-32 scroll-mt-24">
        {/* Ambient atmospheric glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] rounded-full pointer-events-none opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(8,145,178,0.2) 50%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

          {/* Section Master Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-white/10 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-white/80">
                Directorial Archive &bull; {videos.length} Commercials &amp; Films
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              Featured <span className="gradient-heading">Directorial Works</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>

            {/* Format Filter Switcher */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 border border-white/20 scale-105"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                All Productions ({videos.length})
              </button>

              <button
                onClick={() => setActiveFilter("widescreen")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === "widescreen"
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 border border-white/20 scale-105"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <span>🎬</span>
                <span>16:9 Widescreen Cinema ({videos.filter(v => v.aspectRatio === "16:9").length})</span>
              </button>

              <button
                onClick={() => setActiveFilter("vertical")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === "vertical"
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 border border-white/20 scale-105"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <span>📱</span>
                <span>9:16 Vertical Reels &amp; Ads ({videos.filter(v => v.aspectRatio === "9:16").length})</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-6 relative max-w-sm mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects (e.g. Puma, Monster, Tata)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 transition-colors shadow-inner"
              />
              <svg
                className="absolute left-3.5 top-3 text-white/40"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-white/40 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* SECTION 1: 16:9 WIDESCREEN CINEMATIC PRODUCTIONS               */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(activeFilter === "all" || activeFilter === "widescreen") && (
            <div className="mb-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>CINEMATIC WIDESCREEN THEATER</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-white">
                    16:9 Commercials &amp; Film Trailers
                  </h3>
                </div>
                <span className="text-xs font-bold text-white/40 font-mono">
                  {widescreenVideos.length} Masterpieces &bull; 4K UHD
                </span>
              </div>

              {widescreenVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {widescreenVideos.map((video, idx) => (
                    <VideoCard
                      key={`wide-${video.src}-${idx}`}
                      title={video.title}
                      src={video.src}
                      aspectRatio="16:9"
                      category={video.category === "ai-ads" ? "COMMERCIAL" : "FILM TRAILER"}
                      duration={video.duration}
                      tools={video.tools}
                      onPlay={(s, t, a, c) =>
                        setLightbox({ src: s, title: t, aspectRatio: a, category: c })
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-10 text-white/40 text-sm">
                  No widescreen productions match your search.
                </p>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* SECTION 2: 9:16 VERTICAL COMMERCIALS & VIRAL REELS              */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {(activeFilter === "all" || activeFilter === "vertical") && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 text-violet-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    <span>MOBILE-FIRST VIRAL MEDIA</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black text-white">
                    9:16 Vertical Commercials &amp; Teaser Reels
                  </h3>
                </div>
                <span className="text-xs font-bold text-white/40 font-mono">
                  {verticalVideos.length} Productions &bull; Instagram / Shorts / TikTok
                </span>
              </div>

              {verticalVideos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {verticalVideos.map((video, idx) => (
                    <VideoCard
                      key={`vert-${video.src}-${idx}`}
                      title={video.title}
                      src={video.src}
                      aspectRatio="9:16"
                      category={video.category === "ai-ads" ? "9:16 AD" : "9:16 REEL"}
                      duration={video.duration}
                      tools={video.tools}
                      onPlay={(s, t, a, c) =>
                        setLightbox({ src: s, title: t, aspectRatio: a, category: c })
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-10 text-white/40 text-sm">
                  No vertical reels match your search.
                </p>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Interactive Lightbox Popup */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          title={lightbox.title}
          aspectRatio={lightbox.aspectRatio}
          category={lightbox.category}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
