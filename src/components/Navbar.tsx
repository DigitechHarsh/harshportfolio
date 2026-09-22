"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "AI Ads", href: "#ai-ads" },
  { label: "AI Teasers", href: "#ai-teasers" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Check if we are near the bottom of the page to activate Contact section
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActive("#contact");
        return;
      }

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
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
      className={`floating-nav px-6 py-2 flex items-center justify-between glass-strong border transition-all duration-500 ${
        scrolled
          ? "border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.12)] top-4 bg-black/40"
          : "border-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.4)] top-6 bg-transparent"
      }`}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          handleClick("#hero");
        }}
        className="flex items-center gap-3 group"
      >
        <div className="relative w-9 h-9 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 border border-white/10 shadow-md">
          <Image
            src="/logo.png"
            alt="AI Creations Logo"
            fill
            sizes="36px"
            className="object-contain"
            priority
          />
        </div>
        <span className="font-[family-name:var(--font-outfit)] font-black text-base tracking-wider bg-gradient-to-r from-white via-neutral-100 to-cyan-400 bg-clip-text text-transparent group-hover:to-violet-400 transition-all duration-300 hidden sm:inline">
          AI Creations
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-1.5 bg-neutral-950/40 p-1 rounded-full border border-white/5">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleClick(link.href)}
            className={`relative px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${
              active === link.href
                ? "text-white"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            {active === link.href && (
              <span className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_2px_4px_rgba(0,0,0,0.2)]" />
            )}
            <span className="relative z-10">{link.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-full hover:bg-white/5 transition-colors"
        aria-label="Toggle menu"
      >
        <span
          className={`w-5 h-0.5 bg-white/80 rounded-full transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-white/80 rounded-full transition-all duration-300 ${
            menuOpen ? "opacity-0 scale-0" : ""
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-white/80 rounded-full transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-strong overflow-hidden transition-all duration-500 rounded-3xl mt-2 border border-white/[0.08] shadow-[0_15px_30px_rgba(0,0,0,0.8)] ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 flex flex-col gap-2 bg-neutral-950/80 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                active === link.href
                  ? "text-white bg-white/[0.08] border border-white/[0.08]"
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
