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

type FilterTab = "all" | "widescreen" | "vertical" | "ads" | "teasers";

export default function VideoGallery({ id, title, subtitle, videos }: VideoGalleryProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    title: string;
    aspectRatio: "16:9" | "9:16";
    category?: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      // Tab filter
      if (activeTab === "widescreen" && v.aspectRatio !== "16:9") return false;
      if (activeTab === "vertical" && v.aspectRatio !== "9:16") return false;
      if (activeTab === "ads" && v.category !== "ai-ads" && v.category !== "AI Commercial Ad") return false;
      if (activeTab === "teasers" && v.category !== "ai-teasers" && v.category !== "AI Teaser Film") return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          (v.tools && v.tools.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [videos, activeTab, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: videos.length,
      widescreen: videos.filter(v => v.aspectRatio === "16:9").length,
      vertical: videos.filter(v => v.aspectRatio === "9:16").length,
      ads: videos.filter(v => v.category === "ai-ads" || v.category === "AI Commercial Ad").length,
      teasers: videos.filter(v => v.category === "ai-teasers" || v.category === "AI Teaser Film").length,
    };
  }, [videos]);

  const isVerticalView = activeTab === "vertical";

  return (
    <>
      <section id={id} className="relative py-24 sm:py-32 scroll-mt-24">
        {/* Ambient glow backgrounds */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(8,145,178,0.2) 50%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-white/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-white/70">
                Showcase &bull; {videos.length} Directorial Productions
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              Featured <span className="gradient-heading">Video Productions</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { key: "all",        label: `All Projects (${counts.all})` },
                { key: "widescreen", label: `🎬 16:9 Widescreen (${counts.widescreen})` },
                { key: "vertical",   label: `📱 9:16 Vertical Reels (${counts.vertical})` },
                { key: "ads",        label: `Commercial Ads (${counts.ads})` },
                { key: "teasers",    label: `Cinematic Teasers (${counts.teasers})` },
              ].map(tab => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as FilterTab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 border border-white/20 scale-105"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="mt-6 relative max-w-sm mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, tool (e.g. Puma, Runway)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-500/60 transition-colors shadow-inner"
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

          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div
              className={`grid transition-all duration-300 ${
                isVerticalView
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
              }`}
            >
              {filteredVideos.map((video, idx) => (
                <VideoCard
                  key={`${video.src}-${idx}`}
                  title={video.title}
                  src={video.src}
                  aspectRatio={video.aspectRatio || "16:9"}
                  category={
                    video.category === "ai-ads" || video.category === "AI Commercial Ad"
                      ? "COMMERCIAL"
                      : "CINEMATIC TEASER"
                  }
                  duration={video.duration}
                  tools={video.tools}
                  onPlay={(s, t, a, c) =>
                    setLightbox({ src: s, title: t, aspectRatio: a, category: c })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-neutral-950/40 rounded-3xl border border-white/[0.06] p-8 max-w-md mx-auto">
              <div className="text-3xl mb-3">🔍</div>
              <p className="text-white/60 font-medium text-sm">
                No productions matching &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-4 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Popup */}
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
