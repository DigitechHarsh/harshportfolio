"use client";

import Image from "next/image";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,0.35) 0%, transparent 65%)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-7 items-center lg:items-start text-center lg:text-left">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-xs font-bold tracking-widest uppercase text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-white/80">AI Video Director &amp; VFX Artist</span>
              <span className="text-white/25">·</span>
              <span className="text-cyan-400">Open for Work</span>
            </div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-outfit)] text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.07] tracking-tight text-white">
              Crafting{" "}
              <span className="gradient-heading">Cinematic</span>
              <br />
              <span className="gradient-heading">Visuals</span>
              {" "}with{" "}
              <span className="gradient-accent relative inline-block">
                Neural AI
                {/* underline decoration */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 6C60 1.5 160 1.5 218 6" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="220" y2="0">
                      <stop stopColor="#7c3aed" />
                      <stop offset="1" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-white/60 max-w-lg leading-relaxed">
              Empowering brands, directors, and agencies with photorealistic AI commercials,
              cinematic teasers, and high-impact visual storytelling.
            </p>

            {/* Tool badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                { name: "Midjourney v6",       icon: "🎨", color: "text-violet-300 border-violet-500/30 bg-violet-500/10" },
                { name: "Runway Gen-3",        icon: "⚡", color: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10" },
                { name: "Kling AI",            icon: "🎬", color: "text-cyan-300   border-cyan-500/30   bg-cyan-500/10"   },
                { name: "Luma Dream Machine",  icon: "🌌", color: "text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10" },
                { name: "ElevenLabs",          icon: "🎙️", color: "text-amber-300  border-amber-500/30  bg-amber-500/10"  },
                { name: "Premiere Pro",        icon: "✂️", color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
              ].map(t => (
                <span
                  key={t.name}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold ${t.color}`}
                >
                  {t.icon} {t.name}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={() => scrollTo("ai-ads")} className="btn-primary">
                View Showreels (19)
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-outline">
                Book Consultation
              </button>
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl p-5 w-full max-w-lg grid grid-cols-3 divide-x divide-white/[0.07]">
              {[
                { val: "50+",   lbl: "Projects",       sub: "Commercials & VFX" },
                { val: "2.5M+", lbl: "Views",          sub: "Brand Campaigns"   },
                { val: "99%",   lbl: "Retention",      sub: "Worldwide"         },
              ].map((s, i) => (
                <div key={s.lbl} className={`text-center ${i > 0 ? "pl-4" : ""}`}>
                  <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                    {s.val}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-wide mt-0.5">{s.lbl}</div>
                  <div className="text-[9px] text-white/35 hidden sm:block mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Profile card ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 xl:w-96">

              {/* Ambient glow behind card */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/25 via-cyan-500/15 to-fuchsia-500/10 blur-3xl opacity-60 pointer-events-none scale-110" />

              {/* Rotating HUD rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full border border-dashed border-cyan-500/15 ring-cw pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full border border-dotted border-violet-500/15 ring-ccw pointer-events-none" />

              {/* Card */}
              <div className="glass rounded-3xl p-4 relative z-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
                
                {/* Card top bar */}
                <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-widest pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2 text-white/70">
                    <div className="flex gap-0.5 items-end h-3">
                      <span className="w-1 rounded-full bg-cyan-400   soundbar" style={{ animationDelay: "0s" }}   />
                      <span className="w-1 rounded-full bg-violet-400 soundbar" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1 rounded-full bg-fuchsia-400 soundbar" style={{ animationDelay: "0.4s" }} />
                    </div>
                    AI DIRECTOR FEED
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    4K LIVE
                  </div>
                </div>

                {/* Profile image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/[0.09]">
                  <Image
                    src="/harsh2.jpeg"
                    alt="Harsh Patel — AI Video Director"
                    fill
                    sizes="(max-width:640px) 288px, 320px"
                    className="object-cover"
                    priority
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/10 pointer-events-none" />

                  {/* Name overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="font-[family-name:var(--font-outfit)] font-black text-sm text-white tracking-wide">
                        HARSH PATEL
                      </div>
                      <div className="text-[10px] text-cyan-300 font-bold tracking-widest uppercase">
                        AI Video Director &amp; VFX
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-3 py-2 flex justify-between text-[10px] font-bold text-white/50">
                    <span>RESPONSE</span>
                    <span className="text-cyan-400">&lt; 24 HRS</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-3 py-2 flex justify-between text-[10px] font-bold text-white/50">
                    <span>DELIVERY</span>
                    <span className="text-violet-400">PRORES 4K</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 z-20 glass px-3 py-1.5 rounded-full border border-violet-500/30 text-[10px] font-black tracking-wider text-violet-300 uppercase flex items-center gap-1.5 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Certified AI Producer
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("ai-ads")}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
      >
        <span className="text-[9px] font-bold tracking-widest uppercase">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
}
