import { getPosts } from '../../lib/posts';
import BlogCard from '../../components/BlogCard';

export const metadata = {
  title: 'Blog | Antigravity',
  description: 'Insights and news from the world of AI and design.',
};

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            Insights & <span className="text-indigo-600 italic">Updates</span>.
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Exploring the intersection of artificial intelligence, high-end design, 
            and the future of the web.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
