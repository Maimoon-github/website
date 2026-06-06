Based on your existing App Router structure and the portfolio + blogging requirements, here is a comprehensive component architecture plan. The search engine had difficulty retrieving Next.js-specific architecture guides, but this analysis is grounded in established Next.js App Router patterns, React component design principles, and modern portfolio/blog site conventions.

---

## Architecture Philosophy

With Next.js App Router, the default strategy is **Server Components First** — keep components as Server Components unless they require client-side interactivity (state, effects, browser APIs). This plan respects that boundary while organizing components by **feature** and **reusability**.

---

## 1. Global / Layout Components (`components/layout/`)

These wrap every page or provide persistent UI chrome. They are **Shared / Reusable**.

| Component       | Type             | Purpose                                              | Notes                                                                   |
| --------------- | ---------------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| `Navbar`        | Client Component | Primary navigation with mobile hamburger menu        | Needs `useState` for mobile toggle; uses `usePathname` for active links |
| `Footer`        | Server Component | Site footer with links, copyright, social icons      | Static; can be server-rendered                                          |
| `Container`     | Server Component | Max-width wrapper with responsive padding            | Reusable layout primitive                                               |
| `PageHeader`    | Server Component | Reusable page title + subtitle / breadcrumb block    | Accepts `title`, `subtitle`, `className` props                          |
| `MainLayout`    | Server Component | Composes Navbar + Footer + Container around children | Used in `app/layout.tsx`                                                |
| `MobileMenu`    | Client Component | Slide-out / overlay menu for mobile nav              | Triggered by `Navbar`                                                   |
| `ThemeProvider` | Client Component | Dark/light mode context wrapper                      | Wraps app in `layout.tsx`                                               |
| `SkipLink`      | Server Component | Accessibility skip-to-content link                   | WCAG requirement                                                        |

**Recommendation for `layout/`:**  
Keep only **global chrome** here. Move page-specific headers into their respective feature folders.

---

## 2. UI Primitive Components (`components/ui/`)

These are **Shared / Reusable** across the entire site. Think of this as your internal design system or shadcn/ui layer.

| Component      | Type             | Purpose                                                 |
| -------------- | ---------------- | ------------------------------------------------------- |
| `Button`       | Client Component | All buttons (variants: primary, secondary, ghost, icon) |
| `Card`         | Server Component | Content container with image, title, description slots  |
| `Badge`        | Server Component | Tags, categories, status indicators                     |
| `Input`        | Client Component | Form text inputs with label, error state                |
| `Textarea`     | Client Component | Multi-line text input                                   |
| `Label`        | Server Component | Form label primitive                                    |
| `Avatar`       | Server Component | Profile image with fallback initials                    |
| `Separator`    | Server Component | Visual divider line                                     |
| `Skeleton`     | Server Component | Loading placeholder for async content                   |
| `Tooltip`      | Client Component | Hover info bubbles                                      |
| `Dialog`       | Client Component | Modal overlays (image lightbox, confirmations)          |
| `DropdownMenu` | Client Component | Select menus, action menus                              |
| `ScrollArea`   | Client Component | Custom scrollable regions                               |
| `CodeBlock`    | Client Component | Syntax-highlighted code (for blog/knowledge)            |
| `Typography`   | Server Component | H1–H6, Paragraph, Blockquote, Lead text variants        |

**Recommendation:**  
If you are using **shadcn/ui**, many of these already exist in `components/ui/`. Ensure your custom UI components follow the same composition pattern (Radix UI primitives + Tailwind) for consistency.

---

## 3. Shared / Reusable Components (`components/shared/`)

These are **domain-specific but cross-page** components — more complex than UI primitives but used in multiple sections.

