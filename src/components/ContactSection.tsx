"use client";

import { useState } from "react";
import { submitContactInquiry } from "@/lib/api";

const SERVICES  = ["AI Commercial Ad", "Cinematic Teaser & Film", "3D Product Visuals", "AI Music Video / VFX", "Full Campaign Package"];
const BUDGETS   = ["₹20k – ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹3.5L", "₹3.5L+ (Enterprise)"];

export default function ContactSection() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [budget,  setBudget]  = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await submitContactInquiry({
      name, email, phone,
      subject: service,
      message: `Service: ${service}\nBudget: ${budget}\n\n${message}`,
    });
    setLoading(false);
    if (res.success) {
      setStatus({ ok: true, msg: "Thank you! Harsh Patel will respond within 24 hours." });
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } else {
      setStatus({ ok: false, msg: res.message || "Something went wrong. Please reach out on WhatsApp." });
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/[0.09] text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors";

  return (
    <section id="contact" className="relative py-24 sm:py-32 scroll-mt-24">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, rgba(8,145,178,0.4) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-black tracking-widest uppercase text-white/50">Commission a Production</span>
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-black text-white mb-3">
            Let&apos;s Build <span className="gradient-heading">Something Epic</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            Have a campaign, teaser, or brand vision? Let&apos;s turn your ideas into cinematic AI masterpieces.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">

          {/* Left — contacts */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* WhatsApp card */}
            <a
              href="https://wa.me/918160587315?text=Hi%20Harsh,%20I'm%20interested%20in%20an%20AI%20video%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-1 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl">💬</div>
                <span className="text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 animate-pulse">
                  Fastest
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Chat on WhatsApp
              </h3>
              <p className="text-xs text-white/45 mt-1 mb-3">Immediate quotes, script breakdowns, urgent deliveries.</p>
              <div className="text-sm font-bold text-emerald-400">+91 81605 87315 →</div>
            </a>

            {/* Email card */}
            <div className="glass rounded-2xl p-5 border border-white/[0.09] flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl shrink-0">✉️</div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white/35 uppercase tracking-wider">Official Inquiry</p>
                <a href="mailto:aicreationsbyharsh@gmail.com" className="font-bold text-sm text-white hover:text-cyan-300 transition-colors truncate block">
                  aicreationsbyharsh@gmail.com
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="glass rounded-2xl p-5 border border-white/[0.09] flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl shrink-0">🌍</div>
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase tracking-wider">Studio Location</p>
                <p className="font-bold text-sm text-white">Surat, Gujarat, India</p>
                <p className="text-xs text-white/40">Global 24/7 Delivery</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-9 border border-white/[0.09] flex flex-col gap-6"
            >
              <div className="border-b border-white/[0.07] pb-4">
                <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black text-white">Project Briefing Form</h3>
                <p className="text-xs text-white/40 mt-1">Fill out the details below to receive a personalized proposal.</p>
              </div>

              {/* Service chips */}
              <div>
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-2.5">Service *</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(s => (
                    <button
                      key={s} type="button" onClick={() => setService(s)} className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide cursor-pointer transition-all ${
                        service === s
                          ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white border border-white/20 shadow-md"
                          : "bg-white/[0.04] text-white/55 border border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* Budget chips */}
              <div>
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-2.5">Budget Range *</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map(b => (
                    <button
                      key={b} type="button" onClick={() => setBudget(b)} className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide cursor-pointer transition-all ${
                        budget === b
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-white/[0.04] text-white/55 border border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >{b}</button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Your Name *</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Email *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@company.com" className={inputCls} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Phone / WhatsApp</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Project Vision *</label>
                <textarea rows={4} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Describe your product, audience, style references, timeline…" className={`${inputCls} resize-none`} />
              </div>

              {/* Status */}
              {status && (
                <div className={`p-4 rounded-xl text-xs font-bold border ${status.ok ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : "bg-red-500/15 text-red-300 border-red-500/30"}`}>
                  {status.msg}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? "Sending…" : "Submit Project Brief →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
