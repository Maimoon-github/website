import Navbar from '@/components/layout/Navbar';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    title: "Mastering the Multi-Agent PRA Loop",
    excerpt: "Why the Perception-Reasoning-Action loop is the foundational blueprint for every autonomous agent in 2026.",
    author: "Maimoon",
    date: "June 05, 2026",
    readingTime: "12 min read",
    slug: "mastering-pra-loop",
    image: "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "MCP: The Future of Tool Discovery",
    excerpt: "How the Model Context Protocol is standardizing how agents interact with the world.",
    author: "Maimoon",
    date: "June 03, 2026",
    readingTime: "8 min read",
    slug: "mcp-tool-discovery",
    image: "https://images.unsplash.com/photo-1518433278981-2268b8f2f45d?auto=format&fit=crop&q=80&w=800",
  }
];

export default function BlogPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">TECHNICAL <span className="text-gradient">LOGS</span></h1>
          <p className="text-xl text-gray-400 max-w-xl">In-depth exploration of Agentic AI Engineering, architecture patterns, and the future of autonomy.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts.map((post) => (
            <article key={post.slug} className="group cursor-pointer">
              <div className="relative h-96 mb-8 rounded-3xl overflow-hidden glass border-white/5">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                   <div className="flex items-center gap-4 text-xs font-mono text-accent-light mb-4 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-accent-light transition-colors">{post.title}</h2>
                  <p className="text-gray-400 leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-bold text-sm">
                    Read Transmission <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
