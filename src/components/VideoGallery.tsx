"use client";

import { useState, useRef, useEffect } from "react";
import VideoCard from "./VideoCard";
import Lightbox from "./Lightbox";

export interface VideoItem {
  title: string;
  src: string;
  category?: string;
}

interface VideoGalleryProps {
  id: string;
  sectionTitle: string;
  sectionSubtitle: string;
  accentColor: "violet" | "cyan";
  videos: VideoItem[];
}

export default function VideoGallery({
  id,
  sectionTitle,
  sectionSubtitle,
  accentColor,
  videos,
}: VideoGalleryProps) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const gradientMap = {
    violet: "from-violet-500 via-indigo-500 to-cyan-500",
    cyan: "from-cyan-400 via-teal-500 to-emerald-500",
  };

  const glowMap = {
    violet: "rgba(139, 92, 246, 0.18)",
    cyan: "rgba(6, 182, 212, 0.18)",
  };

  return (
    <>
      <section
        id={id}
        ref={sectionRef}
        className="relative py-24 sm:py-32 overflow-hidden scroll-mt-28"
      >
        {/* Ambient Radial Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowMap[accentColor]} 0%, transparent 65%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Section Header */}
          <div
            className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientMap[accentColor]}`}></span>
              <span className="text-[10px] font-black tracking-widest uppercase text-white/60">
                PORTFOLIO SHOWCASE
              </span>
            </div>

            {/* Title */}
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              <span className="gradient-text-hero">{sectionTitle}</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed">
              {sectionSubtitle}
            </p>

            {/* Quick search filter for this section */}
            {videos.length > 6 && (
              <div className="mt-6 flex justify-center">
                <div className="relative w-full max-w-xs">
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full px-4 py-2 pl-9 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors shadow-inner"
                  />
                  <svg
                    className="absolute left-3 top-2.5 text-white/40"
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
                  {filterQuery && (
                    <button
                      onClick={() => setFilterQuery("")}
                      className="absolute right-3 top-2 text-white/40 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video, i) => (
              <div
                key={`${video.src}-${i}`}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${(i % 6) * 70 + 120}ms`,
                }}
              >
                <VideoCard
                  title={video.title}
                  src={video.src}
                  index={i}
                  category={id === "ai-ads" ? "AI ADVERT" : "CONCEPT FILM"}
                  onPlay={(src, title) => setLightbox({ src, title })}
                />
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-white/40 text-sm">
              No matching projects found for &quot;{filterQuery}&quot;
            </div>
          )}
        </div>
      </section>

      {/* Cinematic Modal Lightbox */}
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
