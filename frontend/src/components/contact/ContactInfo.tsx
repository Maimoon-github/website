import { Mail, MessageSquare } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="animate-in fade-in slide-in-from-left duration-1000">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-light mb-6">
        Communication Node
      </div>
      <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">ESTABLISH <span className="text-gradient">LINK</span></h1>
      <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg">
        Ready to architect the next generation of autonomous systems? Send a transmission to start the collaboration.
      </p>

      <div className="space-y-8 text-white">
        <div className="flex items-center gap-6 group">
          <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-light group-hover:scale-110 group-hover:bg-accent-purple/20 transition-all border border-white/5">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Direct Transmission</div>
            <div className="text-xl font-bold">hello@antigravity.ai</div>
          </div>
        </div>

        <div className="flex items-center gap-6 group">
          <div className="w-16 h-16 rounded-2xl bg-accent-mid/10 flex items-center justify-center text-accent-light group-hover:scale-110 group-hover:bg-accent-mid/20 transition-all border border-white/5">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Secure Channel</div>
            <div className="text-xl font-bold">Signal: @antigravity_core</div>
          </div>
        </div>
      </div>
    </div>
  )
}
