import { ReactNode } from "react";
import Link from "next/link";
import { 
  Terminal, 
  BookOpen, 
  Layout, 
  Send,
  User
} from "lucide-react";

interface SidebarLayoutProps {
  children: ReactNode;
  activeSection: 'projects' | 'blog' | 'knowledge' | 'about' | 'contact';
  sidebarExtra?: ReactNode;
}

const sections = [
  { id: 'projects', name: 'Projects', icon: Layout, href: '/projects', badge: 'Active' },
  { id: 'blog', name: 'Transmissions', icon: Terminal, href: '/blog', badge: 'Live' },
  { id: 'knowledge', name: 'Nexus Hub', icon: BookOpen, href: '/knowledge', badge: 'v2.0' },
  { id: 'about', name: 'Personnel', icon: User, href: '/about' },
  { id: 'contact', name: 'Signal', icon: Send, href: '/contact' },
];

export default function SidebarLayout({ children, activeSection, sidebarExtra }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <aside className="hidden lg:flex w-72 h-screen sticky top-0 border-r border-white/5 flex-col bg-background/50 backdrop-blur-xl">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center glow group-hover:scale-110 transition-transform">
              <span className="font-black text-white text-xs">AG</span>
            </div>
            <span className="font-black tracking-tighter uppercase text-white">Antigravity</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-6 px-2">Navigation_Nodes</div>
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <Link
                key={section.id}
                href={section.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-accent-purple/10 text-accent-light' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-accent-light' : 'group-hover:text-accent-light'}`} />
                <span className="text-sm font-bold uppercase tracking-tight">{section.name}</span>
                {section.badge && (
                  <span className="ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded border border-white/10 opacity-50">
                    {section.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {sidebarExtra && (
          <div className="flex-1 overflow-y-auto border-t border-white/5 py-6">
            {sidebarExtra}
          </div>
        )}

        <div className="p-6 border-t border-white/5">
          <div className="p-4 glass rounded-xl bg-accent-purple/5 space-y-3">
            <div className="text-[10px] font-mono text-accent-light/60 uppercase">System Status</div>
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Synchronized
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
              Last Sync: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
