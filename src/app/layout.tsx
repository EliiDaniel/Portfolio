import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ParticlesBackground from "@/components/ParticlesBackground";
import SmoothScroll from "@/components/SmoothScroll";
import { resume } from "@/data/resume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eli Monteroso | Software Engineer",
  description:
    "Portfolio of Eli Daniel Israel Monteroso, a Software Engineer working across C++, live game development, and full-stack web.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ParticlesBackground className="fixed inset-0 -z-10" />
        <SmoothScroll>
          <NavBar name={resume.name} />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
