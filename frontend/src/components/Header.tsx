import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
          AG<span className="text-indigo-600">.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link href="/blog" className="text-sm font-medium hover:text-indigo-600 transition-colors">Blog</Link>
          <Link href="/projects" className="text-sm font-medium hover:text-indigo-600 transition-colors">Projects</Link>
          <Link href="/about" className="text-sm font-medium hover:text-indigo-600 transition-colors">About</Link>
          <Link 
            href="/contact" 
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
