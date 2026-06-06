"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, Rocket, BookOpen, User, Mail, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navItems = [
  { name: 'Knowledge', href: '/knowledge', icon: Bot, desc: 'Agentic AI Architecture' },
  { name: 'Projects', href: '/projects', icon: Rocket, desc: 'Production Repositories' },
  { name: 'Blog', href: '/blog', icon: BookOpen, desc: 'Technical Transmissions' },
  { name: 'About', href: '/about', icon: User, desc: 'System Identity' },
  { name: 'Contact', href: '/contact', icon: Mail, desc: 'Link Establishment' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-bg-deep/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent-purple rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-gradient leading-none">ANTIGRAVITY</span>
              <span className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Autonomous Systems</span>
            </div>
          </Link>
          
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2",
                      isActive ? "text-accent-light bg-accent-purple/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="ml-4 pl-4 border-l border-white/10">
                <Button variant="primary" size="sm">
                  Access Core
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-80 b bg-bg-deep border-l border-white/5 z-50 p-8 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-xs font-mono text-accent-light tracking-widest uppercase">System Menu</span>
               <button onClick={() => setIsOpen(false)} className="p-2 glass rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group block p-4 glass rounded-2xl hover:bg-accent-purple/10 border-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-accent-light" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-700 ml-auto group-hover:text-accent-light group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
               <Button className="w-full" variant="primary">Access Core Entry</Button>
               <p className="mt-6 text-center text-xs text-gray-500 font-mono">NODE: ANTIGRAVITY_V2.0</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
        />
      )}
    </nav>
  );
}
