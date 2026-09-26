"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoGallery from "@/components/VideoGallery";
import type { VideoItem } from "@/components/VideoGallery";
import ToolsSection from "@/components/ToolsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/lib/api";

/* ── Fallback Master Roster with Exact Aspect Ratios ─────────────── */
const ALL_VIDEOS: VideoItem[] = [
  // 16:9 Widescreen Masterpieces
  {
    id: 1,
    title: "Tata Sierra AI Commercial",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081504/portfolio/ai-ads/fsrc0pndtwwnrshaodu3.mp4",
    aspectRatio: "16:9",
    category: "ai-ads",
    duration: 60,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Flavour Of India Culinary",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790063300/portfolio/ai-ads/cjzlzqyriohfq9iuk1mt.mp4",
    aspectRatio: "16:9",
    category: "ai-ads",
    duration: 49,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Cinematic Encounter Teaser",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082148/portfolio/ai-teasers/dsey3f4wwxabilgf7ftw.mp4",
    aspectRatio: "16:9",
    category: "ai-teasers",
    duration: 30,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 4,
    title: "Cyber Pulse Sci-Fi Teaser",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082139/portfolio/ai-teasers/jqqcmlkxfqv6vfq8cqsr.mp4",
    aspectRatio: "16:9",
    category: "ai-teasers",
    duration: 15,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 5,
    title: "Mystic Vision Cinematic Concept",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081520/portfolio/ai-teasers/mhebbuthefnnfixlcewx.mp4",
    aspectRatio: "16:9",
    category: "ai-teasers",
    duration: 15,
    tools: "Midjourney v6, Kling AI, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 6,
    title: "Dark Horizon Sci-Fi Vision",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081525/portfolio/ai-teasers/dwpkkhpgsjt3j7ccddzx.mp4",
    aspectRatio: "16:9",
    category: "ai-teasers",
    duration: 15,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 7,
    title: "Neon Dreams Cyber Teaser",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081529/portfolio/ai-teasers/ntnef4a9fhsoldnk2i8l.mp4",
    aspectRatio: "16:9",
    category: "ai-teasers",
    duration: 15,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },

  // 9:16 Vertical Mobile Commercials & Reels
  {
    id: 8,
    title: "Puma Fly Runner Commercial",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081118/portfolio/ai-ads/i3r9azrt8x7q43pkxgjq.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 29,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 9,
    title: "Monster Energy Cinematic Action",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790063694/portfolio/ai-ads/c5yjieee5f8sem7sxqcu.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 27,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 10,
    title: "Diamond Luxury Jewelry Ad",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790062979/portfolio/ai-ads/ecgvba8pxd2owgx9i7cd.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 20,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 11,
    title: "Mountain Dew Extreme Action",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082258/portfolio/ai-teasers/voibtdtylp2j32miz71e.mp4",
    aspectRatio: "9:16",
    category: "ai-teasers",
    duration: 48,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: true,
  },
  {
    id: 12,
    title: "OM Divine Sacred Heritage",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790080758/portfolio/ai-ads/yfp36rcvu9m7jsyovge4.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 30,
    tools: "Midjourney v6, Kling AI, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 13,
    title: "Fresh Mango Pulp Commercial",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790063319/portfolio/ai-ads/ufdzqkyke26nlhdczexp.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 23,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 14,
    title: "EON Corporate AI Solutions",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790062844/portfolio/ai-ads/fj7wwxnb1sdsiuygpm98.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 37,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 15,
    title: "The Good Vibe Fashion Film",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081513/portfolio/ai-ads/y8caywmdwtdb76dpraaj.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 13,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 16,
    title: "Neural Fusion Visuals Ad",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790062710/portfolio/ai-ads/umzcguswvtugww4vaaug.mp4",
    aspectRatio: "9:16",
    category: "ai-ads",
    duration: 33,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 17,
    title: "Cyber Samurai AI Teaser",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082293/portfolio/ai-teasers/dzvtgar5uvvs1woorsoe.mp4",
    aspectRatio: "9:16",
    category: "ai-teasers",
    duration: 15,
    tools: "Midjourney v6, Kling AI, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 18,
    title: "Action School Cinematic Sequence",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082327/portfolio/ai-teasers/ref1xg6swvhg1z0isbcf.mp4",
    aspectRatio: "9:16",
    category: "ai-teasers",
    duration: 13,
    tools: "Midjourney v6, Runway Gen-3, Premiere Pro",
    isFeatured: false,
  },
  {
    id: 19,
    title: "Divine Shloka Sacred Concept",
    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082132/portfolio/ai-teasers/a6vx5dng11nllbrm484h.mp4",
    aspectRatio: "9:16",
    category: "ai-teasers",
    duration: 42,
    tools: "Midjourney v6, Kling AI, Premiere Pro",
    isFeatured: false,
  },
];

// Helper to sanitize database titles so raw filenames don't leak to UI
function cleanDbTitle(rawTitle: string, src: string): string {
  const matched = ALL_VIDEOS.find(v => v.src === src);
  if (matched && (rawTitle.includes("(") || rawTitle.includes("916") || rawTitle === "Futuristic AI Visuals")) {
    return matched.title;
  }
  return rawTitle || (matched ? matched.title : "AI Production");
}

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[]>(ALL_VIDEOS);

  useEffect(() => {
    // Attempt dynamic refresh from backend API
    fetch(`${API_BASE_URL}/projects.php?grouped=true`)
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        if (!json?.success || !json?.data) return;

        const dynamicList: VideoItem[] = [];

        if (Array.isArray(json.data["ai-ads"])) {
          json.data["ai-ads"].forEach((p: {
            id?: number;
            title: string;
            src: string;
            aspect_ratio?: "16:9" | "9:16";
            duration_seconds?: number;
            tools_used?: string;
          }) => {
            const fallback = ALL_VIDEOS.find(v => v.src === p.src);
            dynamicList.push({
              id: p.id || fallback?.id,
              title: cleanDbTitle(p.title, p.src),
              src: p.src,
              category: "ai-ads",
              aspectRatio: p.aspect_ratio || fallback?.aspectRatio || "16:9",
              duration: p.duration_seconds || fallback?.duration,
              tools: p.tools_used || fallback?.tools,
            });
          });
        }

        if (Array.isArray(json.data["ai-teasers"])) {
          json.data["ai-teasers"].forEach((p: {
            id?: number;
            title: string;
            src: string;
            aspect_ratio?: "16:9" | "9:16";
            duration_seconds?: number;
            tools_used?: string;
          }) => {
            const fallback = ALL_VIDEOS.find(v => v.src === p.src);
            dynamicList.push({
              id: p.id || fallback?.id,
              title: cleanDbTitle(p.title, p.src),
              src: p.src,
              category: "ai-teasers",
              aspectRatio: p.aspect_ratio || fallback?.aspectRatio || "16:9",
              duration: p.duration_seconds || fallback?.duration,
              tools: p.tools_used || fallback?.tools,
            });
          });
        }

        if (dynamicList.length > 0) {
          setVideos(dynamicList);
        }
      })
      .catch(() => {
        // Keep pristine ALL_VIDEOS defaults
      });
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050508] text-[#f0f4ff]">
      <Navbar />
      <Hero />

      <div className="divider" />

      {/* Main Unified Video Showcase */}
      <VideoGallery
        id="showcase"
        title="Featured Video Productions"
        subtitle="Explore high-impact commercial campaigns and cinematic film teasers directed with state-of-the-art neural diffusion models."
        videos={videos}
      />

      <div className="divider" />

      <ToolsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
