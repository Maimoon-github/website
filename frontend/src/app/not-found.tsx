import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--void)] text-[var(--foreground)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-center relative z-10 p-10 max-w-lg mx-auto border border-[var(--surface)] bg-[var(--surface)]/10 rounded-2xl backdrop-blur-md">
        <h1 className="text-6xl md:text-8xl font-black font-display text-[var(--accent)] mb-4 drop-shadow-[0_0_20px_rgba(139,101,191,0.5)]">
          404
        </h1>
        <div className="h-px w-20 bg-[var(--accent)]/30 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Signal Lost</h2>
        <p className="text-[var(--muted)] mb-8 font-medium">
          The requested trajectory leads to an unmapped sector of the database. The coordinates you entered do not exist.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-[var(--foreground)] text-[var(--void)] px-8 py-4 rounded-md font-black text-xs tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_20px_rgba(229,222,254,0.2)]"
        >
          RETURN TO HOME
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </Link>
      </div>
    </main>
  );
}
