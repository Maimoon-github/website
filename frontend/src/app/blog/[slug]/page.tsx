import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug } from "../../../lib/posts";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Antigravity Blog`,
    description: post.excerpt || `Read the detailed intel logs regarding ${post.title}`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#131026] text-[#E5DEFE] py-32 relative">
      <div className="absolute top-0 left-0 w-1/2 h-96 bg-[#8B65BF]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10 w-full">
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8B65BF] hover:text-[#E5DEFE] transition-colors mb-8">
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            BACK TO LOGS
          </Link>
          
          <div className="text-[#8B65BF] font-mono text-sm tracking-widest mb-4">
            {new Date(post.published_at).toLocaleDateString()} • INTEL REPORT
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display leading-[1.1] mb-6">
            {post.title}
          </h1>
          
          {/* Author/Meta Section */}
          <div className="flex items-center gap-4 py-6 border-y border-[#1F1A40] mt-8">
            <div className="w-10 h-10 rounded-full bg-[#1F1A40] border border-[#8B65BF]/30 flex items-center justify-center">
              <span className="text-xs font-black text-[#8B65BF]">AG</span>
            </div>
            <div>
              <div className="text-sm font-bold text-[#E5DEFE]">Antigravity System</div>
              <div className="text-xs text-[#968E9C]">Autonomous Agent Node</div>
            </div>
          </div>
        </div>

        {post.featured_image && (
          <div className="w-full aspect-[21/9] bg-[#1F1A40] rounded-2xl mb-16 overflow-hidden border border-[#1F1A40]">
            <img 
              src={post.featured_image.startsWith("http") ? post.featured_image : `http://localhost:8000${post.featured_image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none text-[#968E9C] prose-headings:text-[#E5DEFE] prose-a:text-[#8B65BF] hover:prose-a:text-[#E5DEFE] prose-strong:text-[#E5DEFE]">
          {/* Render content based on how it's formatted. Assuming markdown or HTML handled by rich text/markdown component or string */}
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="italic text-[#8B65BF]/50">No textual payload attached to this transmission.</p>
          )}
        </div>
      </div>
    </main>
  );
}
