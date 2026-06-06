import Navbar from '@/components/layout/Navbar';
import { Download, Linkedin, Twitter, Github, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Navbar />
      
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-20">
          <div className="w-48 h-48 rounded-3xl overflow-hidden glass border-accent-purple/30 p-2 shrink-0 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          
          <div>
            <header className="mb-6">
              <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">I AM <span className="text-gradient">MAIMOON</span></h1>
              <p className="text-gray-400 text-lg max-w-md">Ready to build the next generation of autonomous systems? Let&apos;s discuss your vision.</p>
            </header>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                Specializing in the intersection of large language models and autonomous reasoning, I build systems that don&apos;t just generate text&mdash;they solve problems.
              </p>
              <p>
                With a background in full-stack engineering and a passion for cognitive architectures, I&apos;ve spent the last 5 years architecting multi-agent systems that operate in complex, real-world environments.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-accent-purple rounded-xl font-bold flex items-center gap-2 glow glow-hover transition-all">
                Download Resume <Download className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 px-6 py-3 glass rounded-xl">
                 <Github className="w-6 h-6 hover:text-accent-light cursor-pointer transition-colors" />
                 <Linkedin className="w-6 h-6 hover:text-accent-light cursor-pointer transition-colors" />
                 <Twitter className="w-6 h-6 hover:text-accent-light cursor-pointer transition-colors" />
                 <Mail className="w-6 h-6 hover:text-accent-light cursor-pointer transition-colors" />
              </div>
              <div className="bg-bg-deep rounded-xl p-6 border border-white/5 font-mono text-sm overflow-x-auto my-8">
                <code className="text-accent-light"># Initialize Agent<br/>
                agent = AgentCore(<br/>
                &nbsp;&nbsp;architecture=&quot;autonomous&quot;,<br/>
                &nbsp;&nbsp;capabilities=[&quot;reasoning&quot;, &quot;tool_use&quot;]<br/>
                )</code>
              </div>
            </div>
          </div>
        </div>

        {/* Stats / Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: 'Domains', value: '12' },
            { label: 'Projects', value: '25+' },
            { label: 'Experience', value: '5y+' },
            { label: 'Accuracy', value: '98%' },
          ].map((stat) => (
            <div key={stat.label} className="p-8 glass text-center">
              <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Expertise Section */}
        <div className="glass p-12 mb-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-purple/10 blur-[80px]" />
          <h2 className="text-3xl font-bold mb-8">Core Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-accent-light font-bold mb-4 uppercase text-sm tracking-widest">Architectures</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> ReAct & Plan-and-Execute</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> Multi-Agent Orchestration</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> Memory Consolidation Pipelines</li>
              </ul>
            </div>
            <div>
              <h3 className="text-accent-light font-bold mb-4 uppercase text-sm tracking-widest">Tech Stack</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> Next.js 14 & Django REST</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> LangGraph & CrewAI</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> Vector DBs (Pinecone, Qdrant)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
