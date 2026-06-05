import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--void)] text-[var(--foreground)] py-24 border-t border-[var(--accent)]/10 relative overflow-hidden">
      {/* Background glow for consistency */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--lotus-core)]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        <div className="md:col-span-6">
          <Link href="/" className="text-4xl font-black tracking-tighter text-[var(--foreground)] mb-8 block">
            MAIMOON<span className="text-[var(--accent)]">.</span>
          </Link>
          <p className="text-[var(--muted)] max-w-md text-lg font-medium leading-relaxed">
            Architecting the future through autonomous agentic systems and premium digital experiences.
          </p>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-8">Navigation</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">ARCHIVES</Link></li>
            <li><Link href="/projects" className="hover:text-[var(--accent)] transition-colors">PROJECTS</Link></li>
            <li><Link href="/about" className="hover:text-[var(--accent)] transition-colors">ABOUT</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">CONTACT</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-8">Socials</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">TWITTER</a></li>
            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">GITHUB</a></li>
            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">LINKEDIN</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-10 mt-24 pt-10 border-t border-[var(--accent)]/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-widest text-[var(--muted)]">
        <span>© {new Date().getFullYear()} MAIMOON. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-8">
          <span className="cursor-pointer hover:text-[var(--accent)]">PRIVACY POLICY</span>
          <span className="cursor-pointer hover:text-[var(--accent)]">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
}
