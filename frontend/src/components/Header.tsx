'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#131026]/90 backdrop-blur-xl py-3 border-[#8B65BF]/20 shadow-lg' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          
          {/* Left Side: Star Symbol (Dropdown/Nav trigger) & Contact Info */}
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            <button className="text-[#8B65BF] hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
            <div className="hidden md:block">
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#968e9c]">Call or Whatsapp</p>
              <p className="text-xs font-bold text-[#e5defe]">0321 0011001</p>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-none text-center">
            <Link href="/" className="group inline-block">
              <span className="block text-xl font-black tracking-[0.2em] uppercase text-white group-hover:text-[#8B65BF] transition-colors font-display">MAIMOON</span>
              <span className="block text-[8px] tracking-[0.3em] uppercase text-[#8B65BF] font-mono leading-none">Agentic AI Engineer</span>
            </Link>
          </div>

          {/* Right Side: Info & Hamburger */}
          <div className="flex items-center justify-end gap-4 lg:gap-8 flex-1">
            <div className="hidden lg:block text-right">
              <p className="text-[10px] uppercase tracking-widest font-mono text-[#968e9c]">Email Protocol</p>
              <p className="text-xs font-bold text-[#e5defe]">info@maimoonamin.com</p>
            </div>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 hover:bg-[#1F1A40] rounded-lg transition-colors group"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className="h-0.5 w-full bg-[#e5defe] group-hover:bg-[#8B65BF] transition-all" />
                <span className="h-0.5 w-1/2 self-end bg-[#e5defe] group-hover:bg-[#8B65BF] transition-all" />
                <span className="h-0.5 w-full bg-[#e5defe] group-hover:bg-[#8B65BF] transition-all" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0e0b21]/80 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Panel */}
        <aside 
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#131026] border-l border-[#8B65BF]/20 shadow-2xl transition-transform duration-500 flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-8 flex justify-between items-center border-b border-[#1F1A40]">
            <span className="text-xs font-black tracking-widest text-[#8B65BF] uppercase font-mono">Navigation</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#968e9c] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-8 py-12 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`text-4xl font-black tracking-tighter transition-all hover:pl-4 ${
                  pathname === link.href 
                    ? 'text-[#8B65BF]' 
                    : 'text-[#e5defe] hover:text-[#8B65BF]'
                } font-display`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="p-8 border-t border-[#1F1A40] space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-[#968e9c] font-mono">System status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] pulsing-status" />
              <span className="text-xs font-bold">ALL CORE SYSTEMS ONLINE</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
