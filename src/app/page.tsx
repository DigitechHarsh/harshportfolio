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

/* ── Fallback data (Cloudinary direct links) ─────────────────────── */
const DEFAULT_ADS: VideoItem[] = [
  { title: "Tata Sierra AI Commercial",    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081504/portfolio/ai-ads/fsrc0pndtwwnrshaodu3.mp4" },
  { title: "Puma Fly Runner Commercial",   src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081118/portfolio/ai-ads/i3r9azrt8x7q43pkxgjq.mp4" },
  { title: "Monster Energy Cinematic",     src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790063694/portfolio/ai-ads/c5yjieee5f8sem7sxqcu.mp4" },
  { title: "Diamond Luxury Jewelry Ad",    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790062979/portfolio/ai-ads/ecgvba8pxd2owgx9i7cd.mp4" },
  { title: "OM Divine Concept",            src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790080758/portfolio/ai-ads/yfp36rcvu9m7jsyovge4.mp4" },
  { title: "Flavour Of India Culinary",    src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790063300/portfolio/ai-ads/cjzlzqyriohfq9iuk1mt.mp4" },
  { title: "Mango Pulp Commercial",        src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790063319/portfolio/ai-ads/ufdzqkyke26nlhdczexp.mp4" },
  { title: "EON Corporate Solutions",      src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790062844/portfolio/ai-ads/fj7wwxnb1sdsiuygpm98.mp4" },
  { title: "The Good Vibe Fashion",        src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081513/portfolio/ai-ads/y8caywmdwtdb76dpraaj.mp4" },
  { title: "Futuristic AI Visuals",        src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790062710/portfolio/ai-ads/umzcguswvtugww4vaaug.mp4" },
];

const DEFAULT_TEASERS: VideoItem[] = [
  { title: "Mountain Dew AI Action",       src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082258/portfolio/ai-teasers/voibtdtylp2j32miz71e.mp4" },
  { title: "Cyber Samurai AI Teaser",      src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082293/portfolio/ai-teasers/dzvtgar5uvvs1woorsoe.mp4" },
  { title: "Action School Sequence",       src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082327/portfolio/ai-teasers/ref1xg6swvhg1z0isbcf.mp4" },
  { title: "Cinematic Encounter Teaser",   src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082148/portfolio/ai-teasers/dsey3f4wwxabilgf7ftw.mp4" },
  { title: "Divine Shloka AI Concept",     src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082132/portfolio/ai-teasers/a6vx5dng11nllbrm484h.mp4" },
  { title: "Dark Horizon Vision",          src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081525/portfolio/ai-teasers/dwpkkhpgsjt3j7ccddzx.mp4" },
  { title: "Neon Dreams Concept",          src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081529/portfolio/ai-teasers/ntnef4a9fhsoldnk2i8l.mp4" },
  { title: "Cyber Pulse Teaser",           src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790082139/portfolio/ai-teasers/jqqcmlkxfqv6vfq8cqsr.mp4" },
  { title: "Mystic Vision",                src: "https://res.cloudinary.com/la4ig9t3/video/upload/v1790081520/portfolio/ai-teasers/mhebbuthefnnfixlcewx.mp4" },
];

export default function Home() {
  const [ads,     setAds]     = useState<VideoItem[]>(DEFAULT_ADS);
  const [teasers, setTeasers] = useState<VideoItem[]>(DEFAULT_TEASERS);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects.php?grouped=true`)
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (!json?.success || !json?.data) return;
        if (Array.isArray(json.data["ai-ads"]) && json.data["ai-ads"].length > 0)
          setAds(json.data["ai-ads"].map((p: { title: string; src: string }) => ({ title: p.title, src: p.src })));
        if (Array.isArray(json.data["ai-teasers"]) && json.data["ai-teasers"].length > 0)
          setTeasers(json.data["ai-teasers"].map((p: { title: string; src: string }) => ({ title: p.title, src: p.src })));
      })
      .catch(() => {/* use defaults */});
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <Hero />

      <div className="divider" />

      <VideoGallery
        id="ai-ads"
        title="AI Video Ads"
        subtitle="Brand-focused AI-generated video advertisements that captivate audiences and drive engagement."
        accent="violet"
        videos={ads}
      />

      <div className="divider" />

      <VideoGallery
        id="ai-teasers"
        title="AI Teasers"
        subtitle="Cinematic AI-generated teasers and short films pushing the boundaries of visual storytelling."
        accent="cyan"
        videos={teasers}
      />

      <ToolsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
