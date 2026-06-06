import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { BlogService } from '@/services/blog.service';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await BlogService.getPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-4">
          <header className="mb-20 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-light mb-6">
              Transmission Log
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">TECHNICAL <span className="text-gradient">LOGS</span></h1>
            <p className="text-xl text-gray-400 max-w-xl">In-depth exploration of Agentic AI Engineering, architecture patterns, and the future of autonomy.</p>
          </header>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                  readingTime="12 min read" // This could be calculated or come from API
                  slug={post.slug}
                  image={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800"}
                  category={post.category_name}
                />
              ))}
            </div>
          ) : (
            <div className="glass p-20 text-center rounded-3xl border-dashed border-white/10">
              <p className="text-gray-500 font-mono uppercase tracking-widest">No transmissions found in current sector.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
