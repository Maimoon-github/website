import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BlogService } from '@/services/blog.service';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, MessageSquare, Eye } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post, error } = await BlogService.getPost(params.slug);

  if (error || !post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-light transition-colors mb-12 font-mono text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Transmissions
          </Link>

          <header className="mb-16">
            <Badge variant="glow" className="mb-6">{post.category_name}</Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden glass border-accent-purple/30 p-1">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt={post.author_name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{post.author_name}</div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">Lead Architect</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(post.published_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 15 MIN READ</span>
                <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> {post.view_count} CLICKS</span>
              </div>
            </div>
          </header>

          <div className="relative mb-16 rounded-3xl overflow-hidden glass p-2 border-white/10">
            <img 
              src={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=1000"} 
              alt={post.title}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
             <div className="text-xl text-gray-400 mb-12 italic leading-relaxed font-light border-l-4 border-accent-purple pl-8">
               {post.excerpt}
             </div>
             <div 
               className="text-gray-300 space-y-6 leading-relaxed text-lg"
               dangerouslySetInnerHTML={{ __html: post.content }}
             />
          </div>

          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
               <Button variant="glass" size="sm" className="gap-2">
                 <Share2 className="w-4 h-4" /> Share Link
               </Button>
               <Button variant="glass" size="sm" className="gap-2">
                 <MessageSquare className="w-4 h-4" /> 24 Responses
               </Button>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Tags:</span>
               <div className="flex gap-2">
                 <Badge variant="outline">#AGENTIC</Badge>
                 <Badge variant="outline">#LLM</Badge>
                 <Badge variant="outline">#AUTO</Badge>
               </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
