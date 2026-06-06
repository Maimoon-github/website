import { Metadata } from "next"

interface PageMetadataProps {
  title: string
  description?: string
  image?: string
  noIndex?: boolean
}

export function constructMetadata({
  title,
  description = "Architecting Autonomous Intelligence - Agentic AI Engineering Portfolio",
  image = "/og-image.png",
  noIndex = false,
}: PageMetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | Antigravity`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@maimoon",
    },
    icons: {
      icon: "/favicon.ico",
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
