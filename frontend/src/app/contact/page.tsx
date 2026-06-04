"use client";

import React, { useState } from "react";
// We use client component for the form state.

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#131026] text-[#E5DEFE] py-32 relative">
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#8B65BF]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <div className="text-[#8B65BF] font-mono text-sm tracking-widest uppercase mb-4">
              Communicate
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display mb-8">
              Establish <br/> <span className="text-[#8B65BF] font-light">Connection</span>
            </h1>
            <p className="text-xl text-[#968E9C] font-medium leading-relaxed mb-12 max-w-lg">
              Initialize a secure channel to discuss projects, architectural inquiries, or system integrations. We respond swiftly.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-[#8B65BF]/30 flex items-center justify-center p-2 bg-[#1F1A40]/50 shrink-0">
                    <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold mb-1">Direct Ping</h3>
                    <p className="text-[#968E9C]">hello@antigravity.agency</p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-[#8B65BF]/30 flex items-center justify-center p-2 bg-[#1F1A40]/50 shrink-0">
                    <svg className="w-full h-full text-[#8B65BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold mb-1">Global Node</h3>
                    <p className="text-[#968E9C]">Remote & Accessible Worldwide</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1F1A40]/30 border border-[#1F1A40] rounded-2xl p-10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B65BF]/10 blur-[40px] rounded-full pointer-events-none" />
            
            <h3 className="text-2xl font-black mb-8">Transmission Form</h3>
            
            {status === "success" ? (
              <div className="bg-[#8B65BF]/20 border border-[#8B65BF]/40 rounded-lg p-6 text-center animate-fade-in text-[#E5DEFE]">
                <svg className="w-12 h-12 text-[#8B65BF] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-xl font-bold mb-2">Transmission Received</h4>
                <p className="text-[#968E9C] text-sm">Our systems have successfully processed your message. We will respond shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-[#8B65BF] text-xs font-black tracking-widest hover:text-[#E5DEFE] transition-colors">SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-xs font-black tracking-widest text-[#968E9C] mb-2 uppercase">Entity Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#131026]/50 border border-[#1F1A40] rounded-lg px-4 py-3 text-[#E5DEFE] focus:outline-none focus:border-[#8B65BF]/50 focus:ring-1 focus:ring-[#8B65BF]/50 transition-all font-medium"
                    placeholder="Enter your designation"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-black tracking-widest text-[#968E9C] mb-2 uppercase">Return Signal (Email)</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#131026]/50 border border-[#1F1A40] rounded-lg px-4 py-3 text-[#E5DEFE] focus:outline-none focus:border-[#8B65BF]/50 focus:ring-1 focus:ring-[#8B65BF]/50 transition-all font-medium"
                    placeholder="name@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-black tracking-widest text-[#968E9C] mb-2 uppercase">Payload (Message)</label>
                  <textarea 
                    id="message" 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#131026]/50 border border-[#1F1A40] rounded-lg px-4 py-3 text-[#E5DEFE] focus:outline-none focus:border-[#8B65BF]/50 focus:ring-1 focus:ring-[#8B65BF]/50 transition-all resize-none font-medium"
                    placeholder="Detail your operational requirements..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-[#8B65BF] text-[#131026] hover:bg-[#A37BDB] font-black text-xs tracking-widest uppercase py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(139,101,191,0.2)] hover:shadow-[0_0_30px_rgba(139,101,191,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#131026] border-t-transparent rounded-full animate-spin" />
                      PROCESSING...
                    </>
                  ) : "TRANSMIT PAYLOAD"}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}
