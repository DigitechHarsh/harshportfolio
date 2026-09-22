"use client";

import { useEffect, useRef, useState } from "react";

const tools = [
  {
    name: "Midjourney v6",
    category: "Diffusion Generation",
    desc: "Hyper-photorealistic commercial imagery, character keyframes & luxury product aesthetics.",
    icon: "🎨",
    badge: "Core Visuals",
    gradient: "from-violet-500/20 to-indigo-500/10",
    border: "group-hover:border-violet-400/50",
    color: "text-violet-300",
  },
  {
    name: "Runway Gen-3 Alpha",
    category: "Video Synthesis",
    desc: "Ultra high-definition temporal motion, fluid camera movements & dynamic cinematic action.",
    icon: "⚡",
    badge: "Motion FX",
    gradient: "from-indigo-500/20 to-cyan-500/10",
    border: "group-hover:border-indigo-400/50",
    color: "text-indigo-300",
  },
  {
    name: "Kling AI & Luma",
    category: "Neural Physics",
    desc: "Complex fluid physics, cinematic transformations, dynamic lighting and 3D camera sweeps.",
    icon: "🌌",
    badge: "3D Motion",
    gradient: "from-cyan-500/20 to-teal-500/10",
    border: "group-hover:border-cyan-400/50",
    color: "text-cyan-300",
  },
  {
    name: "ComfyUI & SDXL",
    category: "Custom Pipelines",
    desc: "Bespoke ControlNet workflows, IP-Adapter facial consistency & custom style finetuning.",
    icon: "⚙️",
    badge: "Custom Pipeline",
    gradient: "from-fuchsia-500/20 to-pink-500/10",
    border: "group-hover:border-fuchsia-400/50",
    color: "text-fuchsia-300",
  },
  {
    name: "ElevenLabs AI",
    category: "Neural Audio",
    desc: "Studio-grade neural voice synthesis, dynamic vocal emotion & multilingual dubbing.",
    icon: "🎙️",
    badge: "Voice & Speech",
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "group-hover:border-amber-400/50",
    color: "text-amber-300",
  },
  {
    name: "Adobe Premiere & AE",
    category: "Post Production",
    desc: "Industry-standard DaVinci color grading, spatial sound design, VFX composite & ProRes 4K mastering.",
    icon: "✂️",
    badge: "Color & VFX",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "group-hover:border-emerald-400/50",
    color: "text-emerald-300",
  },
];

const steps = [
  {
    step: "01",
    title: "Creative Concept & Storyboard",
    desc: "We analyze your brand vision, develop viral script hooks, and create high-res AI moodboards and scene keyframes.",
  },
  {
    step: "02",
    title: "Generative Neural Production",
    desc: "Generating photorealistic video sequences using Runway Gen-3, Kling AI & custom diffusion models with strict continuity.",
  },
  {
    step: "03",
    title: "Voice, Music & Sound Design",
    desc: "Adding cinematic custom scores, studio neural voiceovers, spatial foley sound effects, and atmospheric mixing.",
  },
  {
    step: "04",
    title: "VFX, Color Grade & 4K Master",
    desc: "Final post-production in After Effects and Premiere Pro, delivering crystal-clear 4K HDR files optimized for all platforms.",
  },
];

export default function ToolsSection() {
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

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden scroll-mt-28"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-[10px] font-black tracking-widest uppercase text-white/60">
              NEXT-GEN PRODUCTION PIPELINE
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Creative <span className="gradient-text-hero">Tech Stack</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed">
            Leveraging the world&apos;s most advanced generative neural networks and professional post-production suites.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {tools.map((tool, idx) => (
            <div
              key={tool.name}
              className={`glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl group relative border border-white/10 flex flex-col justify-between transition-all duration-500 ${tool.border}`}
              style={{
                transitionDelay: `${idx * 70}ms`,
              }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl filter drop-shadow-md">{tool.icon}</span>
                  <span className="text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
                    {tool.badge}
                  </span>
                </div>

                <h3 className={`font-[family-name:var(--font-outfit)] text-xl font-bold mb-1.5 ${tool.color}`}>
                  {tool.name}
                </h3>
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">
                  {tool.category}
                </div>
                <p className="text-sm text-white/65 leading-relaxed font-medium">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono font-bold text-white/40">
                <span>PIPELINE: ACTIVE</span>
                <span className="text-emerald-400">● READY</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Production Roadmap */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-[10px] font-black tracking-widest uppercase text-cyan-400 mb-2 block">
              HOW WE WORK
            </span>
            <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-4xl font-black text-white">
              From Concept to 4K Master in 4 Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {steps.map((st, i) => (
              <div key={st.step} className="flex flex-col relative">
                <div className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-black bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent mb-3">
                  {st.step}
                </div>
                <h4 className="text-white font-bold text-base mb-2">
                  {st.title}
                </h4>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-medium">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
