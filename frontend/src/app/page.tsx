import Hero from '@/components/home/Hero';
import DomainExplorer from '@/components/home/DomainExplorer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import BlogCard from '@/components/blog/BlogCard';
import { ProjectService } from '@/services/projects.service';
import { BlogService } from '@/services/blog.service';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, posts] = await Promise.all([
    ProjectService.getProjects({ limit: 3, featured: true }),
    BlogService.getPosts({ limit: 2 })
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <DomainExplorer />

        {/* Featured Projects Section */}
        <section className="py-24 bg-bg-deep/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div>
                <div className="text-accent-light font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Production Assets</div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Featured <span className="text-gradient">Projects</span></h2>
              </div>
              <Link href="/projects">
                <Button variant="ghost" className="gap-2 group">
                  Registry Explorer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  slug={project.slug}
                  description={project.short_description}
                  tech_stack={project.tech_stack}
                  image={project.featured_image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"}
                  category={project.category_name}
                  github_url={project.github_url}
                  live_url={project.live_url}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Transmissions Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div>
                <div className="text-accent-light font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Communication Stream</div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Latest <span className="text-gradient">Logs</span></h2>
              </div>
              <Link href="/blog">
                <Button variant="ghost" className="gap-2 group">
                  Transmission Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {posts.slice(0, 2).map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                  readingTime="15 min"
                  slug={post.slug}
                  image={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800"}
                  category={post.category_name}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
