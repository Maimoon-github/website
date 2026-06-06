import PostCard from './PostCard'

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
  featured_image?: string;
  category_name: string;
  reading_time: string;
}

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          date={post.published_at}
          readingTime={post.reading_time || "12 min read"}
          slug={post.slug}
          image={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800"}
          category={post.category_name}
        />
      ))}
    </div>
  )
}
