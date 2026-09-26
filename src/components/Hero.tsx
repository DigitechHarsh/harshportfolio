"use client";

import Image from "next/image";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Cinematic Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,0.4) 0%, transparent 65%)" }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT COLUMN: Director Pitch & Headline ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-white/80">Harsh Patel &bull; AI Video Director</span>
              <span className="text-white/20">&bull;</span>
              <span className="text-cyan-400 font-extrabold">Available for Commissions</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight text-white">
              Directing the Future of{" "}
              <span className="gradient-heading">Cinematic AI</span>
              <br />
              <span className="gradient-accent relative inline-block mt-1">
                Visual Productions
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 240 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 6C70 1.5 170 1.5 238 6" stroke="url(#accentUnderline)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="accentUnderline" x1="0" y1="0" x2="240" y2="0">
                      <stop stopColor="#7c3aed" />
                      <stop offset="1" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed">
              Crafting photorealistic AI commercials, cinematic teasers, and hyper-stylized visual campaigns for global brands, agencies, and directors with next-generation neural motion engines.
            </p>

            {/* AI Tools Ribbon */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
              {[
                { name: "Midjourney v6",       icon: "🎨", color: "text-violet-300 border-violet-500/30 bg-violet-500/10" },
                { name: "Runway Gen-3",        icon: "⚡", color: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10" },
                { name: "Kling AI",            icon: "🎬", color: "text-cyan-300   border-cyan-500/30   bg-cyan-500/10"   },
                { name: "Luma Dream Machine",  icon: "🌌", color: "text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10" },
                { name: "ElevenLabs",          icon: "🎙️", color: "text-amber-300  border-amber-500/30  bg-amber-500/10"  },
                { name: "Premiere Pro / VFX",  icon: "✂️", color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
              ].map(t => (
                <span
                  key={t.name}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${t.color}`}
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </span>
              ))}
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start pt-2">
              <button
                onClick={() => scrollTo("showcase")}
                className="btn-primary !px-7 !py-3.5 text-xs flex items-center gap-2 cursor-pointer shadow-xl shadow-violet-600/30"
              >
                <span>View All Showreels (19)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="https://wa.me/918160587315?text=Hi%20Harsh,%20I'm%20interested%20in%20directing%20an%20AI%20video%20commercial%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !px-6 !py-3.5 text-xs flex items-center gap-2 text-emerald-400 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer"
              >
                <span>💬 WhatsApp Quick Chat</span>
              </a>
            </div>

            {/* Live Metrics bar */}
            <div className="glass rounded-2xl p-4 sm:p-5 w-full max-w-lg grid grid-cols-3 divide-x divide-white/[0.08] mt-2 border border-white/10">
              <div className="text-center px-2">
                <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-wide mt-0.5">
                  Productions
                </div>
                <div className="text-[9px] text-white/40 hidden sm:block mt-0.5">
                  Ads &amp; VFX Films
                </div>
              </div>

              <div className="text-center px-2">
                <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                  2.5M+
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-wide mt-0.5">
                  Total Views
                </div>
                <div className="text-[9px] text-white/40 hidden sm:block mt-0.5">
                  Campaign Reach
                </div>
              </div>

              <div className="text-center px-2">
                <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-white/70 uppercase tracking-wide mt-0.5">
                  Satisfaction
                </div>
                <div className="text-[9px] text-white/40 hidden sm:block mt-0.5">
                  ProRes 4K Mastered
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Harsh Patel Profile Header Banner ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">

              {/* Backlight Glow Aura */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-600/30 via-cyan-500/20 to-fuchsia-600/20 blur-3xl opacity-70 pointer-events-none scale-105" />

              {/* Profile Card Container */}
              <div className="relative z-10 glass rounded-3xl p-4 sm:p-5 border border-white/15 bg-neutral-950/85 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col gap-4">

                {/* Card Top Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold tracking-wider text-white/80 uppercase">
                      DIRECTOR PROFILE
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 uppercase tracking-widest">
                    4K PRODUCER
                  </span>
                </div>

                {/* Profile Portrait (Harsh Patel) */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner group">
                  <Image
                    src="/harsh2.jpeg"
                    alt="Harsh Patel — AI Video Director & VFX Artist"
                    fill
                    unoptimized
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlays for cinematic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/15 via-transparent to-cyan-500/15 pointer-events-none" />

                  {/* Overlay Name Banner */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="font-[family-name:var(--font-outfit)] font-black text-xl text-white tracking-wide drop-shadow-md">
                        HARSH PATEL
                      </div>
                      <div className="text-xs text-cyan-300 font-bold tracking-widest uppercase flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        AI Video Director &bull; VFX
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quick Info Badges */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 flex flex-col gap-0.5">
                    <span className="text-white/40 uppercase tracking-wider">LOCATION</span>
                    <span className="text-white font-medium">Surat, Gujarat, India</span>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 flex flex-col gap-0.5">
                    <span className="text-white/40 uppercase tracking-wider">DELIVERY FORMAT</span>
                    <span className="text-cyan-300 font-medium">ProRes 4K HDR</span>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 flex flex-col gap-0.5">
                    <span className="text-white/40 uppercase tracking-wider">RESPONSE TIME</span>
                    <span className="text-emerald-400 font-medium">&lt; 12 Hours</span>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 flex flex-col gap-0.5">
                    <span className="text-white/40 uppercase tracking-wider">PIPELINE</span>
                    <span className="text-violet-300 font-medium">Gen-3 &bull; Midjourney</span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Director Badge */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-20 glass px-3.5 py-1.5 rounded-full border border-violet-400/40 text-[10px] font-black tracking-wider text-violet-200 uppercase flex items-center gap-1.5 shadow-2xl bg-neutral-950/90">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                Verified AI Director
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
