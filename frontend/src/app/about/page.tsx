import type { Metadata } from "next";
import { getAboutData } from "../../lib/api";
import SectionHeader from "../../components/shared/SectionHeader";
import GlassCard from "../../components/shared/GlassCard";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Antigravity",
  description: "Learn more about Antigravity, our mission, vision, and team.",
};

export default async function AboutPage() {
  const { section, team } = await getAboutData();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

  return (
    <main className="min-h-screen bg-[var(--void)] py-32 text-[var(--foreground)]">
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">
        <SectionHeader 
          title={section?.title?.split(' ')[0] || "About"}
          accentTitle={section?.title?.split(' ').slice(1).join(' ') || "Us"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <p className="text-xl leading-relaxed text-[var(--muted)] font-medium mb-6 whitespace-pre-wrap">
              {section?.content || "We are Antigravity, a digital agency that builds the future of the web with cutting-edge artificial intelligence, agentic workflows, and uncompromised premium aesthetics."}
            </p>
            
            <div className="flex flex-col gap-8 mt-12">
              {section?.mission_statement && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[var(--accent)]/30 flex items-center justify-center p-2 bg-[var(--surface)]/50 shrink-0">
                    <svg className="w-full h-full text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">Our Mission</h3>
                    <p className="text-[var(--muted)]">{section.mission_statement}</p>
                  </div>
                </div>
              )}
              
              {section?.vision_statement && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[var(--accent)]/30 flex items-center justify-center p-2 bg-[var(--surface)]/50 shrink-0">
                    <svg className="w-full h-full text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">Our Vision</h3>
                    <p className="text-[var(--muted)]">{section.vision_statement}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-[var(--accent)]/10 blur-[60px] rounded-full opacity-50" />
            <div className="relative border-4 border-[var(--surface)] rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-[var(--void)]">
              {section?.featured_image ? (
                <Image 
                  src={section.featured_image.startsWith('http') ? section.featured_image : `${backendUrl}${section.featured_image}`} 
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-[var(--accent)]/40 font-mono text-sm tracking-widest uppercase text-center px-8">
                  [VIRTUAL_CORE_REPRESENTATION_PENDING]
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Team Section */}
        {team.length > 0 && (
          <div className="mt-32">
            <h2 className="text-4xl font-black mb-16 text-center italic">
              ENGINEERING <span className="text-[var(--accent)]">NODE</span> DIRECTORY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <GlassCard key={member.id} className="p-8 group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2 border-[var(--accent)]/20 group-hover:border-[var(--accent)]/60 transition-all relative">
                    {member.photo ? (
                      <Image 
                        src={member.photo.startsWith('http') ? member.photo : `${backendUrl}${member.photo}`} 
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--void)] flex items-center justify-center">
                        <span className="text-[var(--accent)]/20 text-4xl">?</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-1">{member.name}</h3>
                  <p className="text-[var(--accent)] font-mono text-xs tracking-tighter uppercase mb-4">{member.role}</p>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex gap-4">
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    )}
                    {member.twitter_url && (
                      <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
