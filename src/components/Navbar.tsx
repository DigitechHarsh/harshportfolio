"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",      href: "#hero" },
  { label: "Showcase",  href: "#showcase" },
  { label: "Pipeline",  href: "#tools" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("#hero");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (bottom) { setActive("#contact"); return; }

      for (const { href } of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(href);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (href: string) => {
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar px-5 sm:px-7 py-3 flex items-center justify-between ${scrolled ? "scrolled" : ""}`}>
      {/* Brand */}
      <a
        href="#hero"
        onClick={e => { e.preventDefault(); goto("#hero"); }}
        className="flex items-center gap-2.5 group"
      >
        <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shrink-0">
          <Image src="/logo.png" alt="Logo" fill sizes="32px" className="object-contain p-1" priority />
        </div>
        <div className="leading-none">
          <div className="font-bold text-sm tracking-widest text-white font-[family-name:var(--font-outfit)] group-hover:text-violet-300 transition-colors">
            HARSH AI
          </div>
          <div className="text-[9px] tracking-widest text-white/35 uppercase font-semibold">CREATIONS</div>
        </div>
      </a>

      {/* Desktop nav pills */}
      <div className="hidden md:flex items-center gap-1 bg-black/50 px-1.5 py-1.5 rounded-full border border-white/[0.07]">
        {NAV_LINKS.map(link => {
          const isActive = active === link.href;
          return (
            <button
              key={link.href}
              onClick={() => goto(link.href)}
              className={`relative px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-white/15" />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right CTA */}
      <div className="hidden sm:flex items-center gap-3">
        <Link
          href="/admin"
          className="text-[11px] font-bold tracking-wider uppercase text-white/35 hover:text-white/70 transition-colors px-2"
        >
          Admin
        </Link>
        <button
          onClick={() => goto("#contact")}
          className="btn-primary !py-2 !px-5 text-[11px]"
        >
          Let&apos;s Talk
        </button>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.08]"
        aria-label="Menu"
      >
        <span className={`w-4 h-0.5 bg-white rounded transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`w-4 h-0.5 bg-white rounded transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`w-4 h-0.5 bg-white rounded transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-[calc(100%+12px)] left-0 right-0 rounded-3xl border border-white/12 bg-neutral-950/95 backdrop-blur-2xl p-4 shadow-2xl flex flex-col gap-2">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => goto(link.href)}
              className={`text-left px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                active === link.href
                  ? "text-white bg-white/[0.07] border border-white/15"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.07] mt-1 px-1">
            <Link href="/admin" className="text-xs font-bold text-white/40">🔒 Admin</Link>
            <button onClick={() => goto("#contact")} className="btn-primary !py-2 !px-4 text-[10px]">
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
