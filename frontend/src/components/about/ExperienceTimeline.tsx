import { Experience } from "@/services/about.service";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-8 uppercase tracking-tighter text-white">Service Record</h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-accent-purple/30 group">
            <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full bg-accent-purple group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-accent-light transition-colors">{exp.role}</h3>
                <p className="text-accent-purple font-mono text-sm">{exp.company}</p>
              </div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                {exp.start_date} — {exp.end_date || 'Present'}
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed max-w-3xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
