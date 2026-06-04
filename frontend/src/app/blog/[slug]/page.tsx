import { getPostBySlug } from '../../../lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Antigravity` };
}

export default async function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16">
          <div className="flex items-center gap-4 text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            <span>Blog</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <time>{new Date(post.published_at).toLocaleDateString()}</time>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-tight">
            {post.title}
          </h1>
          {post.featured_image && (
            <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl">
              <img 
                src={post.featured_image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        <div 
          className="prose prose-xl prose-zinc dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </article>
  );
}
