"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-neutral-950/80 backdrop-blur-xl pt-16 pb-12 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Harsh AI Creations"
                  fill
                  sizes="36px"
                  className="object-contain p-1"
                />
              </div>
              <span className="font-[family-name:var(--font-outfit)] font-black text-lg text-white tracking-wider">
                HARSH AI CREATIONS
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-sm font-medium">
              Transforming imagination into photorealistic cinematic AI video productions, high-conversion commercial advertisements, and concept visual storytelling.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/40 font-mono mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Available for Freelance &amp; Studio Direction</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">
              Navigation
            </div>
            {[
              { label: "Home Overview", href: "#hero" },
              { label: "AI Commercial Ads", href: "#ai-ads" },
              { label: "Cinematic Teasers", href: "#ai-teasers" },
              { label: "Creative AI Stack", href: "#tools" },
              { label: "Commission a Project", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold text-white/60 hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Connect & Socials (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">
              Connect &amp; Social
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: "WhatsApp", href: "https://wa.me/918160587315", icon: "💬" },
                { name: "Instagram", href: "https://instagram.com/harshaicreations", icon: "📸" },
                { name: "YouTube", href: "https://youtube.com/@harshaicreations", icon: "🎬" },
                { name: "Email Studio", href: "mailto:aicreationsbyharsh@gmail.com", icon: "✉️" },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel px-3.5 py-2 rounded-2xl text-xs font-bold text-white/80 hover:text-white hover:border-cyan-400/40 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span>{soc.icon}</span>
                  <span>{soc.name}</span>
                </a>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] font-bold text-white/40 hover:text-white/80 transition-colors inline-flex items-center gap-1"
              >
                <span>🔐</span>
                <span>Creator Admin Dashboard</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/40">
          <div>
            © {new Date().getFullYear()} Harsh AI Creations. All rights reserved. Built with Next.js &amp; Cloudinary CDN.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
