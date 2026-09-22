"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const orbs = section.querySelectorAll<HTMLElement>(".parallax-orb");
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 12;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="parallax-orb absolute -top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-30 transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)",
          }}
        />
        <div
          className="parallax-orb absolute bottom-[5%] right-[5%] w-[700px] h-[700px] rounded-full opacity-25 transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 65%)",
          }}
        />
        <div
          className="parallax-orb absolute top-[40%] right-[35%] w-[450px] h-[450px] rounded-full opacity-15 transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(217,70,239,0.25) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Futuristic Cyber-Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">
        
        {/* Left Column (7 cols): Hero Pitch, Tags & Telemetry */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-xl shadow-lg text-xs font-black tracking-widest uppercase text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </span>
            <span className="text-white/90">AI Video Director &amp; VFX Artist</span>
            <span className="text-white/30">•</span>
            <span className="text-cyan-400">Available for Projects</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-6xl xl:text-7xl font-black leading-[1.06] tracking-tight text-white max-w-2xl">
            Crafting <span className="gradient-text-hero">Cinematic Visuals</span>
            <span className="block mt-1 sm:mt-2 text-white">
              with{" "}
              <span className="gradient-text-accent relative inline-block">
                Neural AI
                <svg
                  className="absolute -bottom-2 left-0 w-full opacity-80"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="url(#underline-grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#8B5CF6" />
                      <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed font-medium">
            Empowering luxury brands, commercial directors, and visionary agencies with photorealistic AI commercials, movie trailers, and high-impact visual storytelling.
          </p>

          {/* Neural Models Pill Cloud */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
            {[
              { name: "Midjourney v6", icon: "🎨", border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-300" },
              { name: "Runway Gen-3 Alpha", icon: "⚡", border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "text-indigo-300" },
              { name: "Kling AI", icon: "🎬", border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-300" },
              { name: "Luma Dream Machine", icon: "🌌", border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10", text: "text-fuchsia-300" },
              { name: "ElevenLabs Voice", icon: "🎙️", border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-300" },
              { name: "Premiere & After Effects", icon: "✂️", border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-300" },
            ].map((model) => (
              <div
                key={model.name}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-wide transition-transform duration-300 hover:scale-105 cursor-default ${model.border} ${model.bg} ${model.text}`}
              >
                <span>{model.icon}</span>
                <span>{model.name}</span>
              </div>
            ))}
          </div>

          {/* High-Impact CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={() => scrollTo("ai-ads")}
              className="btn-primary-glow px-8 sm:px-10 py-4 rounded-full text-xs font-black tracking-wider uppercase cursor-pointer shadow-xl flex items-center gap-2"
            >
              <span>Explore Showreels (19)</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary-glass px-8 sm:px-10 py-4 rounded-full text-xs font-black tracking-wider uppercase cursor-pointer flex items-center gap-2"
            >
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Live Telemetry Dashboard */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 w-full max-w-xl mt-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[10px] font-black uppercase tracking-widest text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]"></span>
                <span>Production Telemetry Readout</span>
              </div>
              <span className="text-emerald-400">STATUS: OPTIMAL</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 divide-x divide-white/10">
              {[
                { val: "50+", lbl: "Projects Done", sub: "Commercials & VFX" },
                { val: "2.5M+", lbl: "Views Generated", sub: "Brand Campaigns" },
                { val: "99%", lbl: "Client Retention", sub: "Worldwide Delivery" },
              ].map((item, idx) => (
                <div key={item.lbl} className={`text-center ${idx > 0 ? "pl-3 sm:pl-6" : ""}`}>
                  <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-neutral-100 to-cyan-300 bg-clip-text text-transparent">
                    {item.val}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-wider mt-0.5">
                    {item.lbl}
                  </div>
                  <div className="text-[9px] text-white/40 font-medium hidden sm:block mt-0.5">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 3D Director Console & Showreel Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-[300px] sm:w-[380px] xl:w-[420px] flex flex-col items-center">
            
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/20 via-cyan-500/20 to-fuchsia-500/15 blur-3xl opacity-70 pointer-events-none" />

            {/* Rotating Tech HUD Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-cyan-500/20 hud-ring-cw pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] rounded-full border border-dotted border-violet-500/20 hud-ring-ccw pointer-events-none" />

            {/* Glass Console Card */}
            <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/15 w-full relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
              
              {/* Top Console Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] font-black uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 items-end h-3">
                    <span className="w-1 bg-cyan-400 rounded-full soundbar-anim" style={{ animationDelay: "0s" }} />
                    <span className="w-1 bg-violet-400 rounded-full soundbar-anim" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1 bg-fuchsia-400 rounded-full soundbar-anim" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <span className="text-white/80">AI.DIRECTOR.FEED</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>4K UHD 60FPS</span>
                </div>
              </div>

              {/* Center Portrait with Hologram Aperture */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-inner group-hover:border-violet-400/40 transition-all duration-500">
                <Image
                  src="/harsh2.jpeg"
                  alt="Harsh - AI Video Creator & Director"
                  fill
                  sizes="(max-width: 640px) 280px, 380px"
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                
                {/* Holographic light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-violet-500/15 pointer-events-none mix-blend-color-dodge" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <div className="font-[family-name:var(--font-outfit)] font-black text-sm tracking-wide">
                      HARSH PATEL
                    </div>
                    <div className="text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                      Creative AI Specialist
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="5,3 19,12 5,21" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Pills */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] font-bold text-white/60">
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span>LATENCY:</span>
                  <span className="text-cyan-400 font-mono font-black">&lt; 24 HRS</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span>DELIVERY:</span>
                  <span className="text-violet-400 font-mono font-black">PRORES 4K</span>
                </div>
              </div>
            </div>

            {/* Floating Live Badges */}
            <div className="absolute -top-3 -right-3 glass-panel px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider text-violet-300 shadow-xl flex items-center gap-1.5 uppercase border border-violet-500/30 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
              <span>CERTIFIED AI PRODUCER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Scroll Indicator */}
      <div
        onClick={() => scrollTo("ai-ads")}
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white/40 hover:text-white transition-colors cursor-pointer z-10 animate-bounce"
      >
        <span className="text-[9px] font-black tracking-widest uppercase">Scroll to Projects</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
