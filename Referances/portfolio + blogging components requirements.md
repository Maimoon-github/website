Based on my analysis of both Excel files—the **Agentic AI Content Architecture** (informing the `knowledge/` domain) and the **Portfolio + Blog Documentation** (informing the portfolio, blog, about, contact, and projects pages)—here is a comprehensive, scalable component architecture for your Next.js App Router frontend.

---

## 1. Executive Summary & Architectural Principles

The current directory structure (`blog/`, `home/`, `knowledge/`, `layout/`, `projects/`, `shared/`, `ui/`) is a solid foundation. The recommended evolution introduces **categorical subfolders** within `shared/` and formalizes a **Server/Client component strategy** critical for Next.js 14+ performance.

**Core Principles:**
- **Server Components by default** — Data fetching, SEO, and static layout happen on the server.
- **Client Components for interactivity** — Forms, animations, filters, and browser APIs are explicitly isolated.
- **Page folders for single-use, `shared/` for multi-use** — Prevents premature abstraction while maximizing reusability.
- **shadcn/ui primitives remain untouched** in `ui/` — The single source of truth for design system primitives.

---

## 2. Proposed Directory Structure

```
src/components/
│
├── ui/                          # shadcn/ui primitives (DO NOT MODIFY STRUCTURE)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   ├── tabs.tsx
│   ├── accordion.tsx
│   ├── tooltip.tsx
│   ├── scroll-area.tsx
│   └── toast.tsx
│
├── layout/                      # Global shell components (used in root layout.tsx)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MobileMenu.tsx           # Client
│   ├── ThemeProvider.tsx        # Client (next-themes wrapper)
│   └── MainLayout.tsx           # Server, composes Navbar + Footer + Container
│
├── shared/                      # Reusable, domain-agnostic components
│   ├── navigation/
│   │   ├── Breadcrumbs.tsx
│   │   ├── Pagination.tsx       # Client
│   │   ├── ScrollToTop.tsx      # Client
│   │   └── TableOfContents.tsx  # Client (scroll spy)
│   │
│   ├── data-display/
│   │   ├── EmptyState.tsx
│   │   ├── DateDisplay.tsx
│   │   ├── ReadingTimeBadge.tsx
│   │   ├── TagList.tsx
│   │   └── SectionHeader.tsx    # Reusable title + subtitle block
│   │
│   ├── forms/
│   │   ├── FormField.tsx        # Wrapper for label + input + error
│   │   ├── SearchBar.tsx        # Client (debounced)
│   │   ├── FilterGroup.tsx      # Client
│   │   └── FilterDropdown.tsx   # Client
│   │
│   ├── content/
│   │   ├── MarkdownRenderer.tsx # Server/Client (react-markdown wrapper)
│   │   ├── CodeBlock.tsx        # Client (react-syntax-highlighter)
│   │   ├── ComparisonTable.tsx  # Shared table layout
│   │   └── RichTextEditor.tsx   # Client (for admin/comments if needed)
│   │
│   ├── feedback/
│   │   ├── LoadingSpinner.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── SkeletonGrid.tsx
│   │   └── ErrorMessage.tsx
│   │
│   ├── seo/
│   │   ├── StructuredData.tsx   # JSON-LD injection
│   │   └── PageMetadata.tsx     # Helper for Open Graph / Twitter cards
│   │
│   └── social/
│       ├── SocialShareButtons.tsx # Client (react-share wrapper)
│       └── RSSFeedLink.tsx
│
├── home/                        # PAGE-SPECIFIC: Landing page only
│   ├── HeroSection.tsx          # Client (Framer Motion entrance)
│   ├── FeaturedProjects.tsx     # Server (fetches preview data)
│   ├── LatestPosts.tsx          # Server (fetches latest blog posts)
│   └── CTASection.tsx
│
├── about/                       # PAGE-SPECIFIC: About page only
│   ├── BioSection.tsx
│   ├── Timeline.tsx             # Client (scroll-triggered animations)
│   ├── SkillsVisualization.tsx  # Client (chart library or CSS animation)
│   └── ResumeDownloadButton.tsx # Client
│
├── projects/                    # PAGE-SPECIFIC: Projects listing & detail
│   ├── ProjectGrid.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectFilters.tsx       # Client (category + tech stack)
│   ├── ProjectSearchBar.tsx     # Client (extends shared SearchBar)
│   ├── ProjectDetail.tsx        # Server (ISR page content)
│   ├── TechStackBadge.tsx
│   └── ProjectGallery.tsx       # Client (image carousel/lightbox)
│
├── blog/                        # PAGE-SPECIFIC: Blog listing & detail
│   ├── PostGrid.tsx
│   ├── PostCard.tsx
│   ├── PostFilters.tsx          # Client (category + tag)
│   ├── PostSearchBar.tsx        # Client
│   ├── PostHeader.tsx           # Server
│   ├── PostContent.tsx          # Server (uses shared MarkdownRenderer)
│   ├── CommentSection.tsx       # Client
│   ├── CommentForm.tsx          # Client
│   ├── CommentCard.tsx
│   ├── CommentList.tsx
│   └── RelatedPosts.tsx         # Server
│
├── knowledge/                   # PAGE-SPECIFIC: Agentic AI Knowledge Hub
│   ├── KnowledgeGrid.tsx
│   ├── KnowledgeCard.tsx        # Displays domain, complexity, reading time
│   ├── DomainExplorer.tsx       # Client (interactive visual map of 12 domains)
│   ├── DomainCard.tsx           # Card for individual Agentic AI domains
│   ├── LearningPathCard.tsx     # Curated learning journey card
│   ├── KnowledgeFilters.tsx     # Client (domain + topic filters)
│   ├── ArticleHeader.tsx        # Server
│   ├── ArticleContent.tsx       # Server (uses shared MarkdownRenderer + diagrams)
│   ├── ArchitectureDiagram.tsx  # Client (SVG/Canvas interactive diagrams)
│   └── GlossaryTerm.tsx         # Inline definition component
│
└── contact/                     # PAGE-SPECIFIC: Contact page only
    ├── ContactForm.tsx          # Client (react-hook-form + zod + reCAPTCHA)
    ├── ContactInfo.tsx
    └── SocialLinks.tsx          # Specific layout for contact page
```

