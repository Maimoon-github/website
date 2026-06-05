import React from "react";
import type { Metadata } from "next";
import { getServices } from "../../lib/api";

export const metadata: Metadata = {
  title: "Services | Antigravity",
  description: "Explore the cutting-edge services offered by Antigravity, ranging from full-stack web development to AI integration.",
};

// Simple icon mapper based on icon_name
const IconMap: Record<string, React.ReactNode> = {
  'code': (
    <svg className="w-8 h-8 text-[#8B65BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'design': (
    <svg className="w-8 h-8 text-[#8B65BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  'ai': (
    <svg className="w-8 h-8 text-[#8B65BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
};

const DefaultIcon = (
  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-[var(--void)] text-[var(--foreground)] py-32 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">
        <div className="text-center mb-24">
          <div className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4">
            Capabilities Matrix
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display mb-6">
            Our <span className="text-[var(--accent)] font-light">Services</span>
          </h1>
          <p className="text-xl text-[#968E9C] font-medium leading-relaxed max-w-2xl mx-auto">
            We provide a suite of premium development and design services to elevate your digital presence and operational automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.length > 0 ? services.map((service) => (
            <div key={service.id} className="bg-[var(--surface)]/30 border border-[var(--surface)] rounded-2xl p-8 hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]/50 transition-all group relative overflow-hidden">
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl border border-[var(--accent)]/30 bg-[var(--void)] flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(139,101,191,0.1)] group-hover:scale-110 transition-transform">
                  {IconMap[service.icon_name] || DefaultIcon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#E5DEFE]">{service.title}</h3>
                <p className="text-[#968E9C] leading-relaxed mb-6 flex-grow">
                  {service.short_description}
                </p>
                {service.price_starting_at && (
                  <div className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-2">
                    STARTING AT ${service.price_starting_at}
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center border border-dashed border-[var(--surface)] rounded-2xl">
              <span className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase">Service Nodes Not Currently Available</span>
            </div>
          )}
        </div>
        
        <div className="mt-24 text-center border border-[var(--surface)] bg-[var(--surface)]/20 rounded-2xl p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Ready to Initialize a New Project?</h2>
          <p className="text-[#968E9C] text-lg mb-8">
            Contact us to define the architecture and payload of your next venture.
          </p>
          <a href="/contact" className="inline-block bg-[var(--accent)] text-[var(--void)] px-10 py-4 rounded-md font-black text-sm tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_rgba(139,101,191,0.3)]">
            OPEN COMMS CHANNEL
          </a>
        </div>
      </div>
    </main>
  );
}
