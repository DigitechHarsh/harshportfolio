"use client";

const tools = [
  {
    name: "Midjourney v6",
    cat: "Diffusion Generation",
    desc: "Hyper-photorealistic commercial imagery, character keyframes & luxury product aesthetics.",
    icon: "🎨",
    badge: "Core Visuals",
    color: "text-violet-300",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-violet-500/10",
  },
  {
    name: "Runway Gen-3 Alpha",
    cat: "Video Synthesis",
    desc: "Ultra HD temporal motion, fluid camera movements & dynamic cinematic action sequences.",
    icon: "⚡",
    badge: "Motion FX",
    color: "text-indigo-300",
    border: "hover:border-indigo-500/40",
    glow: "hover:shadow-indigo-500/10",
  },
  {
    name: "Kling AI & Luma",
    cat: "Neural Physics",
    desc: "Complex fluid physics, cinematic transformations, dynamic 3D camera sweeps.",
    icon: "🌌",
    badge: "3D Motion",
    color: "text-cyan-300",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-cyan-500/10",
  },
  {
    name: "ComfyUI & SDXL",
    cat: "Custom Pipelines",
    desc: "Bespoke ControlNet workflows, IP-Adapter facial consistency & custom style finetuning.",
    icon: "⚙️",
    badge: "Custom Pipeline",
    color: "text-fuchsia-300",
    border: "hover:border-fuchsia-500/40",
    glow: "hover:shadow-fuchsia-500/10",
  },
  {
    name: "ElevenLabs AI",
    cat: "Neural Audio",
    desc: "Studio-grade neural voice synthesis, dynamic vocal emotion & multilingual dubbing.",
    icon: "🎙️",
    badge: "Voice & Audio",
    color: "text-amber-300",
    border: "hover:border-amber-500/40",
    glow: "hover:shadow-amber-500/10",
  },
  {
    name: "Adobe Premiere & AE",
    cat: "Post Production",
    desc: "DaVinci color grading, spatial sound design, VFX composite & ProRes 4K mastering.",
    icon: "✂️",
    badge: "Color & VFX",
    color: "text-emerald-300",
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-emerald-500/10",
  },
];

const steps = [
  { n: "01", title: "Concept & Storyboard",    desc: "Brand analysis, viral script hooks, AI moodboards and scene keyframes." },
  { n: "02", title: "Generative Production",   desc: "Photorealistic video with Runway Gen-3, Kling AI & custom diffusion pipelines." },
  { n: "03", title: "Voice & Sound Design",    desc: "Cinematic custom scores, neural voiceovers, spatial foley effects." },
  { n: "04", title: "VFX & 4K Master",         desc: "After Effects, DaVinci, Premiere — crystal-clear 4K HDR, all platforms." },
];

export default function ToolsSection() {
  return (
    <section id="tools" className="relative py-24 sm:py-32 scroll-mt-24">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-[10px] font-black tracking-widest uppercase text-white/50">
              Production Pipeline
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl font-black text-white mb-3">
            Creative <span className="gradient-heading">Tech Stack</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed">
            World&apos;s most advanced generative AI tools combined with professional post-production suites.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20">
          {tools.map(tool => (
            <div
              key={tool.name}
              className={`glass rounded-2xl p-6 flex flex-col gap-4 border border-white/[0.09] transition-all duration-350 cursor-default ${tool.border} hover:shadow-lg ${tool.glow}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{tool.icon}</span>
                <span className="text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70">
                  {tool.badge}
                </span>
              </div>
              <div>
                <h3 className={`font-[family-name:var(--font-outfit)] text-lg font-bold mb-0.5 ${tool.color}`}>{tool.name}</h3>
                <p className="text-[10px] font-bold text-white/35 uppercase tracking-wider mb-2">{tool.cat}</p>
                <p className="text-sm text-white/60 leading-relaxed">{tool.desc}</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex justify-between text-[10px] font-mono font-bold text-white/30">
                <span>PIPELINE: ACTIVE</span>
                <span className="text-emerald-400">● READY</span>
              </div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="glass rounded-3xl p-8 sm:p-12 border border-white/[0.09]">
          <div className="mb-10">
            <p className="text-[10px] font-black tracking-widest uppercase text-cyan-400 mb-2">HOW WE WORK</p>
            <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-4xl font-black text-white">
              From Concept to 4K Master in 4 Steps
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(s => (
              <div key={s.n} className="flex flex-col gap-2">
                <span className="font-[family-name:var(--font-outfit)] text-5xl font-black text-white/10">{s.n}</span>
                <h4 className="text-white font-bold text-base">{s.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
