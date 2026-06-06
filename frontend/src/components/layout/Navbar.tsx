"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, Rocket, BookOpen, User, Mail, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

import MobileMenu from './MobileMenu';

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

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navItems={navItems} />
    </nav>
  );
}
