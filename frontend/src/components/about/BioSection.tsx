import Image from "next/image"
import { Download, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Profile } from "@/services/core.service"

interface BioSectionProps {
  profile: Profile | null;
}

export default function BioSection({ profile }: BioSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-20 text-white">
      <div className="w-48 h-48 rounded-3xl overflow-hidden glass border-accent-purple/30 p-2 shrink-0 animate-float relative">
        <Image
          src={profile?.profile_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
          alt="Profile"
          fill
          className="object-cover rounded-2xl p-2"
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
            {profile?.bio || "Specializing in the intersection of large language models and autonomous reasoning, I build systems that don't just generate text—they solve problems."}
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
            # Initialize Agentic Protocol<br />
            agent = AgentCore(<br />
            &nbsp;&nbsp;architecture=&quot;autonomous&quot;,<br />
            &nbsp;&nbsp;capabilities=[&quot;reasoning&quot;, &quot;tool_use&quot;]<br />
            )
          </code>
        </div>
      </div>
    </div>
  )
}