---

## 3. Component Classification Matrix

### A. Shared / Reusable Components (`shared/` & `layout/`)

These components are used across **two or more pages** and should be strictly maintained as generic, composable building blocks.

| Component | Category | Used By | Server/Client | Notes |
|-----------|----------|---------|---------------|-------|
| `Navbar` | Layout | All pages | Client | Needs mobile menu state, theme toggle |
| `Footer` | Layout | All pages | Server | Static links, social icons |
| `MobileMenu` | Layout | All pages | Client | Sheet/drawer for mobile nav |
| `MainLayout` | Layout | All pages | Server | Composes Navbar + Footer around children |
| `Container` | Layout | All pages | Server | Max-width wrapper (can be in `layout/`) |
| `SectionHeader` | Data Display | Home, About, Projects, Blog, Knowledge | Server | Title + subtitle + optional CTA link |
| `PageHeader` | Data Display | Projects, Blog, Knowledge, About | Server | Breadcrumb + title + description |
| `Breadcrumbs` | Navigation | Detail pages (`[slug]`) | Server | Dynamic based on route segments |
| `Pagination` | Navigation | Projects, Blog, Knowledge | Client | Query param sync |
| `ScrollToTop` | Navigation | All pages | Client | IntersectionObserver or scroll listener |
| `TableOfContents` | Navigation | Blog `[slug]`, Knowledge `[slug]` | Client | Extracts H2/H3 from content |
| `SearchBar` | Forms | Projects, Blog, Knowledge | Client | Debounced input, URL query sync |
| `FilterGroup` | Forms | Projects, Blog, Knowledge | Client | Composes multiple FilterDropdowns |
| `FilterDropdown` | Forms | Projects, Blog, Knowledge | Client | Select with URL param persistence |
| `FormField` | Forms | Contact, CommentForm, Admin | Client | Label + Input + Error message pattern |
| `TagList` | Data Display | Projects, Blog, Knowledge | Server | Renders arrays of tags/badges |
| `DateDisplay` | Data Display | Blog, Projects, Knowledge | Server | Formats ISO dates consistently |
| `ReadingTimeBadge` | Data Display | Blog, Knowledge | Server | Calculated from word count |
| `EmptyState` | Feedback | Projects, Blog, Knowledge (search) | Server | Illustration + message when no results |
| `SkeletonCard` | Feedback | All listing pages | Client | Loading placeholder for cards |
| `SkeletonGrid` | Feedback | All listing pages | Client | Grid of SkeletonCards |
| `ErrorMessage` | Feedback | All pages | Client | Reusable error boundary fallback |
| `MarkdownRenderer` | Content | Blog, Knowledge, About | Server/Client | react-markdown wrapper with plugins |
| `CodeBlock` | Content | Blog, Knowledge | Client | Syntax highlighting wrapper |
| `ComparisonTable` | Content | Knowledge, Projects | Server | Styled table for framework/feature comparison |
| `SocialShareButtons` | Social | Blog, Knowledge, Projects | Client | react-share integration |
| `RSSFeedLink` | Social | Blog listing | Server | Static link to `/rss.xml` route |
| `StructuredData` | SEO | All pages | Server | Injects JSON-LD schema |

