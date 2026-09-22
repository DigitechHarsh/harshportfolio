import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
              <Image
                src="/logo.png"
                alt="AI Creations Logo"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="font-[family-name:var(--font-outfit)] font-semibold text-sm gradient-text">
              AI Creations by Harsh
            </span>
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs" suppressHydrationWarning>
            © {new Date().getFullYear()} AI Creations by Harsh. All rights
            reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:aicreationsbyharsh@gmail.com"
              className="text-white/30 hover:text-violet-400 transition-colors duration-300"
              aria-label="Email"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a
              href="tel:+918160587315"
              className="text-white/30 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Phone"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
