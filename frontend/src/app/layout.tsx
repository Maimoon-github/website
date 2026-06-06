import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { constructMetadata } from "@/components/shared/seo";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = constructMetadata({
  title: "ANTIGRAVITY | Agentic AI Engineering Hub",
  description: "The definitive technical resource for designing and building production-grade Agentic AI systems.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased selection:bg-accent-purple selection:text-white font-sans`}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}

