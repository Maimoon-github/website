import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent-purple/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass p-12 rounded-3xl border border-white/10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            READY TO BUILD <span className="text-gradient">AUTONOMOUSLY?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
            Join the collective of engineers architecting the next generation of agentic systems. 
            From cognitive patterns to production deployment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent-purple rounded-xl font-bold flex items-center gap-2 glow glow-hover transition-all"
            >
              Start Collaboration
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/knowledge"
              className="px-8 py-4 glass hover:bg-white/5 rounded-xl font-bold transition-all"
            >
              Explore Domains
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
