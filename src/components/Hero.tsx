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
        const speed = (i + 1) * 15;
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
      className="relative min-h-screen flex items-center overflow-hidden py-28 sm:py-32"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="parallax-orb absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-25 transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="parallax-orb absolute bottom-[10%] right-[10%] w-[650px] h-[650px] rounded-full opacity-20 transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid lines background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-8 xl:gap-16 items-center">
        
        {/* Left - Text & Telemetry (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 text-center lg:text-left">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.01] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.4)] text-xs font-bold tracking-wider uppercase text-white/70 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Status: Available
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white">
            Crafting <span className="gradient-text">AI-Powered</span>
            <span className="block mt-2">
              Video{" "}
              <span className="relative inline-block">
                Magic
                <svg
                  className="absolute -bottom-2.5 left-0 w-full"
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
                    <linearGradient
                      id="underline-grad"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                    >
                      <stop stopColor="#8B5CF6" />
                      <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Transforming brands with cinematic AI video advertisements and breathtaking cinematic teasers. Powered by next-generation neural design models.
          </p>

          {/* Glowing Tool Chips */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
            {[
              { name: "Veo 3.1", color: "text-violet-400 border-violet-500/25 bg-violet-500/5 hover:border-violet-400/40" },
              { name: "Seedance 2.0", color: "text-cyan-400 border-cyan-500/25 bg-cyan-500/5 hover:border-cyan-400/40" },
              { name: "Imagen 2.0", color: "text-fuchsia-400 border-fuchsia-500/25 bg-fuchsia-500/5 hover:border-fuchsia-400/40" },
              { name: "Flow Omni", color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/5 hover:border-emerald-400/40" },
              { name: "Imagen Nano", color: "text-amber-400 border-amber-500/25 bg-amber-500/5 hover:border-amber-400/40" }
            ].map(t => (
              <div
                key={t.name}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wide shadow-sm transition-all duration-300 cursor-default ${t.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                {t.name}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={() => scrollTo("ai-ads")}
              className="btn-3d px-10 py-4 rounded-full text-white font-bold text-xs tracking-wider uppercase cursor-pointer shadow-lg"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-3d-secondary px-10 py-4 rounded-full text-white/80 font-bold text-xs tracking-wider uppercase cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Stats Telemetry Dashboard */}
          <div className="glass-3d p-6 rounded-2xl border border-white/5 shadow-xl max-w-lg mx-auto lg:mx-0 pt-5">
            <div className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-4 flex items-center gap-2 justify-center lg:justify-start">
              <span className="led-indicator led-green" /> Telemetry Data Readout
            </div>
            <div className="grid grid-cols-3 gap-6 divide-x divide-white/5">
              {[
                { value: "18+", label: "Completed Projects" },
                { value: "10+", label: "AI Video Ads" },
                { value: "8+", label: "Cinematic Teasers" },
              ].map((stat, i) => (
                <div key={stat.label} className={`text-center ${i > 0 ? "pl-4 sm:pl-6" : ""}`}>
                  <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider font-semibold mt-1.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Interactive 3D HUD aperture container (5 columns) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] xl:w-[380px] xl:h-[380px] flex items-center justify-center group">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/15 via-cyan-500/10 to-fuchsia-500/15 opacity-60 blur-3xl pointer-events-none" />

            {/* HUD Outer Technical Ring 1 (Rotating Clockwise) */}
            <div className="absolute inset-0 border border-dashed border-cyan-500/20 rounded-full animate-hud-spin pointer-events-none" />
            
            {/* HUD Outer Technical Ring 2 (Rotating Counter-Clockwise) */}
            <div className="absolute inset-4 border border-double border-violet-500/15 rounded-full animate-hud-spin-reverse pointer-events-none" />
            
            {/* HUD Target Marks */}
            <div className="absolute inset-8 border border-white/5 rounded-full flex items-center justify-between pointer-events-none opacity-30">
              <div className="w-4 h-px bg-cyan-400" />
              <div className="w-4 h-px bg-cyan-400" />
            </div>
            <div className="absolute inset-8 border border-white/5 rounded-full flex flex-col items-center justify-between pointer-events-none opacity-30">
              <div className="w-px h-4 bg-cyan-400" />
              <div className="w-px h-4 bg-cyan-400" />
            </div>

            {/* Center Camera Lens Assembly */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 xl:w-80 xl:h-80 rounded-full p-2 bg-gradient-to-b from-neutral-800 to-neutral-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_2px_5px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
              {/* Aperture ring */}
              <div className="absolute inset-2 rounded-full border border-black/85 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none" />

              {/* Picture Mask */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-black/95">
                <Image
                  src="/harsh2.jpeg"
                  alt="Harsh - AI Video Creator"
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                {/* Lens reflection layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/10 pointer-events-none mix-blend-color-dodge" />
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 filter blur-md pointer-events-none" />
              </div>
            </div>

            {/* Floating HUD Badges */}
            <div className="absolute -top-1 -right-1 glass-3d px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-violet-300 shadow-lg flex items-center gap-1.5 cursor-default uppercase">
              <span className="led-indicator led-violet" /> HUD.SYS
            </div>
            <div className="absolute -bottom-1 -left-1 glass-3d px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-cyan-300 shadow-lg flex items-center gap-1.5 cursor-default uppercase animate-pulse">
              <span className="led-indicator led-cyan" /> SYS.ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce cursor-pointer" onClick={() => scrollTo("ai-ads")}>
        <span className="text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
