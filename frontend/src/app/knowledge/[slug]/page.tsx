import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Brain, Network, MemoryStick, PenTool, Search, Settings, Eye, ShieldCheck, Zap, Layers, Workflow, Terminal } from 'lucide-react';
import Link from 'next/link';
import { KnowledgeService } from '@/services/knowledge.service';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';

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

export const dynamic = 'force-dynamic';

export default async function DomainDetail({ params }: { params: { slug: string } }) {
  const domain = await KnowledgeService.getDomain(params.slug);

  if (!domain) {
    notFound();
  }

  const Icon = iconMap[params.slug] || Brain;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <section className="max-w-5xl mx-auto px-4">
          <Link href="/knowledge" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-light transition-colors mb-12 font-mono text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Collective Memory
          </Link>
          
          <header className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-accent-purple/20 rounded-3xl flex items-center justify-center glow border border-accent-purple/30">
                <Icon className="text-accent-light w-10 h-10" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Domain_{domain.order.toString().padStart(2, '0')}</div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">{domain.name}</h1>
              </div>
            </div>
            
            <p className="text-gray-400 text-xl leading-relaxed max-w-3xl mb-8">
              {domain.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {domain.key_concepts.map((concept) => (
                <Badge key={concept} variant="outline" className="px-4 py-1.5 uppercase tracking-wider font-mono text-[10px] bg-white/5">
                  {concept}
                </Badge>
              ))}
            </div>
          </header>

          <div className="space-y-12">
            <div className="glass p-8 md:p-12 relative overflow-hidden border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <Icon className="w-64 h-64" />
              </div>
              
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <div className="w-2 h-8 bg-accent-purple rounded-full" />
                Technical Overview
              </h2>
              
              <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
                <p className="text-lg leading-relaxed">
                  In production agentic systems, {domain.name.toLowerCase()} provides the critical framework for autonomous decision-making and operational stability. This domain covers the core integration patterns between cognitive reasoning and external tool execution.
                </p>
                
                <div className="bg-bg-deep rounded-2xl p-8 border border-white/5 font-mono text-sm overflow-x-auto my-12 shadow-inner">
                  <header className="flex items-center gap-2 mb-4 text-gray-600 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-grow-500/20" />
                    <span className="ml-2 text-[10px] uppercase tracking-widest font-bold">implementation_manifest.py</span>
                  </header>
                  <code className="text-accent-light"># Initialize Agentic Node with {domain.name}<br/>
                  node_config = {`{`}<br/>
                  &nbsp;&nbsp;&quot;domain&quot;: &quot;{domain.slug}&quot;,<br/>
                  &nbsp;&nbsp;&quot;orchestrator&quot;: &quot;autonomous_v2&quot;,<br/>
                  &nbsp;&nbsp;&quot;memory_layer&quot;: &quot;semantic_kv&quot;,<br/>
                  &nbsp;&nbsp;&quot;gateways&quot;: [&quot;mcp_standard&quot;]<br/>
                  {`}`}<br/><br/>
                  execution_bridge = BridgeFactory.spawn(node_config)</code>
                </div>

                <p>
                  Deploying {domain.name.toLowerCase()} involves careful consideration of latency, token economy, and state consistency. Below are the primary implementation vectors identified for this architecture.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 glass border-l-4 border-l-accent-purple bg-accent-purple/5">
                  <h3 className="font-bold text-lg mb-4 uppercase tracking-tighter">Production Specs</h3>
                  <ul className="space-y-4 text-sm text-gray-400 font-mono uppercase tracking-widest">
                    <li className="flex justify-between"><span>Throughput</span> <span className="text-white">High</span></li>
                    <li className="flex justify-between"><span>State Retention</span> <span className="text-white">Persistent</span></li>
                    <li className="flex justify-between"><span>Context Limit</span> <span className="text-white">128k+</span></li>
                  </ul>
               </div>
               <div className="p-10 glass border-l-4 border-l-accent-light bg-accent-light/5">
                  <h3 className="font-bold text-lg mb-4 uppercase tracking-tighter">Strategic Impact</h3>
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    &quot;Standardizing {domain.name.toLowerCase()} is the key to unlocking true cross-platform agency without sacrificing security.&quot;
                  </p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
