import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
      <body className="min-h-screen flex flex-col bg-[var(--void)] text-[var(--foreground)] overflow-x-hidden selection:bg-[var(--accent)]/30">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
