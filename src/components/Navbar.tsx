"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "AI Commercials", href: "#ai-ads" },
  { label: "Teasers & Films", href: "#ai-teasers" },
  { label: "Creative Stack", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActive("#contact");
        return;
      }

      const sections = ["hero", "ai-ads", "ai-teasers", "tools", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActive(`#${sections[i]}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`floating-navbar px-4 sm:px-6 py-2.5 flex items-center justify-between border transition-all duration-500 ${
        scrolled
          ? "bg-neutral-950/80 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9),_inset_0_1px_1px_rgba(255,255,255,0.15)] top-3"
          : "bg-neutral-950/40 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] top-5"
      }`}
    >
      {/* Brand Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          handleClick("#hero");
        }}
        className="flex items-center gap-3 group cursor-pointer"
      >
        <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-white/15 shadow-md bg-neutral-900 group-hover:border-violet-400/50 transition-all duration-300">
          <Image
            src="/logo.png"
            alt="Harsh AI Creations"
            fill
            sizes="36px"
            className="object-contain p-1"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-outfit)] font-black text-sm sm:text-base tracking-wider bg-gradient-to-r from-white via-neutral-100 to-cyan-300 bg-clip-text text-transparent group-hover:to-violet-400 transition-all duration-300">
            HARSH AI
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 -mt-0.5">
            CREATIONS
          </span>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-1 bg-black/50 p-1.5 rounded-full border border-white/10 shadow-inner">
        {navLinks.map((link) => {
          const isActive = active === link.href;
          return (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-white/50 hover:text-white/90"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-indigo-600/30 to-cyan-500/30 rounded-full border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Action: Let's Talk CTA & Admin Link */}
      <div className="hidden sm:flex items-center gap-3">
        <Link
          href="/admin"
          className="text-[11px] font-bold tracking-wider uppercase text-white/40 hover:text-white/80 transition-colors px-2.5 py-1 rounded-lg hover:bg-white/5"
        >
          Admin
        </Link>
        <button
          onClick={() => handleClick("#contact")}
          className="btn-primary-glow px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase cursor-pointer"
        >
          Let&apos;s Talk
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-full bg-white/5 border border-white/10"
        aria-label="Toggle menu"
      >
        <span
          className={`w-4 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-4 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-4 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-400 rounded-3xl mt-3 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95)] ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 flex flex-col gap-2 bg-neutral-950/95 backdrop-blur-3xl">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`text-left px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
                active === link.href
                  ? "text-white bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-white/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-1 px-2">
            <Link
              href="/admin"
              className="text-xs font-bold text-white/50 hover:text-white"
            >
              🔒 Admin Access
            </Link>
            <button
              onClick={() => handleClick("#contact")}
              className="btn-primary-glow px-4 py-2 rounded-full text-xs font-bold uppercase"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
