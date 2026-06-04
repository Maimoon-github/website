import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Antigravity",
    default: "Antigravity | Premium AI & Web Design Agency",
  },
  description: "Boutique digital agency building the future of the web with agentic AI and premium aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-screen flex flex-col bg-[#131026] text-[#e5defe] overflow-x-hidden selection:bg-[#8B65BF]/30">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
