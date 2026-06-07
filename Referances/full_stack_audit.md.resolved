# Antigravity Full-Stack Architecture Audit

This document provides a holistic overview of the current state of the Antigravity website, covering its frontend, backend, and integration layers.

## 1. System Overview
The platform is a decoupled full-stack application built for a high-performance, content-driven portfolio and knowledge hub.
- **Frontend**: Next.js (App Router) with TypeScript and Tailwind CSS.
- **Backend**: Django with Django REST Framework (DRF) and SQLite.
- **Design Philosophy**: "Black Lotus Mystical" – a high-density, premium aesthetic focused on Agentic AI Engineering.

---

## 2. Backend Architecture (`backend/`)

### Core Structure
The backend is modularized into several Django apps located in `app/`, with global configuration in `config/`.

| App | Responsibility |
| :--- | :--- |
| `homepage` | Manages global [PageHeader](file:///home/maimoon-nixos/Antigravity%20code/website/frontend/src/services/core.service.ts#37-44), [PageSection](file:///home/maimoon-nixos/Antigravity%20code/website/frontend/src/services/core.service.ts#26-36), [HeroContent](file:///home/maimoon-nixos/Antigravity%20code/website/backend/app/homepage/models.py#3-20), and [StatCounter](file:///home/maimoon-nixos/Antigravity%20code/website/backend/app/homepage/models.py#21-32). |
| `about` | Profile data, Bio, Skills, and Timeline. |
| `blog` | Post management, Categories, Tags, and Comments. |
| `projects` | Portfolio projects, Tech Stacks, and Galleries. |
| `knowledge` | Agentic AI Knowledge Hub articles and domains. |
| `contact` | Inquiry handling and social links. |

### Configuration (`config/`)
- **[settings.py](file:///home/maimoon-nixos/Antigravity%20code/website/backend/config/settings.py)**: Configured with `corsheaders` for cross-origin access and DRF for API serialization. Uses `django-filters` for advanced searching.
- **[urls.py](file:///home/maimoon-nixos/Antigravity%20code/website/backend/config/urls.py)**: Central dispatcher. All feature APIs are prefixed with `api/` (e.g., `api/blog/`, `api/projects/`).

### Data Pattern
Most apps follow a standard DRF pattern:
1. **Models**: Define the domain entity (e.g., [Post](file:///home/maimoon-nixos/Antigravity%20code/website/frontend/src/services/blog.service.ts#6-22), `Project`, `Article`).
2. **Serializers**: Map models to JSON, often including related fields (e.g., `CategorySerializer`).
3. **Views**: `ReadOnlyModelViewSet` is commonly used for GET-heavy content, with custom `@action` decorators for POST operations (e.g., submitting comments).

---

## 3. Frontend Architecture (`frontend/src/`)

### Component Hierarchy (`components/`)
Components are strictly categorized to manage scale:
- **`ui/`**: Low-level primitives (shadcn/ui inspired).
- **`layout/`**: Global shell items like `Navbar`, `Footer`, and `Container`.
- **`shared/`**: Reusable patterns like `EmptyState`, `PageHeader`, and `TagList`.
- **Domain Folders**: Page-specific logic (e.g., `blog/PostGrid.tsx`, `home/HeroSection.tsx`).

### Service Layer (`services/`)
The frontend uses a centralized `ApiClient` (`lib/api.ts`) that wraps the native `fetch` API, enabling Next.js-specific features:
- **`CoreService`**: Fetches shared metadata like page headers and dynamic sections.
- **Domain Services**: (e.g., `BlogService`, `ProjectsService`) provide clean abstractions for fetching domain-specific records.

### Routing & Data Fetching (`app/`)
Next.js **Server Components** are used as the default for all pages (`page.tsx`), enabling:
- Server-side data fetching during request time.
- SEO-friendly HTML delivery.
- Reduced client-side JavaScript.

---

## 4. Integration & Data Flow

### The Fetching Lifecycle
1. **Request**: A user navigates to `/blog`.
2. **Server Execution**: `app/blog/page.tsx` executes on the server.
3. **Service Call**: It triggers `BlogService.getPosts()` and `CoreService.getPageHeader('blog')`.
4. **API Request**: The `ApiClient` executes a GET request to `http://localhost:8000/api/blog/posts/`.
5. **Backend Processing**: Django routes the request to `PostViewSet`, filters data using `django-filters`, and returns a paginated JSON response.
6. **Frontend Rendering**: The Next.js server maps the JSON to the `PostGrid` and `PageHeader` components and streams the final HTML to the browser.

### Key Integration Points
- **Dynamic Headers**: Every page fetches its badge, title, and description from the backend's `PageHeader` model via `CoreService`.
- **Image Handling**: Frontend utilizes Next.js `<Image />` component, fetching source URLs from Django's `Media` storage.

---

## 5. Summary of Current State
The project is in a highly structured, production-ready state. The clear separation between dynamic page metadata (Headers/Sections) and domain content (Posts/Projects) allows for high flexibility. The use of TypeScript interfaces shared between the service and component layers ensures type safety across the stack.
