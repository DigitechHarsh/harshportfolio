"use client";

import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91-8160587315",
    href: "tel:+918160587315",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "aicreationsbyharsh@gmail.com",
    href: "mailto:aicreationsbyharsh@gmail.com",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    value: "A-5, Shivam Appartment, Nehru Nagar, Ichchhanath, Surat-395007",
    href: "https://maps.google.com/?q=Ichchhanath+Surat",
  },
];

export default function ContactSection() {
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
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white/40">
              Get in Touch
            </span>
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="gradient-text">Let&apos;s Create Together</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-medium">
            Ready to bring your vision to life with AI-powered video? Hook into our terminal port.
          </p>
        </div>

        {/* Unified Dashboard Console Container */}
        <div
          className={`max-w-4xl mx-auto glass-3d p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Sockets / Ports (7 columns) */}
            <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
              <div className="text-[10px] font-black tracking-widest text-white/30 uppercase flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <span className="led-indicator led-cyan" /> COMM_PORTS ACTIVE
              </div>

              {contactInfo.map((info, i) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.label === "Address" ? "_blank" : undefined}
                  rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-white/5 hover:border-violet-500/25 transition-all duration-300 group cursor-pointer shadow-md"
                >
                  {/* Socket Bevel */}
                  <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-white/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),_0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center text-violet-400 group-hover:text-cyan-400 transition-colors">
                    {info.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-white/40 tracking-wider">
                        {info.label}
                      </span>
                      <span className={`led-indicator ${
                        info.label === "Phone" ? "led-green" : info.label === "Email" ? "led-violet" : "led-cyan"
                      }`} />
                    </div>
                    <p className={`text-white/70 text-xs sm:text-sm font-semibold mt-0.5 ${info.label === "Address" ? "break-words" : "truncate"}`}>
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Divider Line on Desktop */}
            <div className="hidden md:block w-px bg-white/5 self-stretch my-2 col-span-1 justify-self-center" />

            {/* Right Column: Tactile Launcher (4 columns) */}
            <div className="md:col-span-4 flex flex-col justify-between items-center text-center py-4">
              <div className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-4 md:mb-0">
                INITIATE_UPLINK
              </div>

              {/* Launcher trigger core */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Rotating HUD circle behind trigger */}
                <div className="absolute inset-0 border border-dashed border-cyan-500/20 rounded-full animate-hud-spin" />
                <div className="absolute inset-2 border border-white/5 rounded-full" />
                
                {/* Reactor Core Indicator */}
                <div className="w-16 h-16 rounded-full bg-neutral-950 border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 animate-pulse flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 led-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  </span>
                </div>
              </div>

              {/* Massive physical launching button */}
              <a
                href="mailto:aicreationsbyharsh@gmail.com"
                className="btn-3d w-full py-4 px-6 rounded-xl text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>UPLINK NOW</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
