"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "./CodeBlock"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-accent-light prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-accent-light prose-pre:bg-transparent prose-pre:p-0 max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match
            
            if (isInline) {
              return (
                <code className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-xs text-accent-light" {...props}>
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
              />
            )
          },
          h1: ({ children }) => <h1 className="text-4xl md:text-5xl mt-12 mb-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl md:text-3xl mt-10 mb-6 border-b border-white/5 pb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl md:text-2xl mt-8 mb-4">{children}</h3>,
          p: ({ children }) => <p className="text-gray-400 leading-relaxed mb-6 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-6 text-gray-400">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 mb-6 text-gray-400">{children}</ol>,
          li: ({ children }) => <li className="marker:text-accent-purple">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent-purple bg-accent-purple/5 px-6 py-4 rounded-r-2xl my-8 italic text-gray-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-2xl border border-white/5">
              <table className="w-full text-sm text-left">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-400">{children}</thead>,
          th: ({ children }) => <th className="px-6 py-4 font-bold">{children}</th>,
          td: ({ children }) => <td className="px-6 py-4 border-t border-white/5">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
