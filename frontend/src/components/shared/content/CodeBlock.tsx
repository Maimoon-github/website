"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  language?: string
  value: string
  className?: string
}

export default function CodeBlock({ language, value, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group relative my-8 overflow-hidden rounded-2xl border border-white/5 bg-bg-deep/50", className)}>
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
          {language || "text"}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-400 transition-colors hover:text-accent-light"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 custom-scrollbar">
        <SyntaxHighlighter
          language={language || "text"}
          style={atomDark}
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: "1.7",
          }}
          codeTagProps={{
            style: {
              background: "transparent",
              fontFamily: 'inherit',
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
