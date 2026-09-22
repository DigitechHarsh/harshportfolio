"use client";

import { useEffect, useRef, useState } from "react";

const tools = [
  {
    name: "Veo 3.1",
    version: "V3.1-PRO",
    status: "led-green",
    description: "Cinematic high-definition AI video generation & storytelling",
    icon: "🎬",
    gradient: "from-violet-500/20 to-indigo-500/20",
    span: "md:col-span-2",
  },
  {
    name: "Seedance 2.0",
    version: "V2.0-MOTION",
    status: "led-cyan",
    description: "Next-gen AI motion synthesis & photorealistic video creation",
    icon: "⚡",
    gradient: "from-cyan-500/20 to-teal-500/20",
    span: "md:col-span-2",
  },
  {
    name: "Imagen 2.0",
    version: "V2.0-HD",
    status: "led-violet",
    description: "High-fidelity, photorealistic AI image generation",
    icon: "🎨",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    span: "md:col-span-2",
  },
  {
    name: "Flow Omni",
    version: "V1.0-REALTIME",
    status: "led-green",
    description: "Fluid, real-time interactive AI image & video processing",
    icon: "🌀",
    gradient: "from-emerald-500/20 to-teal-500/20",
    span: "md:col-span-3",
  },
  {
    name: "Imagen Nano",
    version: "V1.0-MOBILE",
    status: "led-cyan",
    description: "Lightning-fast mobile-optimized concepting & image rendering",
    icon: "✨",
    gradient: "from-amber-500/20 to-orange-500/20",
    span: "md:col-span-3",
  },
];

const process_steps = [
  {
    step: "01",
    title: "Concept & Script",
    desc: "Brainstorming the narrative, visual style, and creative direction.",
  },
  {
    step: "02",
    title: "AI Generation",
    desc: "Generating high-fidelity visuals using Veo 3.1, Seedance 2.0, Imagen 2.0, Flow Omni, and Imagen Nano.",
  },
  {
    step: "03",
    title: "Post Production",
    desc: "Editing, color grading, sound design, and VFX compositing.",
  },
  {
    step: "04",
    title: "Final Delivery",
    desc: "Exporting in multiple formats optimized for every platform.",
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
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white/40">
              Tech Stack
            </span>
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="gradient-text">Tools & Process</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-medium">
            Leveraging cutting-edge AI technology to create stunning visual experiences
          </p>
        </div>

        {/* Tools Symmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-24">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className={`group relative p-6 rounded-2xl glass-3d glass-3d-hover cursor-default overflow-hidden border border-white/5 ${tool.span} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {/* Inner ambient glow */}
              <div className={`absolute -inset-24 bg-gradient-to-br ${tool.gradient} opacity-15 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none blur-2xl`} />

              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                {/* Card Top: Version Tag & Status LED */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-black tracking-widest text-white/50 uppercase">
                    {tool.version}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-white/30 tracking-wider uppercase">ONLINE</span>
                    <span className={`led-indicator ${tool.status}`} />
                  </div>
                </div>

                {/* Card Middle: Icon & Title */}
                <div className="pt-2">
                  <div className="text-4xl mb-2.5 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">{tool.icon}</div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-black text-white text-lg tracking-wide">
                    {tool.name}
                  </h3>
                </div>

                {/* Card Bottom: Description */}
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-medium">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Creative Process */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-extrabold text-center mb-16 text-white/90 uppercase tracking-wider">
            Creative Roadmap
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Timeline connection line on desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-fuchsia-500/20 z-0 pointer-events-none" />

            {process_steps.map((item, i) => (
              <div
                key={item.step}
                className={`relative group transition-all duration-700 z-10 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150 + 800}ms` }}
              >
                <div className="glass-3d glass-3d-hover rounded-2xl p-6 h-full flex flex-col items-center text-center">
                  
                  {/* Step Circular Indicator */}
                  <div className="relative w-14 h-14 rounded-full bg-neutral-900 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_8px_16px_rgba(0,0,0,0.4)] flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full border border-dashed border-white/5 group-hover:border-cyan-500/30 group-hover:animate-hud-spin" />
                    <span className="font-[family-name:var(--font-outfit)] text-base font-black gradient-text tracking-tight z-10">
                      {item.step}
                    </span>
                  </div>

                  <h4 className="font-[family-name:var(--font-outfit)] font-black text-white text-base mb-2 tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
