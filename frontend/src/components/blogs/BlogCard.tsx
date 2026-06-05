import Link from 'next/link';
import { BlogPost } from '../../types';
import Image from 'next/image';

export default function BlogCard({ post }: { post: BlogPost }) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

  return (
    <div className="group relative bg-[var(--void)] border border-[var(--surface)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/40 transition-all duration-300">
      {post.featured_image && (
        <div className="aspect-video overflow-hidden relative border-b border-[var(--surface)]">
          <Image 
            src={post.featured_image.startsWith('http') ? post.featured_image : `${backendUrl}${post.featured_image}`} 
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30">
            Blog
          </span>
          <time className="text-xs text-zinc-500 dark:text-zinc-400">
            {new Date(post.published_at).toLocaleDateString()}
          </time>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-6">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
        >
          Read more <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
