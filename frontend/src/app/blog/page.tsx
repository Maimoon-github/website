import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "../../lib/posts";
import { BlogPost } from "../../types";

export const metadata: Metadata = {
  title: "Blog | Antigravity",
  description: "Read our latest articles on agentic AI, tech, and premium web development.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[var(--void)] py-32 text-[var(--foreground)] relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black font-display mb-4">
            Intel <span className="text-[var(--accent)] font-light">Logs</span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl font-medium">
            Explore insights into agentic workflows, software architecture, and the convergence of design and artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts.length > 0 ? (
            posts.map((post: BlogPost) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block focus:outline-none">
                <article className="border border-[var(--surface)] bg-[var(--surface)]/30 rounded-2xl overflow-hidden hover:border-[var(--accent)]/40 transition-all duration-300 h-full flex flex-col">
                  {/* Optional image placeholder */}
                  {post.featured_image && (
                    <div className="w-full h-48 bg-[#131026] overflow-hidden border-b border-[#1F1A40]">
                      <img 
                        src={post.featured_image.startsWith("http") ? post.featured_image : `http://localhost:8000${post.featured_image}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  {!post.featured_image && (
                    <div className="w-full h-48 bg-[var(--void)] overflow-hidden border-b border-[var(--surface)] flex items-center justify-center">
                       <span className="text-[var(--accent)]/30 font-mono text-xs tracking-widest uppercase">No Image Logged</span>
                    </div>
                  )}
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="text-[#8B65BF] font-mono text-xs uppercase tracking-widest mb-3">
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-[#8B65BF] transition-colors">{post.title}</h2>
                    <p className="text-[#968E9C] line-clamp-3 mb-6">
                      {post.excerpt || post.content?.substring(0, 150) + "..." || "Read the full log to understand the context and specifics..."}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-[var(--accent)] group-hover:text-[var(--foreground)] transition-colors">
                        READ TRANSMISSION
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 py-20 text-center border border-dashed border-[#1F1A40] rounded-2xl">
              <span className="text-[#8B65BF] font-mono text-sm tracking-widest uppercase mb-2 block">No Transmissions Found</span>
              <p className="text-[#968E9C]">The database is currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
