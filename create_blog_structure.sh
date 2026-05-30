#!/usr/bin/env bash



# Create root directory
mkdir -p my-blog

# ----------------------------------------------------------------------
# app directory
# ----------------------------------------------------------------------
mkdir -p my-blog/app/{about,contact,api}
mkdir -p my-blog/app/\(blog\)/{category,tag,author}
mkdir -p my-blog/app/\(blog\)/\[slug\]

# Files in app root
touch my-blog/app/layout.tsx
touch my-blog/app/globals.css
touch my-blog/app/sitemap.ts

# Files in (blog) group
touch my-blog/app/\(blog\)/layout.tsx
touch my-blog/app/\(blog\)/page.tsx

# Dynamic route files
touch my-blog/app/\(blog\)/\[slug\]/page.tsx
touch my-blog/app/\(blog\)/category/\[category\]/page.tsx
touch my-blog/app/\(blog\)/tag/\[tag\]/page.tsx
touch my-blog/app/\(blog\)/author/\[author\]/page.tsx

# Static pages
touch my-blog/app/about/page.tsx
touch my-blog/app/contact/page.tsx

# API routes
mkdir -p my-blog/app/api/search
mkdir -p my-blog/app/api/newsletter
mkdir -p my-blog/app/api/views/\[slug\]

touch my-blog/app/api/search/route.ts
touch my-blog/app/api/newsletter/route.ts
touch my-blog/app/api/views/\[slug\]/route.ts

# ----------------------------------------------------------------------
# components directory
# ----------------------------------------------------------------------
mkdir -p my-blog/components/blog
mkdir -p my-blog/components/layout
mkdir -p my-blog/components/ui

touch my-blog/components/blog/PostCard.tsx
touch my-blog/components/blog/PostHeader.tsx
touch my-blog/components/blog/TableOfContents.tsx
touch my-blog/components/blog/RelatedPosts.tsx
touch my-blog/components/blog/ShareButtons.tsx

touch my-blog/components/layout/Navbar.tsx
touch my-blog/components/layout/Footer.tsx
touch my-blog/components/layout/Sidebar.tsx

# ui directory intentionally left empty (you can add .gitkeep if needed)
touch my-blog/components/ui/.gitkeep

# ----------------------------------------------------------------------
# content directory
# ----------------------------------------------------------------------
mkdir -p my-blog/content/posts
mkdir -p my-blog/content/authors
mkdir -p my-blog/content/partials

touch my-blog/content/posts/my-first-post.md
touch my-blog/content/posts/learning-nextjs.mdx
touch my-blog/content/authors/john-doe.json
touch my-blog/content/partials/.gitkeep

# ----------------------------------------------------------------------
# lib directory
# ----------------------------------------------------------------------
mkdir -p my-blog/lib
touch my-blog/lib/posts.ts
touch my-blog/lib/markdown.ts
touch my-blog/lib/utils.ts
touch my-blog/lib/constants.ts

# ----------------------------------------------------------------------
# public directory
# ----------------------------------------------------------------------
mkdir -p my-blog/public/images
touch my-blog/public/favicon.ico
touch my-blog/public/robots.txt

# ----------------------------------------------------------------------
# styles directory
# ----------------------------------------------------------------------
mkdir -p my-blog/styles
touch my-blog/styles/blog-post.css

# ----------------------------------------------------------------------
# types directory
# ----------------------------------------------------------------------
mkdir -p my-blog/types
touch my-blog/types/post.ts
touch my-blog/types/author.ts

# ----------------------------------------------------------------------
# Root configuration files
# ----------------------------------------------------------------------
touch my-blog/.env.local
touch my-blog/next.config.js
touch my-blog/package.json
touch my-blog/tsconfig.json

echo "✅ Blog folder structure created successfully in 'my-blog/'"