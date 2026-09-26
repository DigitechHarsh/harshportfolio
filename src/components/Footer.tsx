"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-neutral-950/70 backdrop-blur-xl pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/12 bg-neutral-900 shrink-0">
                <Image src="/logo.png" alt="Harsh AI Creations" fill sizes="36px" className="object-contain p-1" />
              </div>
              <span className="font-[family-name:var(--font-outfit)] font-black text-lg text-white tracking-wider">
                HARSH AI CREATIONS
              </span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed max-w-sm">
              Transforming imagination into photorealistic cinematic AI video productions, high-conversion commercial advertisements, and concept visual storytelling.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/35 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              Available for Freelance &amp; Studio Direction
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-1">Navigation</div>
            {[
              { label: "Home",               href: "#hero"       },
              { label: "AI Commercials",     href: "#ai-ads"     },
              { label: "Cinematic Teasers",  href: "#ai-teasers" },
              { label: "Creative Stack",     href: "#tools"      },
              { label: "Commission Work",    href: "#contact"    },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-sm text-white/55 hover:text-cyan-300 transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-1">Connect</div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: "WhatsApp",    href: "https://wa.me/918160587315",             icon: "💬" },
                { name: "Instagram",   href: "https://instagram.com/harshaicreations", icon: "📸" },
                { name: "YouTube",     href: "https://youtube.com/@harshaicreations",  icon: "🎬" },
                { name: "Email",       href: "mailto:aicreationsbyharsh@gmail.com",    icon: "✉️" },
              ].map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-3.5 py-2 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:border-cyan-400/30 transition-all flex items-center gap-1.5"
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
            <Link href="/admin" className="text-[11px] font-bold text-white/30 hover:text-white/60 transition-colors mt-1">
              🔐 Creator Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Harsh Patel · Harsh AI Creations. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 hover:text-white/60 transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