### B. Page-Specific Components

These components are **tightly coupled to a single page's data structure, layout, or user journey** and should remain in their respective page folders.

#### Home Page (`app/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `HeroSection` | Personal brand value prop with animated entrance | Client |
| `FeaturedProjects` | Curated preview of 3–4 projects with links to `/projects` | Server |
| `LatestPosts` | Curated preview of 3–4 latest blog posts | Server |
| `CTASection` | Call-to-action banner (hire me, subscribe, etc.) | Server |

#### About Page (`app/about/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `BioSection` | Personal bio narrative + photo | Server |
| `Timeline` | Professional/educational history with scroll animations | Client |
| `SkillsVisualization` | Interactive chart or animated skill bars | Client |
| `ResumeDownloadButton` | Triggers PDF download with tracking | Client |

#### Projects Listing (`app/projects/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `ProjectGrid` | Responsive grid layout for project cards | Server |
| `ProjectCard` | Thumbnail, title, excerpt, tech stack, links | Server |
| `ProjectFilters` | Category + tech stack multi-select filters | Client |
| `ProjectSearchBar` | Search-specific to projects (extends shared `SearchBar`) | Client |
| `TechStackBadge` | Custom badge variant for technology names | Server |

#### Project Detail (`app/projects/[slug]/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `ProjectDetail` | Main content wrapper: title, description, gallery, links | Server |
| `ProjectGallery` | Image carousel/screenshot viewer | Client |

#### Blog Listing (`app/blog/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `PostGrid` | Grid layout for blog post cards | Server |
| `PostCard` | Excerpt, author, date, reading time, category/tags | Server |
| `PostFilters` | Category + tag filter specific to blog taxonomy | Client |
| `PostSearchBar` | Blog-specific search (title + content) | Client |

#### Blog Post Detail (`app/blog/[slug]/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `PostHeader` | Title, author bio, publish date, reading time | Server |
| `PostContent` | Article body composition (uses `MarkdownRenderer`) | Server |
| `CommentSection` | Wrapper for comment list + form | Client |
| `CommentList` | Renders threaded or flat comments | Client |
| `CommentCard` | Individual comment display | Client |
| `CommentForm` | Submit new comment (validation, auth state) | Client |
| `RelatedPosts` | "You may also like" section at bottom | Server |

#### Knowledge Listing (`app/knowledge/page.tsx`)
*Derived from the **Agentic AI Content Architecture** Excel (12 domains, learning paths, domain explorer).*
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `KnowledgeGrid` | Grid for knowledge articles / domain entries | Server |
| `KnowledgeCard` | Domain number, title, complexity level, description | Server |
| `DomainExplorer` | Interactive visual map of the 12 Agentic AI domains | Client |
| `DomainCard` | Individual domain card with icon + scope summary | Server |
| `LearningPathCard` | Curated track (e.g., "AI Engineer Path") | Server |
| `KnowledgeFilters` | Filter by domain, skill level, content type | Client |
| `KnowledgeSearchBar` | Full-text search across technical content | Client |

