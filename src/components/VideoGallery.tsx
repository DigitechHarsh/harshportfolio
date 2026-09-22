"use client";

import { useState, useRef, useEffect } from "react";
import VideoCard from "./VideoCard";
import Lightbox from "./Lightbox";

export interface VideoItem {
  title: string;
  src: string;
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

  const gradientMap = {
    violet: "from-violet-500 to-indigo-500",
    cyan: "from-cyan-500 to-teal-500",
  };

  const glowMap = {
    violet: "rgba(139, 92, 246, 0.15)",
    cyan: "rgba(6, 182, 212, 0.15)",
  };

  return (
    <>
      <section
        id={id}
        ref={sectionRef}
        className="relative py-24 sm:py-32 overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowMap[accentColor]} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div
                className={`w-12 h-0.5 rounded-full bg-gradient-to-r ${gradientMap[accentColor]}`}
              />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white/40">
                Portfolio
              </span>
              <div
                className={`w-12 h-0.5 rounded-full bg-gradient-to-r ${gradientMap[accentColor]}`}
              />
            </div>

            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              <span className="gradient-text">{sectionTitle}</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <div
                key={video.src}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${i * 100 + 200}ms`,
                }}
              >
                <VideoCard
                  title={video.title}
                  src={video.src}
                  index={i}
                  onPlay={(src, title) => setLightbox({ src, title })}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
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
