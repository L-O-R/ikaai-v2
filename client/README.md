# IKAAI India Client

Next.js frontend for the IKAAI India public website. The client reads public CMS content from the Django backend and submits contact inquiries through the public API.

## Stack

- Next.js App Router
- React client components for dynamic homepage sections
- Tailwind CSS for design tokens and responsive styling
- Axios for public CMS API calls

## Environment

Create `client/.env.local` before running the app:

```env
NEXT_PUBLIC_API_ORIGIN=http://127.0.0.1:8000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
```

Use the production backend origin and `/api` base URL when deploying.

## Local Setup

From the `client` directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The backend should be running at the origin configured in `.env.local`.

## Backend Dependency

The frontend expects the Django server to expose these public routes:

- `GET /api/statistics/`
- `GET /api/clients/`
- `GET /api/projects/`
- `GET /api/projects/{slug}/`
- `POST /api/inquiries/`

Run the Django app separately and make sure `NEXT_PUBLIC_API_ORIGIN` points to that server.

## API Integration

All Axios configuration lives in `data/apiClient.js`. It sets the base URL, JSON headers, timeout, and shared error handling.

Each backend call has its own file:

- `api/getStatistics.js` -> `GET /api/statistics/`
- `api/getClients.js` -> `GET /api/clients/`
- `api/getFeaturedProjects.js` -> `GET /api/projects/?featured=true&page_size=4`
- `api/getProjects.js` -> `GET /api/projects/`
- `api/getProjectDetail.js` -> `GET /api/projects/{slug}/`
- `api/getProjectLocations.js` -> `GET /api/projects/?page_size=48&ordering=location`
- `api/createInquiry.js` -> `POST /api/inquiries/`

Media URLs from Django are normalized in `data/apiMedia.js`, so relative paths like `/media/...` resolve against `NEXT_PUBLIC_API_ORIGIN`.

## Dynamic Sections

- `components/ui/ImpactUs.jsx` loads organization statistics.
- `components/contact/ContactForm.jsx` posts inquiry form data and displays API validation errors.
- `components/home/Projects.jsx` loads up to 4 featured projects.
- `components/home/Presense.jsx` derives map locations from published projects.
- `app/work/page.jsx` loads all projects with backend pagination and search.
- `components/ui/ProjectCard.jsx` fetches project detail on hover to show project stats.
- `components/home/Client.jsx` loads active clients from `/api/clients/`. More than 6 clients use the 3-column marquee; 6 or fewer render as a centered grid.

## Client Logo Section

The homepage client section is fully API-driven:

1. `components/home/Client.jsx` calls `getClients()` on mount.
2. `api/getClients.js` requests `/api/clients/`.
3. Each logo path is normalized through `resolveMediaUrl()`.
4. Clients without a usable logo are filtered out before rendering.
5. Loading, error, empty, marquee, and static-grid states are handled in the component.

Expected API response:

```json
[
  {
    "name": "Example Client",
    "logo": "/media/clients/logos/example.png",
    "website": "https://example.org",
    "description": "Optional public description."
  }
]
```

The rendered logo object uses:

- `src` for the resolved logo URL
- `alt` for the client name
- `logo`, `website`, and `description` for future UI extensions

## Error Handling

Shared API errors are normalized in `data/apiClient.js`. UI components should use `getErrorMessage()` from `data/apiErrors.js` so users see friendly fallback messages when the backend is unavailable or validation fails.

## Theme

Brand colors, spacing, typography, radius, and animation tokens are defined in `tailwind.config.js`. Components should use Tailwind classes from that config instead of hard-coded color values.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run format
```
