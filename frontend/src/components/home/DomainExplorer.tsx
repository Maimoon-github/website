"use client";

import { motion } from 'framer-motion';
import { 
  Network, MemoryStick, PenTool, Search, 
  Settings, Eye, ShieldCheck, Zap, 
  Layers, Workflow, Terminal, Brain
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'agent-architecture': Brain,
  'multi-agent-systems': Network,
  'memory-systems': MemoryStick,
  'tool-use': PenTool,
  'rag': Search,
  'orchestration': Settings,
  'observability': Eye,
  'security': ShieldCheck,
  'infrastructure': Zap,
  'workflows': Workflow,
  'planning': Layers,
  'production': Terminal,
};

interface Domain {
  name: string;
  slug: string;
  description: string;
}

interface DomainExplorerProps {
  domains?: Domain[];
}

export default function DomainExplorer({ domains: propDomains }: DomainExplorerProps) {
  const displayDomains = propDomains || [];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">The <span className="text-gradient">Domains</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Master the complete spectrum of Agentic AI Engineering through our curated domain guides.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDomains.map((domain, index) => {
            const Icon = iconMap[domain.slug] || Brain;
            return (
              <motion.div
                key={domain.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  href={`/knowledge/${domain.slug}`}
                  className="group block h-full p-8 glass rounded-2xl glow-hover hover:border-accent-light/40 transition-all border border-white/5"
                >
                  <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-purple/30 transition-transform">
                    <Icon className="text-accent-light w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-light transition-colors text-white uppercase tracking-tight">{domain.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{domain.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