| Component          | Type             | Purpose                                                   | Used By                                              |
| ------------------ | ---------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| `ContentCard`      | Server Component | Generic card for blog posts, projects, knowledge articles | Blog list, Projects list, Knowledge list             |
| `ContentGrid`      | Server Component | Responsive grid layout for lists of `ContentCard`         | Blog, Projects, Knowledge index pages                |
| `TagList`          | Server Component | Horizontal list of clickable category tags                | Blog posts, Project detail, Knowledge detail         |
| `MarkdownRenderer` | Server Component | Converts MDX/markdown to JSX with custom components       | Blog `[slug]`, Knowledge `[slug]`, Projects `[slug]` |
| `ReadingTime`      | Server Component | Displays estimated reading time                           | Blog `[slug]`, Knowledge `[slug]`                    |
| `PublishedDate`    | Server Component | Formatted date display with icon                          | Blog, Projects, Knowledge                            |
| `TableOfContents`  | Client Component | Sticky sidebar TOC from heading extraction                | Blog `[slug]`, Knowledge `[slug]`                    |
| `SocialShare`      | Client Component | Share buttons (Twitter/X, LinkedIn, copy link)            | Blog `[slug]`, Knowledge `[slug]`, Projects `[slug]` |
| `Breadcrumb`       | Server Component | Navigation breadcrumb trail                               | All `[slug]` pages                                   |
| `SearchBar`        | Client Component | Site-wide or section-specific search                      | Blog, Knowledge, Projects index pages                |
| `Pagination`       | Client Component | Page number navigation for lists                          | Blog, Projects, Knowledge index pages                |
| `EmptyState`       | Server Component | "No results" / "Coming soon" illustration block           | Any list page                                        |
| `LoadingSpinner`   | Client Component | Async operation feedback                                  | Forms, search                                        |
| `ImageGallery`     | Client Component | Clickable image grid with lightbox                        | Projects `[slug]`, Blog `[slug]`                     |
| `ExternalLink`     | Server Component | Link with external icon indicator                         | Any page with outbound links                         |
| `SEOHead`          | Server Component | Metadata wrapper (or use Next.js Metadata API)            | All pages                                            |

**Key Insight:**  
`ContentCard`, `ContentGrid`, and `MarkdownRenderer` are the **highest-value shared abstractions** for a portfolio + blog because Blog, Projects, and Knowledge all follow the same "content item → list → detail" pattern.

---

## 4. Page-Specific Components

### Home Page (`components/home/` — Page-Specific)

| Component          | Type             | Purpose                                                        |
| ------------------ | ---------------- | -------------------------------------------------------------- |
| `HeroSection`      | Server Component | Landing hero with intro, CTA, background effect                |
| `FeaturedProjects` | Server Component | Curated project showcase grid (uses `ContentCard` from shared) |
| `LatestPosts`      | Server Component | Recent blog posts preview (uses `ContentCard` from shared)     |
| `TechStack`        | Server Component | Skills/technologies display (icons + labels)                   |
| `AboutSnippet`     | Server Component | Short bio with "Read more" link to `/about`                    |
| `SocialLinks`      | Client Component | Animated social icon bar                                       |
| `ScrollIndicator`  | Client Component | Animated "scroll down" cue                                     |

**Note:** `FeaturedProjects` and `LatestPosts` should import and configure `ContentCard` / `ContentGrid` from `shared/`, not duplicate card logic.

---

### About Page (`components/about/` — Page-Specific)

| Component            | Type             | Purpose                           |
| -------------------- | ---------------- | --------------------------------- |
| `AboutHero`          | Server Component | Large bio header with avatar      |
| `BioSection`         | Server Component | Detailed biography paragraphs     |
| `ExperienceTimeline` | Server Component | Work history vertical timeline    |
| `SkillsGrid`         | Server Component | Categorized skill badges          |
| `EducationSection`   | Server Component | Education/certifications list     |
| `Testimonials`       | Client Component | Carousel of recommendation quotes |

---

### Blog Section (`components/blog/` — Mixed)

**Index Page (`/blog`) Components:**

| Component    | Type             | Classification | Purpose                                  |
| ------------ | ---------------- | -------------- | ---------------------------------------- |
| `BlogList`   | Server Component | Page-Specific  | Fetches and renders paginated blog posts |
| `BlogFilter` | Client Component | Page-Specific  | Category/tag filter controls             |
| `BlogSearch` | Client Component | Page-Specific  | Debounced search input for blog posts    |

**Detail Page (`/blog/[slug]`) Components:**

