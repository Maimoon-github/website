import Link from 'next/link';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { NewsletterForm } from '@/components/shared/forms';

const footerLinks = {
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'Knowledge', href: '/knowledge' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ],
  domains: [
    { name: 'Agent Architecture', href: '/knowledge/agent-architecture' },
    { name: 'Multi-Agent Systems', href: '/knowledge/multi-agent-systems' },
    { name: 'RAG Architecture', href: '/knowledge/rag' },
    { name: 'Production Hub', href: '/knowledge/production' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Email', href: 'mailto:hello@antigravity.ai', icon: Mail },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-deep/80 backdrop-blur-xl pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center glow">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient">ANTIGRAVITY</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The definitive hub for Agentic AI Engineering. Architecting the future of autonomous intelligence with production-grade cognitive systems.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-accent-light transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Core Domains</h3>
            <ul className="space-y-4">
              {footerLinks.domains.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Transmission</h3>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our technical logs for deep-dives into agentic architectures.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-mono tracking-widest">
            © 2026 ANTIGRAVITY. BUILT FOR THE NEXT GENERATION.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-xs">Privacy Protocol</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-xs">Service Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
