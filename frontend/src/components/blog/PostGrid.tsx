import PostCard from './PostCard'

interface PostGridProps {
  posts: any[]
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
          readingTime="12 min read" // Should come from API
          slug={post.slug}
          image={post.featured_image || "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=800"}
          category={post.category_name}
        />
      ))}
    </div>
  )
}
