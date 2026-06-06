export default function SpecSection() {
  return (
    <div className="glass p-8 md:p-10 mb-16 relative overflow-hidden text-white">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-purple/10 blur-[80px]" />
      <h2 className="text-2xl font-bold mb-8 uppercase tracking-tighter">System Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
  )
}
