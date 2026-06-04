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
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      {/* 
          As per Screenshot 2026-06-05 004900.png:
          Layout: [Star] [Contact Phone] [MAIMOON Logo centered] [Contact Email] [Hamburger]
          Colors: White background, Purple accents.
      */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2F2F2] border-b border-zinc-200">
        <div className="max-w-[1600px] mx-auto px-10 h-24 flex items-center justify-between">
          
          {/* Left: Star & Phone (Strict mimicry) */}
          <div className="flex items-center gap-16 flex-1">
            <button className="text-black hover:text-[#8B65BF] transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
            <div className="hidden lg:flex items-center gap-3 text-zinc-900">
              <span className="text-[14px] font-bold">Call or Whatsapp:</span>
              <span className="text-[14px] font-medium tracking-tight">0321 0011001</span>
            </div>
          </div>

          {/* Center: Logo Image (Strictly replaced text with provided logo image) */}
          <div className="flex-none text-center">
            <Link href="/" className="inline-block group">
              <img 
                src="/image/maimoon logo.jpeg" 
                alt="MAIMOON Agentic AI Engineer" 
                className="h-16 w-auto mix-blend-multiply transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Right: Email & Hamburger (Strict mimicry) */}
          <div className="flex items-center justify-end gap-16 flex-1 text-black">
            <div className="hidden lg:block">
              <span className="text-[14px] font-medium">info@maimoonamin.com</span>
            </div>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="text-black hover:text-[#8B65BF] transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="h-24" />

      {/* Sidebar Navigation - Atmospheric Dark */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        
        <aside 
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#131026] text-white shadow-2xl transition-transform duration-500 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-10 flex justify-end">
            <button onClick={() => setIsOpen(false)} className="hover:text-[#8B65BF]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="px-12 py-8 flex flex-col gap-6">
            <p className="text-[#8B65BF] text-[10px] uppercase tracking-[0.3em] font-black mb-4">Protocol Selection</p>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-6xl font-black tracking-tighter transition-all hover:pl-4 hover:text-[#8B65BF] ${
                  pathname === link.href ? 'text-[#8B65BF]' : 'text-zinc-200'
                } font-display`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
