"use client";

import Navbar from '@/components/layout/Navbar';
import { Send, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <header className="mb-12">
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">INITIATE <span className="text-gradient">CONTACT</span></h1>
              <p className="text-gray-400 text-lg max-w-md">Ready to build the next generation of autonomous systems? Let's discuss your vision.</p>
            </header>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent-light" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Email</div>
                  <div className="text-lg font-bold">hello@antigravity.ai</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-accent-light" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Collaboration</div>
                  <div className="text-lg font-bold">Open for Research & Consulting</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                  <MapPin className="w-6 h-6 text-accent-light" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Location</div>
                  <div className="text-lg font-bold">Remote / Global</div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Send className="w-32 h-32" />
            </div>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple transition-colors outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple transition-colors outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Subject</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple transition-colors outline-none" placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Message</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple transition-colors outline-none h-32 resize-none" placeholder="Tell me about your project..." />
              </div>
              
              <button className="w-full py-4 bg-accent-purple rounded-xl font-bold flex items-center justify-center gap-2 glow glow-hover transition-all">
                Send Transmission <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
