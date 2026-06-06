import { Download, Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { CoreService } from '@/services/core.service';
import Container from '@/components/layout/Container';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { data: profile } = await CoreService.getProfile();

  return (
    <Container className="pt-32 pb-24">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-20 text-white">
            <div className="w-48 h-48 rounded-3xl overflow-hidden glass border-accent-purple/30 p-2 shrink-0 animate-float">
              <img 
                src={profile?.profile_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"} 
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            
            <div>
              <header className="mb-6">
                <h1 className="text-4xl md:text-8xl font-black mb-2 tracking-tighter uppercase line-clamp-1">
                  I AM <span className="text-gradient">{profile?.name || 'MAIMOON'}</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-sm font-light leading-relaxed">
                  {profile?.tagline || 'Ready to build the next generation of autonomous systems.'}
                </p>
              </header>
              
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p>
                  {profile?.bio || 'Specializing in the intersection of large language models and autonomous reasoning, I build systems that don\'t just generate text—they solve problems.'}
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
              </div>

              <div className="bg-bg-deep rounded-2xl p-8 border border-white/5 font-mono text-xs overflow-x-auto my-12 relative group">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent-light animate-pulse" />
                <code className="text-accent-light leading-loose block">
                  # Initialize Agentic Protocol<br/>
                  agent = AgentCore(<br/>
                  &nbsp;&nbsp;architecture=&quot;autonomous&quot;,<br/>
                  &nbsp;&nbsp;capabilities=[&quot;reasoning&quot;, &quot;tool_use&quot;]<br/>
                  )
                </code>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { label: 'Domains', value: profile?.stats_domain_count || '12' },
              { label: 'Projects', value: profile?.stats_project_count || '25+' },
              { label: 'Experience', value: profile?.stats_experience_years || '5y+' },
              { label: 'Efficiency', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="p-8 glass text-center group hover:border-accent-purple/50 transition-all">
                <div className="text-3xl font-black text-gradient mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Expertise Section */}
          <div className="glass p-12 mb-20 relative overflow-hidden text-white">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-purple/10 blur-[80px]" />
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-tighter">System Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                <h3 className="text-accent-light font-bold mb-6 uppercase text-xs tracking-[0.3em]">Architectures</h3>
                <ul className="space-y-4 text-gray-400 font-mono text-sm">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)]" /> ReAct & Plan-and-Execute</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-purple rounded-full" /> Multi-Agent Orchestration</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-purple rounded-full" /> Memory Consolidation Pipelines</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-purple rounded-full" /> Cognitive Load Management</li>
                </ul>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                <h3 className="text-accent-light font-bold mb-6 uppercase text-xs tracking-[0.3em]">Core Stack</h3>
                <ul className="space-y-4 text-gray-400 font-mono text-sm">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-light rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> Next.js 14 & Django REST</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-light rounded-full" /> LangGraph & CrewAI Frameworks</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-light rounded-full" /> Vector DBs (Pinecone, Qdrant)</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-light rounded-full" /> Distributed Pulse Nodes</li>
                </ul>
              </div>
            </div>
          </div>
    </Container>
  );
}
