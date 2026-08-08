# IKAAI India Client

Next.js frontend for the IKAAI India public web application. The client fetches public CMS content from the Django backend and handles inquiry submissions via API.

---

## 🛠️ Stack & Technologies

- **Framework**: Next.js App Router (`/app` directory)
- **UI Components**: React Client & Server Components
- **Styling**: Tailwind CSS with custom design tokens (`tailwind.config.js`)
- **HTTP Client**: Axios with centralized handling (`lib/data/apiClient.js`)
- **Fonts**: `Epilogue` & `Manrope` via `next/font/google`
- **Icons**: Material Symbols Outlined

---

## 📂 Client Architecture & App Routes

The Next.js App Router is structured across all core organizational routes:

| Route Path | Description | Page Component | Metadata / SEO |
| :--- | :--- | :--- | :--- |
| `/` | Homepage with hero, stats, featured projects, clients, commitment, & map presence | [`app/page.js`](file:///e:/ikaai-v2/client/app/page.js) | Root Layout |
| `/about` | Organization mission, vision, journey, and story | [`app/about/page.jsx`](file:///e:/ikaai-v2/client/app/about/page.jsx) | Page Metadata |
| `/about/team` | Team members, researchers, and advisory board | [`app/about/team/page.jsx`](file:///e:/ikaai-v2/client/app/about/team/page.jsx) | Page Metadata |
| `/about/life` | Organizational culture, field values, and life at IKAAI | [`app/about/life/page.jsx`](file:///e:/ikaai-v2/client/app/about/life/page.jsx) | Page Metadata |
| `/services` | Research, monitoring & evaluation (M&E), baseline studies, and capacity building | [`app/services/page.jsx`](file:///e:/ikaai-v2/client/app/services/page.jsx) | Page Metadata |
| `/projects` | Interactive projects portfolio with backend search & pagination | [`app/projects/page.jsx`](file:///e:/ikaai-v2/client/app/projects/page.jsx) | [`app/projects/layout.jsx`](file:///e:/ikaai-v2/client/app/projects/layout.jsx) |
| `/projects/[slug]` | Individual project detail view showcasing statistics and metadata | [`app/projects/[slug]/page.jsx`](file:///e:/ikaai-v2/client/app/projects/[slug]/page.jsx) | Dynamic Metadata |
| `/blog` | Blog articles & impact stories with live search & pagination | [`app/blog/page.jsx`](file:///e:/ikaai-v2/client/app/blog/page.jsx) | [`app/blog/layout.jsx`](file:///e:/ikaai-v2/client/app/blog/layout.jsx) |
| `/blog/[slug]` | Full blog article detail view with related posts & SEO tags | [`app/blog/[slug]/page.jsx`](file:///e:/ikaai-v2/client/app/blog/[slug]/page.jsx) | Dynamic Metadata |
| `/careers` | Career opportunities, perks, culture, and open positions | [`app/careers/page.jsx`](file:///e:/ikaai-v2/client/app/careers/page.jsx) | Page Metadata |
| `/media` | Field photo gallery, visual assets, and media archives | [`app/media/page.jsx`](file:///e:/ikaai-v2/client/app/media/page.jsx) | Page Metadata |
| `/contact` | Inquiry form, contact details, map location, and office info | [`app/contact/page.jsx`](file:///e:/ikaai-v2/client/app/contact/page.jsx) | Page Metadata |
| `/faq` | Frequently Asked Questions directory with category filtering & Schema markup | [`app/faq/page.js`](file:///e:/ikaai-v2/client/app/faq/page.js) | [`app/faq/layout.jsx`](file:///e:/ikaai-v2/client/app/faq/layout.jsx) |

---

## 📱 Web Manifest & PWA Configuration

The web application manifest is defined at [`public/site.webmanifest`](file:///e:/ikaai-v2/client/public/site.webmanifest) and referenced globally in [`app/layout.js`](file:///e:/ikaai-v2/client/app/layout.js):

- **File Path**: `client/public/site.webmanifest`
- **Application Display**: `standalone` mode
- **Theme & Background Color**: `#ffffff` / `#00511e`
- **Favicons & Touch Icons**: Served directly from root `/public` (`/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, `/favicon-48x48.png`, `/apple-touch-icon.png`, `/icon.png`, `/icon.svg`, `/android-chrome-192x192.png`, `/android-chrome-512x512.png`) for seamless Google search bot indexing.

---

## 🌐 Generative Engine Optimization (GEO) & SEO Strategy

IKAAI INDIA implements full GEO and SEO optimizations for search crawlers and AI search agents (ChatGPT, Perplexity, ClaudeBot, Google SGE):

1. **Entity JSON-LD Schema**:
   - Organization level `NGO` schema embedded in `app/layout.js`.
   - `FAQPage` schema embedded in `app/faq/page.js`.
2. **Metadata Architecture**:
   - Clean, simplified titles across pages (`About Us`, `Services`, `Projects`, `Blog`, `Careers`, `Contact Us`, `FAQ`, `Media`, `Our Team`, `Life at IKAAI`) appended with standard `%s | IKAAI INDIA` template.
   - Server-rendered pages export clean static `metadata`.
   - Client-rendered pages use dedicated route layout wrappers (`layout.jsx`) to export server metadata.
3. **Robots & AI Crawling**: Configured with `max-image-preview: "large"`, `max-snippet: -1`, and canonical base URL (`https://ikaaiindia.in`).

---

## ⚙️ Environment Configuration

Create `.env.local` in `client/`:

```env
NEXT_PUBLIC_API_ORIGIN=http://127.0.0.1:8000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## 🚀 Local Development

From `client/`:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build
```

---

## 🔌 Django Backend Integration

The client interfaces with Django REST endpoints (`lib/api/`):
- `GET /api/statistics/` — Organization statistics
- `GET /api/clients/` — Client logos and list
- `GET /api/projects/` — Projects listing with pagination and search
- `GET /api/projects/{slug}/` — Detailed project breakdown and stats
- `GET /api/projects/other/` — Other research projects list
- `GET /api/blogs/` — Published blog posts
- `GET /api/blogs/{slug}/` — Blog post article detail
- `GET /api/updates/` — Public announcements/updates
- `GET /api/jobs/jobs/` — Open career positions
- `GET /api/jobs/jobs/{slug}/` — Job description details
- `POST /api/inquiries/` — Public inquiry submission
- `POST /api/jobs/job-applications/` — Job application submission

