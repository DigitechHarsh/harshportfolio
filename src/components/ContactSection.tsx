"use client";

import { useState } from "react";
import { submitContactInquiry } from "@/lib/api";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("AI Commercial Ad");
  const [budget, setBudget] = useState("₹50k - ₹1.5L");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const fullMessage = `Service: ${service}\nBudget: ${budget}\n\n${message}`;
    const res = await submitContactInquiry({
      name,
      email,
      phone,
      subject: service,
      message: fullMessage,
    });

    setLoading(false);
    if (res.success) {
      setStatusMsg({
        type: "success",
        text: "Thank you! Your project inquiry has been received. Harsh will get back to you within 24 hours.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      setStatusMsg({
        type: "error",
        text: res.message || "Something went wrong. Please reach out directly on WhatsApp or Email.",
      });
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 overflow-hidden scroll-mt-28">
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-black tracking-widest uppercase text-white/60">
              COMMISSION A PRODUCTION
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Let&apos;s Build <span className="gradient-text-hero">Something Epic</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed">
            Have a commercial campaign, concept trailer, or brand vision in mind? Let&apos;s turn your ideas into cinematic AI masterpieces.
          </p>
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* Left Column (5 cols): Direct Contacts & WhatsApp Fast Lane */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* WhatsApp Quick Chat Highlight Card */}
            <a
              href="https://wa.me/918160587315?text=Hi%20Harsh,%20I'm%20interested%20in%20an%20AI%20video%20production%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 group shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl">
                  💬
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black tracking-wider uppercase border border-emerald-500/40 animate-pulse">
                  FASTEST RESPONSE
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                Chat Directly on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium mb-3">
                Need immediate quotes, script breakdowns, or urgent project deliveries?
              </p>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>+91 81605 87315</span>
                <span>→</span>
              </div>
            </a>

            {/* Email Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-2xl shrink-0">
                ✉️
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  OFFICIAL INQUIRY
                </div>
                <a
                  href="mailto:aicreationsbyharsh@gmail.com"
                  className="font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors truncate block"
                >
                  aicreationsbyharsh@gmail.com
                </a>
              </div>
            </div>

            {/* Location & Turnaround Badge */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl shrink-0">
                🌍
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  STUDIO LOCATION &amp; TURNAROUND
                </div>
                <div className="font-bold text-sm text-white">
                  Surat, Gujarat, India • Global 24/7 Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Full Project Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl flex flex-col gap-6"
            >
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-[family-name:var(--font-outfit)] text-xl sm:text-2xl font-black text-white">
                  Project Briefing Form
                </h3>
                <p className="text-xs sm:text-sm text-white/50 font-medium mt-1">
                  Fill out your details below to receive a personalized proposal and timeline.
                </p>
              </div>

              {/* Service Selection Chips */}
              <div>
                <label className="block text-xs font-black text-white/60 uppercase tracking-wider mb-2.5">
                  I Am Interested In:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI Commercial Ad",
                    "Cinematic Teaser & Film",
                    "3D Product Visuals",
                    "AI Music Video / VFX",
                    "Full Campaign Package",
                  ].map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setService(srv)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                        service === srv
                          ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white border border-white/20 shadow-md"
                          : "bg-white/[0.03] text-white/60 border border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Selection Chips */}
              <div>
                <label className="block text-xs font-black text-white/60 uppercase tracking-wider mb-2.5">
                  Estimated Budget Range:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "₹20k - ₹50k",
                    "₹50k - ₹1.5L",
                    "₹1.5L - ₹3.5L",
                    "₹3.5L+ (Enterprise)",
                  ].map((bg) => (
                    <button
                      type="button"
                      key={bg}
                      onClick={() => setBudget(bg)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                        budget === bg
                          ? "bg-white/20 text-white border border-white/30 shadow-md"
                          : "bg-white/[0.03] text-white/60 border border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe / Brand Manager"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">
                  Project Details / Vision *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your product, target audience, reference style or key timeline goals..."
                  className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                />
              </div>

              {/* Feedback Status Alert */}
              {statusMsg && (
                <div
                  className={`p-4 rounded-2xl text-xs font-bold ${
                    statusMsg.type === "success"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-red-500/20 text-red-300 border border-red-500/40"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-glow w-full py-4 rounded-full text-xs font-black tracking-widest uppercase cursor-pointer shadow-xl disabled:opacity-50"
              >
                {loading ? "Sending Brief..." : "Submit Project Brief →"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
