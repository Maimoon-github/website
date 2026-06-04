import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPosts } from '../lib/posts';
import { getProjects } from '../lib/projects';
import BlogCard from '../components/BlogCard';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    getPosts(),
    getProjects()
  ]);

  return (
    <main className="flex-grow pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Design <span className="text-indigo-500 italic block md:inline">Beyond</span> Gravity.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            We build premium digital experiences where AI meets artistic perfection. 
            Scaling your ideas with antigravity speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link href="/projects" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20">
              View Work
            </Link>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Recent Projects</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
              A curated selection of our best work across web and AI integrations.
            </p>
          </div>
          <Link href="/projects" className="group font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            View all projects <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Latest Insight</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
                News, updates, and deep dives into our development process.
              </p>
            </div>
            <Link href="/blog" className="group font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              Visit blog <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
