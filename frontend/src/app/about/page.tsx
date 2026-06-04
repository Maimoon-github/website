import React from "react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Antigravity",
  description: "Learn more about Antigravity, our mission, vision, and team.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#131026] py-32 text-[#E5DEFE]">
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-12 font-display">
          About <span className="text-[#8B65BF] font-light">Us</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xl leading-relaxed text-[#968E9C] font-medium mb-6">
              We are Antigravity, a digital agency that builds the future of the web with
              cutting-edge artificial intelligence, agentic workflows, and uncompromised premium aesthetics.
            </p>
            <p className="text-xl leading-relaxed text-[#968E9C] font-medium mb-8">
              Our mission is to bridge the gap between high-tech research and production-grade software,
              empowering organizations to deploy scalable, state-of-the-art tools and experiences.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border-2 border-[#8B65BF]/30 flex items-center justify-center p-2 bg-[#1F1A40]/50 shrink-0">
                    <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-[#E5DEFE]">Fast & Scalable</h3>
                    <p className="text-[#968E9C]">Optimized architectures for performance at scale.</p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border-2 border-[#8B65BF]/30 flex items-center justify-center p-2 bg-[#1F1A40]/50 shrink-0">
                    <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-[#E5DEFE]">Premium Design</h3>
                    <p className="text-[#968E9C]">Pixel-perfect components and high-fidelity interfaces.</p>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-[#8B65BF]/10 blur-[60px] rounded-full opacity-50" />
            <div className="relative border-4 border-[#1F1A40] rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-[#131026]">
              {/* Optional image could go here */}
              <span className="text-[#8B65BF]/40 font-mono text-sm tracking-widest uppercase">Visual Payload Required</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
