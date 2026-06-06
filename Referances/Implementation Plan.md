Component Architecture Plan\*\*

**Task:** Based on the analysis of the Excel files (Agentic AI Content Architecture and Portfolio + Blog Documentation), define a clear, scalable, and maintainable component architecture for the Next.js frontend of the Portfolio + Blogging website.

### 1. Executive Summary & Architectural Principles

The existing component directory structure — with folders for `blog/`, `home/`, `knowledge/`, `layout/`, `projects/`, `shared/`, and `ui/` — provides a strong foundation. The proposed architecture builds on this by introducing **categorical subfolders** within `shared/` and establishing a clear **Server vs. Client Component strategy**, which is essential for optimal performance and SEO in Next.js 14+ App Router.

**Core Principles:**

- Use **Server Components by default** for data fetching, SEO, and static rendering.
- Mark components as **Client Components** only when interactivity (state, effects, browser APIs) is required.
- Place **page-specific** components in their respective page folders and **shared/reusable** components in the `shared/` directory.
- Keep `ui/` exclusively for unmodified shadcn/ui primitives.

---

### 2. Proposed Directory Structure

```bash
src/components/
├── ui/                          # shadcn/ui primitives (do not modify internal structure)
├── layout/                      # Global layout components
├── shared/                      # Reusable, domain-agnostic components
│   ├── navigation/
│   ├── data-display/
│   ├── forms/
│   ├── content/
│   ├── feedback/
│   ├── seo/
│   └── social/
├── home/                        # Home page specific
├── about/                       # About page specific
├── projects/                    # Projects pages specific
├── blog/                        # Blog pages specific
├── knowledge/                   # Knowledge hub specific
└── contact/                     # Contact page specific
```

---

### 3. Component Classification

#### A. Shared / Reusable Components (`shared/` + `layout/`)

These components are used across multiple pages and should remain generic and composable.

**Key Shared Components Include:**

- **Layout**: `Navbar`, `Footer`, `MobileMenu`, `MainLayout`, `Container`
- **Navigation**: `Breadcrumbs`, `Pagination`, `ScrollToTop`, `TableOfContents`
- **Data Display**: `SectionHeader`, `PageHeader`, `TagList`, `DateDisplay`, `ReadingTimeBadge`, `EmptyState`
- **Forms**: `SearchBar`, `FilterGroup`, `FilterDropdown`, `FormField`
- **Content**: `MarkdownRenderer`, `CodeBlock`, `ComparisonTable`
- **Feedback**: `LoadingSpinner`, `SkeletonCard`, `SkeletonGrid`, `ErrorMessage`
- **SEO & Social**: `StructuredData`, `SocialShareButtons`, `RSSFeedLink`

#### B. Page-Specific Components

**Home Page (`app/page.tsx`)**

- `HeroSection`, `FeaturedProjects`, `LatestPosts`, `CTASection`

**About Page (`app/about/page.tsx`)**

- `BioSection`, `Timeline`, `SkillsVisualization`, `ResumeDownloadButton`

**Projects**

- **Listing**: `ProjectGrid`, `ProjectCard`, `ProjectFilters`, `ProjectSearchBar`, `TechStackBadge`
- **Detail**: `ProjectDetail`, `ProjectGallery`

**Blog**

- **Listing**: `PostGrid`, `PostCard`, `PostFilters`, `PostSearchBar`
- **Detail**: `PostHeader`, `PostContent`, `CommentSection`, `CommentForm`, `CommentList`, `CommentCard`, `RelatedPosts`

**Knowledge**

- **Listing**: `KnowledgeGrid`, `KnowledgeCard`, `DomainExplorer`, `DomainCard`, `LearningPathCard`, `KnowledgeFilters`
- **Detail**: `ArticleHeader`, `ArticleContent`, `ArchitectureDiagram`, `GlossaryTerm`

**Contact Page (`app/contact/page.tsx`)**

- `ContactForm`, `ContactInfo`, `SocialLinks`

---

### 4. Essential shadcn/ui Primitives

The following primitives should be available in the `ui/` directory:

- `button`, `card`, `input`, `textarea`, `select`, `badge`, `avatar`
- `dialog`, `dropdown-menu`, `separator`, `sheet`, `tabs`, `accordion`
- `tooltip`, `scroll-area`, `skeleton`, `toast`

These cover all major UI needs across cards, forms, navigation, feedback states, and interactive elements.

---

### 5. Server vs. Client Component Strategy

**Server Components (Default)**  
Keep components as Server Components unless they require interactivity. This includes:

- All `page.tsx` files
- Data-heavy components (`FeaturedProjects`, `PostGrid`, `ProjectDetail`, `PostContent`, `ArticleContent`, etc.)
- Static elements (`Footer`, `SectionHeader`, `Breadcrumbs`)

**Client Components (`"use client"`)**
Explicitly mark components that need:

- Forms (`ContactForm`, `CommentForm`)
- State and interactivity (`SearchBar`, filters, `ProjectFilters`)
- Animations (`HeroSection`, `Timeline`, `DomainExplorer`)
- Browser APIs (`ScrollToTop`, `TableOfContents`, `MobileMenu`)
- Third-party libraries (`CodeBlock`, `SocialShareButtons`)

**Best Pattern**: Compose Client Components inside Server Components (e.g., a Server `page.tsx` that fetches data and renders both Server and Client children).

---

### 6. Shared Directory Expansion Recommendations

Expand `shared/` using categorical subfolders to maintain organization as the project grows:

- `shared/navigation/`
- `shared/data-display/`
- `shared/forms/`
- `shared/content/`
- `shared/feedback/`
- `shared/seo/`
- `shared/social/`

Add `index.ts` barrel exports in each subfolder for cleaner imports.

---

### 7. Cross-Cutting Concerns

- **Markdown & Rich Content**: Use a single `shared/content/MarkdownRenderer` for both Blog and Knowledge sections.
- **Search & Filters**: Build on shared `SearchBar` and `Filter*` components, with page-specific wrappers where needed.
- **Card Components**: Consider a base `CardShell` in `shared/` that page-specific cards can extend.
- **Future Admin Features**: Plan a separate `admin/` folder if an admin dashboard is added later.

---

### 8. Implementation Best Practices

1. **Naming**: Use `PascalCase` for components (e.g., `ProjectCard.tsx`) and `camelCase` for hooks/utilities (e.g., `useDebounce.ts`).
2. **Co-location**: Keep page-specific components inside their respective folders (e.g., `components/blog/`).
3. **Path Aliases**: Configure clean imports in `tsconfig.json` (e.g., `@/components/shared/*`).
4. **Data Fetching**: Perform data fetching in Server Components and pass props down.
5. **State Management**: Use Zustand for UI state and React Query for server state where needed.
6. **SEO**: Leverage `metadata` exports and shared SEO components on every page.

---

### 9. Decision Framework for New Components

When creating a new component, ask:

- **Used on multiple pages?** → Place in `shared/[category]/`
- **shadcn/ui primitive?** → Place in `ui/`
- **Requires state, effects, or browser APIs?** → Mark as `"use client"`
- **Layout shell (Navbar/Footer)?** → Place in `layout/`

This architecture ensures the Portfolio + Blogging + Knowledge Hub frontend remains **maintainable at scale**, clearly separates concerns, and fully leverages the performance benefits of the Next.js App Router.
