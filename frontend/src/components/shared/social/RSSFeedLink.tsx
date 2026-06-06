import { Rss } from "lucide-react"
import Link from "next/link"

export default function RSSFeedLink() {
  return (
    <Link
      href="/rss.xml"
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent-light transition-colors"
      target="_blank"
    >
      <Rss className="w-4 h-4" />
      <span>RSS Feed</span>
    </Link>
  )
}