| Component        | Type             | Classification | Purpose                                      |
| ---------------- | ---------------- | -------------- | -------------------------------------------- |
| `BlogPost`       | Server Component | Page-Specific  | Main article layout, uses `MarkdownRenderer` |
| `BlogHeader`     | Server Component | Page-Specific  | Title, author, date, reading time, tags      |
| `RelatedPosts`   | Server Component | Page-Specific  | "More articles" sidebar/footer               |
| `PostNavigation` | Server Component | Page-Specific  | Previous / next post links                   |
| `GiscusComments` | Client Component | Page-Specific  | GitHub Discussions comment embed             |

**Reusable Blog Primitives:**  
If `BlogHeader` and `BlogPost` share patterns with Knowledge/Projects detail pages, extract them to `shared/ContentHeader` and `shared/ContentBody`.

---

### Projects Section (`components/projects/` — Mixed)

**Index Page (`/projects`) Components:**

| Component       | Type             | Classification | Purpose                              |
| --------------- | ---------------- | -------------- | ------------------------------------ |
| `ProjectList`   | Server Component | Page-Specific  | Grid of project cards                |
| `ProjectFilter` | Client Component | Page-Specific  | Filter by tech stack, category, year |

**Detail Page (`/projects/[slug]`) Components:**

| Component        | Type             | Classification | Purpose                                                |
| ---------------- | ---------------- | -------------- | ------------------------------------------------------ |
| `ProjectHero`    | Server Component | Page-Specific  | Title, description, live/demo links, tech stack        |
| `ProjectGallery` | Client Component | Page-Specific  | Screenshots carousel (uses `ImageGallery` from shared) |
| `ProjectDetails` | Server Component | Page-Specific  | Challenge, solution, outcome sections                  |
| `ProjectLinks`   | Server Component | Page-Specific  | GitHub, live demo, case study buttons                  |

---

### Knowledge Section (`components/knowledge/` — Mixed)

**Index Page (`/knowledge`) Components:**

| Component       | Type             | Classification | Purpose                     |
| --------------- | ---------------- | -------------- | --------------------------- |
| `KnowledgeList` | Server Component | Page-Specific  | Grid/list of notes/articles |
| `KnowledgeTree` | Client Component | Page-Specific  | Collapsible topic hierarchy |

**Detail Page (`/knowledge/[slug]`) Components:**

| Component          | Type             | Classification | Purpose                                      |
| ------------------ | ---------------- | -------------- | -------------------------------------------- |
| `KnowledgeArticle` | Server Component | Page-Specific  | Article body (uses `MarkdownRenderer`)       |
| `KnowledgeHeader`  | Server Component | Page-Specific  | Title, category, last updated                |
| `LinkedReferences` | Server Component | Page-Specific  | Bidirectional links to other knowledge notes |

---

### Contact Page (`components/contact/` — Page-Specific)

| Component     | Type             | Purpose                                     |
| ------------- | ---------------- | ------------------------------------------- |
| `ContactForm` | Client Component | Form with validation (name, email, message) |
| `ContactInfo` | Server Component | Email, social links, location               |
| `FormStatus`  | Client Component | Success / error message display             |

---

## 5. Recommended Component Directory Structure

