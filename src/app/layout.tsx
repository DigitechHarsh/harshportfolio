import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

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
  title: "AI Creations by Harsh | AI Video Creator Portfolio",
  description:
    "Explore a stunning portfolio of AI-generated video ads and cinematic teasers. Crafted with cutting-edge AI tools like Veo 3.1, Flow Omni, Seedance 2.0, and Nano Banana.",
  keywords: [
    "AI Video",
    "AI Ads",
    "AI Teaser",
    "Video Portfolio",
    "Veo 3.1",
    "Flow Omni",
    "Seedance 2.0",
    "Nano Banana",
    "AI Creator",
  ],
  authors: [{ name: "Harsh" }],
  openGraph: {
    title: "AI Creations by Harsh",
    description: "AI-powered video ads and cinematic teasers portfolio",
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
