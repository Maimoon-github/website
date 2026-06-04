"use client";

import React, { useState, useEffect } from "react";
import { getContactInfo, sendContactMessage } from "../../lib/api";
import { ContactInfo } from "../../types";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    async function fetchInfo() {
      const info = await getContactInfo();
      setContactInfo(info);
    }
    fetchInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    const success = await sendContactMessage(formData);
    
    if (success) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--void)] text-[var(--foreground)] py-32 relative">
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <div className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4">
              Communicate
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display mb-8">
              Establish <br/> <span className="text-[var(--accent)] font-light">Connection</span>
            </h1>
            <p className="text-xl text-[#968E9C] font-medium leading-relaxed mb-12 max-w-lg">
              Initialize a secure channel to discuss projects, architectural inquiries, or system integrations. We respond swiftly.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center p-2 bg-[var(--surface)]/50 shrink-0">
                    <svg className="w-full h-full text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold mb-1">Direct Ping</h3>
                    <p className="text-[var(--muted)]">{contactInfo?.email || "hello@antigravity.agency"}</p>
                 </div>
              </div>
              
              {contactInfo?.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center p-2 bg-[var(--surface)]/50 shrink-0">
                      <svg className="w-full h-full text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                      <h3 className="text-xl font-bold mb-1">Voice Up-link</h3>
                      <p className="text-[#968E9C]">{contactInfo.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 flex items-center justify-center p-2 bg-[var(--surface)]/50 shrink-0">
                    <svg className="w-full h-full text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold mb-1">Global Node</h3>
                    <p className="text-[#968E9C]">{contactInfo?.address || "Remote & Accessible Worldwide"}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface)]/30 border border-[var(--surface)] rounded-2xl p-10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-[40px] rounded-full pointer-events-none" />
            
            <h3 className="text-2xl font-black mb-8">Transmission Form</h3>
            
            {status === "success" ? (
              <div className="bg-[var(--accent)]/20 border border-[var(--accent)]/40 rounded-lg p-6 text-center animate-fade-in text-[var(--foreground)]">
                <svg className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-xl font-bold mb-2">Transmission Received</h4>
                <p className="text-[#968E9C] text-sm">Our systems have successfully processed your message. We will respond shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-[var(--accent)] text-xs font-black tracking-widest hover:text-[var(--foreground)] transition-colors">SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg text-sm font-bold">
                    FAILED TO SEND TRANSMISSION. PLEASE RETRY OR USE DIRECT PING.
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-xs font-black tracking-widest text-[#968E9C] mb-2 uppercase">Entity Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[var(--void)]/50 border border-[var(--surface)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all font-medium"
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
                    className="w-full bg-[var(--void)]/50 border border-[var(--surface)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all font-medium"
                    placeholder="name@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-black tracking-widest text-[#968E9C] mb-2 uppercase">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[var(--void)]/50 border border-[var(--surface)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all font-medium"
                    placeholder="Operation type"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-black tracking-widest text-[#968E9C] mb-2 uppercase">Payload (Message)</label>
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[var(--void)]/50 border border-[var(--surface)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/50 transition-all resize-none font-medium"
                    placeholder="Detail your operational requirements..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-[var(--accent)] text-[var(--void)] hover:bg-[#A37BDB] font-black text-xs tracking-widest uppercase py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(139,101,191,0.2)] hover:shadow-[0_0_30px_rgba(139,101,191,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[var(--void)] border-t-transparent rounded-full animate-spin" />
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
