import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6 block">
            AG<span className="text-indigo-600">.</span>
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
            Building the next generation of web experience with agentic AI and premium design.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Links</h4>
          <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Socials</h4>
          <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
        © {new Date().getFullYear()} Antigravity. All rights reserved.
      </div>
    </footer>
  );
}
