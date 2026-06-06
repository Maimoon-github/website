"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ContactService } from '@/services/contact.service';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const result = await ContactService.submitMessage(formData);
    
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-light mb-6">
                Communication Node
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">ESTABLISH <span className="text-gradient">LINK</span></h1>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg">
                Ready to architect the next generation of autonomous systems? Send a transmission to start the collaboration.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-light group-hover:scale-110 group-hover:bg-accent-purple/20 transition-all border border-white/5">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Direct Transmission</div>
                    <div className="text-xl font-bold">hello@antigravity.ai</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-accent-mid/10 flex items-center justify-center text-accent-light group-hover:scale-110 group-hover:bg-accent-mid/20 transition-all border border-white/5">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Secure Channel</div>
                    <div className="text-xl font-bold">Signal: @antigravity_core</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-3xl border-white/10 relative overflow-hidden animate-in fade-in slide-in-from-right duration-1000">
              {status === 'success' ? (
                <div className="py-20 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Transmission Received</h2>
                  <p className="text-gray-400 mb-8 max-w-xs mx-auto">Your link request has been successfully indexed. Expect a response shortly.</p>
                  <Button variant="glass" onClick={() => setStatus('idle')}>New Transmission</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Agent Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Email Protocol</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Link Subject</label>
                    <input 
                      required
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">Payload Content</label>
                    <textarea 
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-accent-purple transition-colors resize-none"
                      placeholder="Describe your vision..."
                    />
                  </div>
                  
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm animate-in fade-in">
                      <AlertCircle className="w-4 h-4" /> Link failed. Node offline or validation error.
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-5 text-lg flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? 'Encrypting...' : <>Initialize Link <Send className="w-5 h-5" /></>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
