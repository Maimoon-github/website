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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2F2F2]/95 backdrop-blur-md border-b border-zinc-200">
        {/* max-w aligned with home page's 1200px for perfect vertical rhythm */}
        <div className="max-w-[1248px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left Block: Star + Phone 
              Controlled gaps (gap-12) for a breathable, non-tangled look
          */}
          <div className="flex items-center gap-8 lg:gap-12 flex-1">
            <button className="text-[#131026] hover:text-[#8B65BF] transition-all transform hover:scale-110 active:scale-95">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
            <div className="hidden lg:flex items-baseline gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8B65BF]">Call:</span>
              <span className="text-xs font-bold text-[#131026] tracking-tight">0321 0011001</span>
            </div>
          </div>

          {/* Center Block: Logo 
              Ensuring the logo is the absolute center of the viewport
          */}
          <div className="flex-none px-4">
            <Link href="/" className="group block py-2">
              <img 
                src="/image/maimoon logo.jpeg" 
                alt="MAIMOON" 
                className="h-12 md:h-14 w-auto mix-blend-multiply transition-transform group-hover:scale-105 duration-300"
              />
            </Link>
          </div>

          {/* Right Block: Email + Menu 
              Mirrored gaps for perfect symmetry
          */}
          <div className="flex items-center justify-end gap-8 lg:gap-12 flex-1">
            <div className="hidden lg:flex items-baseline gap-2 text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8B65BF]">Mail:</span>
              <span className="text-xs font-bold text-[#131026]">info@maimoonamin.com</span>
            </div>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="group p-1 relative flex flex-col gap-1.5 w-6 items-end"
              aria-label="Toggle Menu"
            >
              <span className="h-0.5 w-full bg-[#131026] rounded-full group-hover:bg-[#8B65BF] transition-all" />
              <span className="h-0.5 w-3/4 bg-[#131026] rounded-full group-hover:bg-[#8B65BF] transition-all" />
              <span className="h-0.5 w-full bg-[#131026] rounded-full group-hover:bg-[#8B65BF] transition-all" />
            </button>
          </div>
        </div>
      </header>

      {/* spacer height matches header's h-20 */}
      <div className="h-20" />

      {/* Sidebar - Precise Slide-in */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <aside 
          className={`absolute top-0 right-0 h-full w-full max-w-[400px] bg-[#131026] text-white p-12 shadow-2xl transition-transform duration-500 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B65BF]">Navigation Area</span>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-[#8B65BF]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-5xl font-black tracking-tighter transition-all hover:pl-4 hover:text-[#8B65BF] ${
                  pathname === link.href ? 'text-[#8B65BF]' : 'text-zinc-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-12 left-12 right-12 p-8 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[10px] uppercase font-black tracking-widest text-[#8B65BF] mb-2">Inquiry</p>
            <p className="text-sm font-medium">Have a specific project? <br/> Let's build the architecture.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
