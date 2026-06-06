"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Bot, Rocket, BookOpen, User, Mail } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Rocket },
  { name: 'Knowledge', href: '/knowledge', icon: Bot },
  { name: 'Projects', href: '/projects', icon: BookOpen },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center glow group-hover:scale-110 transition-transform">
                <Bot className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient">ANTIGRAVITY</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent-light",
                      isActive ? "text-accent-light bg-accent-purple/10" : "text-gray-300"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-accent-purple/20 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-white/5 shadow-2xl"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-accent-purple/20"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