#### Knowledge Detail (`app/knowledge/[slug]/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `ArticleHeader` | Title, domain badge, last updated, reading time | Server |
| `ArticleContent` | Rich technical content with diagrams, tables, code | Server |
| `ArchitectureDiagram` | Interactive/illustrated architecture patterns | Client |
| `GlossaryTerm` | Inline hover/click definition for technical terms | Client |

#### Contact Page (`app/contact/page.tsx`)
| Component | Purpose | Server/Client |
|-----------|---------|---------------|
| `ContactForm` | Name, email, subject, message + validation + reCAPTCHA | Client |
| `ContactInfo` | Email, location, availability status | Server |
| `SocialLinks` | Prominent social media link cards | Server |

---

## 4. Essential shadcn/ui Primitives Required

Based on the Portfolio Excel tech stack and component needs, the following shadcn/ui components are **essential** to install and keep in `components/ui/`:

| UI Primitive | Used For |
|--------------|----------|
| `button` | CTAs, form submissions, navigation actions |
| `card` | Base for ProjectCard, PostCard, KnowledgeCard, DomainCard |
| `input` | Form fields, search inputs |
| `textarea` | Contact form message, comment body |
| `select` | FilterDropdowns, category selectors |
| `badge` | TechStackBadge, tags, domain labels |
| `avatar` | Author photos, commenter avatars |
| `dialog` | Project detail modal (if used), image lightbox |
| `dropdown-menu` | Navbar user menu, filter options |
| `separator` | Visual dividers in content |
| `sheet` | MobileMenu drawer |
| `tabs` | Knowledge article sections, project detail tabs |
| `accordion` | FAQ sections, mobile filters |
| `tooltip` | Icon explanations, glossary hints |
| `scroll-area` | Custom scrollbars for sidebars |
| `skeleton` | Loading states |
| `toast` | Form success/error notifications |

---

## 5. Server vs. Client Component Strategy

With the App Router, this distinction is critical for performance and SEO.

### Server Components (Default)
Keep these as Server Components **unless they need interactivity**:

- **All page entry points** (`page.tsx` files)
- `FeaturedProjects`, `LatestPosts`, `PostGrid`, `ProjectGrid`, `KnowledgeGrid`
- `PostContent`, `ArticleContent` (wrap `MarkdownRenderer` which can be a Client Component if needed, but prefer Server)
- `Navbar` links (static), `Footer`
- `PageHeader`, `SectionHeader`, `Breadcrumbs`
- `RelatedPosts`, `RSSFeedLink`

### Client Components (`"use client"`)
Explicitly mark these:

- **Forms**: `ContactForm`, `CommentForm` (useState, react-hook-form)
- **Inputs with state**: `SearchBar`, `ProjectFilters`, `PostFilters`, `KnowledgeFilters`
- **Animations**: `HeroSection`, `Timeline`, `SkillsVisualization`, `DomainExplorer`
- **Browser APIs**: `ScrollToTop`, `TableOfContents` (scroll spy), `MobileMenu`
- **Third-party wrappers**: `CodeBlock`, `SocialShareButtons`, `RichTextEditor`, `ArchitectureDiagram`
- **Theme**: `ThemeProvider`, `ThemeToggle`

**Pattern:** Compose Client Components inside Server Components. For example, the Blog `[slug]` page is a Server Component that fetches data, then renders `PostHeader` (Server) and `CommentSection` (Client) as children.

---

## 6. Shared Directory Expansion Recommendations

Your existing `shared/` directory should be expanded with **subfolders by category** rather than a flat file list. This prevents `shared/` from becoming an unmaintainable dumping ground as the site scales.

