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
| `/blog` | Blog articles & impact stories with live search & pagination | [`app/blog/page.jsx`](file:///e:/ikaai-v2/client/app/blog/page.jsx) | [`app/blog/layout.jsx`](file:///e:/ikaai-v2/client/app/blog/layout.jsx) |
| `/careers` | Career opportunities, perks, culture, and open positions | [`app/careers/page.jsx`](file:///e:/ikaai-v2/client/app/careers/page.jsx) | Page Metadata |
| `/media` | Field photo gallery, visual assets, and media archives | [`app/media/page.jsx`](file:///e:/ikaai-v2/client/app/media/page.jsx) | Page Metadata |
| `/contact` | Inquiry form, contact details, map location, and office info | [`app/contact/page.jsx`](file:///e:/ikaai-v2/client/app/contact/page.jsx) | Page Metadata |
| `/faq` | Frequently Asked Questions directory with category filtering & Schema markup | [`app/faq/page.js`](file:///e:/ikaai-v2/client/app/faq/page.js) | [`app/faq/layout.jsx`](file:///e:/ikaai-v2/client/app/faq/layout.jsx) |

---

## 📱 Web Manifest & PWA Configuration

The web application manifest is defined at [`app/site.webmanifest`](file:///e:/ikaai-v2/client/app/site.webmanifest) and referenced globally in [`app/layout.js`](file:///e:/ikaai-v2/client/app/layout.js):

- **File Path**: `client/app/site.webmanifest`
- **Application Display**: `standalone` mode
- **Theme & Background Color**: `#ffffff`
- **Favicons & Touch Icons**: Linked from `/favicon/` (`16x16`, `32x32`, `48x48`, `180x180`)

---

## 🌐 Generative Engine Optimization (GEO) & SEO Strategy

IKAAI INDIA implements full GEO and SEO optimizations for search crawlers and AI search agents (ChatGPT, Perplexity, ClaudeBot, Google SGE):

1. **Entity JSON-LD Schema**:
   - Organization level `NGO` schema embedded in `app/layout.js`.
   - `FAQPage` schema embedded in `app/faq/page.js`.
2. **Metadata Architecture**:
   - Server-rendered pages (`about`, `services`, `careers`, `contact`, `media`, `about/team`, `about/life`) export static `metadata`.
   - Client-rendered pages (`work`, `stories`, `faq`) use dedicated route layout wrappers (`layout.jsx`) to export server metadata.
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
- `GET /api/statistics/`
- `GET /api/clients/`
- `GET /api/projects/`
- `GET /api/projects/{slug}/`
- `GET /api/blogs/`
- `POST /api/inquiries/`
