# IKAAI INDIA (ikaai-v2)

Monorepo containing the **IKAAI INDIA** website frontend and the Django CMS backend.

- **client/**: Next.js frontend (React) that consumes the CMS public JSON APIs.
- **server/**: Django 5 + Django REST Framework backend providing admin (Google OAuth) and public APIs.

---

## High-level architecture

### Backend (server/)
- **Admin & content management**: Django Admin with Google-only OAuth login.
- **Public data access**: JSON APIs under `/api/` for projects, blogs, jobs, etc.
- **Media**: Uploaded assets served from `/media/`.

Public API contracts live in:
- `server/API_DOCUMENTATION.md`
- (also see `server/README.md` for operational/deployment notes)

### Frontend (client/)
- Uses Axios helpers under `client/lib/api/`.
- Renders homepage/careers/services pages from CMS data.
- Handles DRF pagination correctly (typically `{ count, next, previous, results }`).

---

## Getting started

### 1) Backend
See `server/README.md` and `server/API_DOCUMENTATION.md`.

### 2) Frontend
See `client/README.md`.

---

## Project roles

### Django Admin (content authors)
- Manage clients, projects, statistics, updates, blog posts, job openings.
- Public APIs read **only active/published** content.

### Public API consumers (frontend)
- Read endpoints for public pages.
- Write endpoints only for public forms (e.g., inquiries, job applications).

---

## SEO / Meta implementation check (how to verify)

Next.js App Router pages should export a `metadata` object.

### Quick verification checklist
1. **Each route/page has `export const metadata = { title, description, ... }`**
   - Examples: `client/app/*/page.jsx` and `client/app/*/layout.js`
2. **Blog-like routes** (e.g., `app/blogs/[slug]/page.jsx`) should use per-item fields:
   - `title`
   - `description` (or `meta_description`)
   - `openGraph` / `twitter` tags if implemented
3. **Open Graph / Canonical**
   - Ensure canonical URLs are generated consistently (absolute URL).
4. **No accidental redirect to `/login/`**
   - If you ever see `/login/?next=.../api/...` during public page load, it means a request is being treated as an authenticated admin/session route.

> If you want me to fully audit meta/SEO, I need the relevant `client/app/**` pages (or I can scan them if ripgrep/search tooling is available).
