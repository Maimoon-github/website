import Navbar from '@/components/layout/Navbar';
import { 
  ArrowLeft, Brain, Network, MemoryStick, PenTool, 
  Search, Settings, Eye, ShieldCheck, Zap, 
  Layers, Workflow, Terminal 
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ElementType> = {
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

// This would normally be a server component fetching from Django
export default function DomainDetail({ params }: { params: { slug: string } }) {
  const Icon = iconMap[params.slug] || Brain;
  const title = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className="pt-24 min-h-screen">
      <Navbar />
      
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/knowledge" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
        </Link>
        
        <header className="mb-16">
          <div className="w-16 h-16 bg-accent-purple/20 rounded-2xl flex items-center justify-center mb-6">
            <Icon className="text-accent-light w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">{title}</h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl">
            A deep-dive into the architectural patterns and production strategies for {title.toLowerCase()}.
          </p>
        </header>

        {/* Content Placeholder */}
        <div className="space-y-12">
          <div className="glass p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-accent-purple rounded-full" />
              Core Architecture Pattern
            </h2>
            <div className="prose prose-invert max-w-none text-gray-400 space-y-4">
              <p>In production agentic systems, {title.toLowerCase()} provides the critical layer for scaling autonomy. This section covers the fundamental concepts from the PRA loop to advanced implementation strategies.</p>
              <div className="bg-bg-deep rounded-xl p-6 border border-white/5 font-mono text-sm overflow-x-auto my-8">
                <code className="text-accent-light"># Initialize Agent with {title.toLowerCase()}<br/>
                agent = AgentCore(<br/>
                &nbsp;&nbsp;architecture=&quot;{params.slug}&quot;,<br/>
                &nbsp;&nbsp;capabilities=[&quot;reasoning&quot;, &quot;tool_use&quot;]<br/>
                )</code>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 glass border-l-4 border-l-accent-purple">
                <h3 className="font-bold mb-2">Technical Specs</h3>
                <p className="text-sm text-gray-500">Latency, throughput, and token economic considerations for this domain.</p>
             </div>
             <div className="p-8 glass border-l-4 border-l-accent-light">
                <h3 className="font-bold mb-2">Best Practices</h3>
                <p className="text-sm text-gray-500">Industry-proven strategies for implementing {title.toLowerCase()} at scale.</p>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
