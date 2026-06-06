"use client";

import { motion } from 'framer-motion';
import { 
  Network, MemoryStick, PenTool, Search, 
  Settings, Eye, ShieldCheck, Zap, 
  Layers, Workflow, Terminal, Brain
} from 'lucide-react';
import Link from 'next/link';

const domains = [
  { name: 'Agent Architecture', icon: Brain, slug: 'agent-architecture', desc: 'The cognitive backbone of autonomous systems.' },
  { name: 'Multi-Agent Systems', icon: Network, slug: 'multi-agent-systems', desc: 'Collaborative swarms and orchestration topologies.' },
  { name: 'Memory Systems', icon: MemoryStick, slug: 'memory-systems', desc: 'The persistent layers of semantic and episodic storage.' },
  { name: 'Tool Use & MCP', icon: PenTool, slug: 'tool-use', desc: 'Extending capabilities through unified protocols.' },
  { name: 'RAG Architecture', icon: Search, slug: 'rag', desc: 'Advanced retrieval for high-fidelity grounding.' },
  { name: 'Orchestration', icon: Settings, slug: 'orchestration', desc: 'Reliable control flow and state management.' },
  { name: 'Observability', icon: Eye, slug: 'observability', desc: 'Deep tracing and evaluation of agent reasoning.' },
  { name: 'Security & Safety', icon: ShieldCheck, slug: 'security', desc: 'Governence, guardrails, and adversarial defense.' },
  { name: 'Infrastructure', icon: Zap, slug: 'infrastructure', desc: 'Deployment patterns and compute optimization.' },
  { name: 'Workflows', icon: Workflow, slug: 'workflows', desc: 'Event-driven automation and pipeline design.' },
  { name: 'Planning', icon: Layers, slug: 'planning', desc: 'Recursive decomposition and strategic reasoning.' },
  { name: 'Production Hub', icon: Terminal, slug: 'production', desc: 'System integration and operational excellence.' },
];

export default function DomainExplorer() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">The 12 <span className="text-gradient">Domains</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Master the complete spectrum of Agentic AI Engineering through our curated domain guides.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                href={`/knowledge/${domain.slug}`}
                className="group block h-full p-8 glass rounded-2xl glow-hover hover:border-accent-light/40 transition-all"
              >
                <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-purple/30 transition-transform">
                  <domain.icon className="text-accent-light w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent-light transition-colors">{domain.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{domain.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