```
components/
├── ui/                    # Primitive design system (buttons, inputs, cards)
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── label.tsx
│   ├── avatar.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── tooltip.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── code-block.tsx
│   └── typography.tsx
│
├── layout/                # Global shell components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── container.tsx
│   ├── page-header.tsx
│   ├── mobile-menu.tsx
│   ├── theme-provider.tsx
│   └── skip-link.tsx
│
├── shared/                # Cross-page domain components
│   ├── content-card.tsx
│   ├── content-grid.tsx
│   ├── tag-list.tsx
│   ├── markdown-renderer.tsx
│   ├── reading-time.tsx
│   ├── published-date.tsx
│   ├── table-of-contents.tsx
│   ├── social-share.tsx
│   ├── breadcrumb.tsx
│   ├── search-bar.tsx
│   ├── pagination.tsx
│   ├── empty-state.tsx
│   ├── loading-spinner.tsx
│   ├── image-gallery.tsx
│   ├── external-link.tsx
│   └── seo-head.tsx
│
├── home/                  # Page-specific: /
│   ├── hero-section.tsx
│   ├── featured-projects.tsx
│   ├── latest-posts.tsx
│   ├── tech-stack.tsx
│   ├── about-snippet.tsx
│   ├── social-links.tsx
│   └── scroll-indicator.tsx
│
├── about/                 # Page-specific: /about
│   ├── about-hero.tsx
│   ├── bio-section.tsx
│   ├── experience-timeline.tsx
│   ├── skills-grid.tsx
│   ├── education-section.tsx
│   └── testimonials.tsx
│
├── blog/                  # Page-specific: /blog & /blog/[slug]
│   ├── blog-list.tsx
│   ├── blog-filter.tsx
│   ├── blog-search.tsx
│   ├── blog-post.tsx
│   ├── blog-header.tsx
│   ├── related-posts.tsx
│   ├── post-navigation.tsx
│   └── giscus-comments.tsx
│
├── projects/              # Page-specific: /projects & /projects/[slug]
│   ├── project-list.tsx
│   ├── project-filter.tsx
│   ├── project-hero.tsx
│   ├── project-gallery.tsx
│   ├── project-details.tsx
│   └── project-links.tsx
│
├── knowledge/             # Page-specific: /knowledge & /knowledge/[slug]
│   ├── knowledge-list.tsx
│   ├── knowledge-tree.tsx
│   ├── knowledge-article.tsx
│   ├── knowledge-header.tsx
│   └── linked-references.tsx
│
└── contact/               # Page-specific: /contact
    ├── contact-form.tsx
    ├── contact-info.tsx
    └── form-status.tsx
```

---

## 6. Server vs. Client Component Strategy

| Layer        | Default | Exceptions (use `'use client'`)                                                                                                               |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/`        | Server  | `Button` (if loading state), `Input`, `Textarea`, `Tooltip`, `Dialog`, `DropdownMenu`, `CodeBlock` (if copy-to-clipboard), `ScrollArea`       |
| `layout/`    | Server  | `Navbar` (mobile toggle, path tracking), `MobileMenu` (animation), `ThemeProvider`                                                            |
| `shared/`    | Server  | `TableOfContents` (scroll spy), `SocialShare` (clipboard API), `SearchBar` (input state), `Pagination` (URL state), `ImageGallery` (lightbox) |
| `home/`      | Server  | `SocialLinks` (if animated), `ScrollIndicator`                                                                                                |
| `blog/`      | Server  | `BlogFilter`, `BlogSearch`, `GiscusComments`                                                                                                  |
| `projects/`  | Server  | `ProjectFilter`, `ProjectGallery`                                                                                                             |
| `knowledge/` | Server  | `KnowledgeTree`                                                                                                                               |
| `contact/`   | Server  | `ContactForm`, `FormStatus`                                                                                                                   |

---

## 7. Key Recommendations

1. **Unify Content Patterns:** Blog, Projects, and Knowledge all use "card → list → detail" flows. Extract `ContentCard`, `ContentGrid`, `ContentHeader`, and `ContentBody` into `shared/` to eliminate duplication.

2. **Use Next.js Metadata API:** Instead of a custom `SEOHead` component, export `metadata` objects from each `page.tsx` and `layout.tsx` for better performance and static optimization.

3. **Co-locate Data Fetching:** Keep data fetching in `page.tsx` Server Components, then pass data down as props to child components. Do not fetch inside Client Components unless absolutely necessary.

4. **MDX Integration:** For blog and knowledge content, use Next.js MDX support (`@next/mdx`) and configure `MarkdownRenderer` in `shared/` as the central MDX component mapping hub.

5. **Avoid Premature Abstraction:** Start with components in `home/`, `blog/`, etc. Only promote to `shared/` when the same component is needed by **three or more** pages.

6. **Keep `ui/` Pure:** UI primitives should know nothing about your domain (no "project" or "blog" logic). They accept props and render markup.

7. **Animation Strategy:** Use `framer-motion` for layout animations, but keep the animation wrapper as a thin Client Component so the heavy content remains server-rendered.

This architecture maximizes server rendering (SEO, performance), minimizes client JavaScript, and keeps the codebase organized by feature while maintaining a clear shared layer for cross-cutting concerns.