**Recommended `shared/` organization:**
- `shared/layout/` — Structural wrappers used on every page
- `shared/navigation/` — Wayfinding components
- `shared/forms/` — Input primitives and composed form helpers
- `shared/content/` — Anything that renders rich text, markdown, or media
- `shared/data-display/` — Badges, tags, empty states, date formatting
- `shared/feedback/` — Loading and error states
- `shared/seo/` — Metadata and structured data helpers
- `shared/social/` — Sharing and RSS

**Barrel Exports:** Add `index.ts` files to each subfolder for clean imports:
```typescript
// components/shared/navigation/index.ts
export { Breadcrumbs } from './Breadcrumbs';
export { Pagination } from './Pagination';
// etc.
```

---

## 7. Cross-Cutting Concerns & Special Cases

### A. Markdown + Code Rendering
Both **Blog** and **Knowledge** pages require rich text rendering. Use a single `shared/content/MarkdownRenderer.tsx` that:
- Wraps `react-markdown`
- Uses `shared/content/CodeBlock.tsx` for fenced code blocks
- Supports custom components for callouts, comparison tables, and architecture diagrams

### B. Search & Filter Patterns
Projects, Blog, and Knowledge all need search + filter + pagination. Rather than three separate implementations:
- **Base**: `shared/forms/SearchBar.tsx` (generic debounced input)
- **Page-specific wrappers**: `ProjectSearchBar.tsx`, `PostSearchBar.tsx`, `KnowledgeSearchBar.tsx` that configure the placeholder, endpoint, and filter keys.

### C. Card Patterns
`ProjectCard`, `PostCard`, `KnowledgeCard`, and `DomainCard` all share visual DNA. Consider a **private base pattern**:
- `shared/data-display/CardShell.tsx` — Image aspect ratio, hover state, padding (optional)
- Each page-specific card composes `ui/card.tsx` with its own metadata layout.

### D. Admin Dashboard (Future-Proofing)
The Portfolio Excel mentions an Admin Dashboard. While not in your current `app/` tree, if you add `app/admin/` later:
- Create `components/admin/` for `AdminSidebar`, `DataTable`, `AnalyticsChart`
- `DataTable` could eventually be promoted to `shared/data-display/` if used elsewhere

---

## 8. Implementation Best Practices

1. **Naming Convention**
   - PascalCase for components: `ProjectCard.tsx`
   - CamelCase for utilities/hooks: `useDebounce.ts`
   - Co-locate page-specific components: if only `app/blog/page.tsx` uses it, it lives in `components/blog/`

2. **Import Paths**
   Use path aliases in `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/components/ui/*": ["./src/components/ui/*"],
         "@/components/shared/*": ["./src/components/shared/*"],
         "@/components/home/*": ["./src/components/home/*"],
         "@/lib/*": ["./src/lib/*"]
       }
     }
   }
   ```

3. **Data Fetching**
   - Fetch in Server Components (`page.tsx`) and pass data down as props.
   - Use React Query (TanStack) only for Client Components that need caching (comments, search results, filters).

4. **State Management**
   - **Zustand**: Use for global UI state (theme, mobile menu, auth status).
   - **React Query**: Use for server state (blog posts, projects, knowledge articles, comments).
   - **URL State**: Use for filter/search state to enable shareable URLs.

5. **SEO**
   - Every `page.tsx` should use `shared/seo/PageMetadata.tsx` or Next.js `metadata` export.
   - Detail pages (`[slug]`) must generate dynamic Open Graph images and structured data.

---

## 9. Summary: Decision Framework

When adding a new component, ask:

| Question | If Yes | If No |
|----------|--------|-------|
| Is it used on more than one page? | Place in `shared/[category]/` | Place in `components/[page]/` |
| Is it a shadcn primitive? | Place in `ui/` | Do not place in `ui/` |
| Does it use `useState`, `useEffect`, or browser APIs? | Mark as `"use client"` | Keep as Server Component |
| Is it a layout shell (Navbar/Footer)? | Place in `layout/` | Place in `shared/layout/` or page folder |

This architecture ensures your Portfolio + Blogging + Knowledge Hub frontend remains **maintainable at scale**, clearly separates concerns between the portfolio content and the Agentic AI knowledge domain, and leverages Next.js App Router performance patterns effectively.