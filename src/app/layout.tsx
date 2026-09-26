import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Patel | AI Video Director & Cinematic VFX Creator",
  description:
    "Explore the high-impact portfolio of Harsh Patel — AI Video Director & Cinematic VFX Creator crafting photorealistic commercials, cinematic trailers, and neural visuals with Midjourney, Runway Gen-3, and Kling AI.",
  keywords: [
    "Harsh Patel",
    "AI Video Director",
    "AI Commercials",
    "AI Teaser",
    "VFX Artist",
    "Runway Gen-3",
    "Midjourney v6",
    "Kling AI",
    "Luma Dream Machine",
    "ElevenLabs",
  ],
  authors: [{ name: "Harsh Patel" }],
  openGraph: {
    title: "Harsh Patel | AI Video Director Portfolio",
    description: "Photorealistic AI Commercials & Cinematic Visual Storytelling by Harsh Patel",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="noise-overlay" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
