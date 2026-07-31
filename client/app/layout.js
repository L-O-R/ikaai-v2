import { Epilogue, Manrope } from "next/font/google";
import "./globals.css";

import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// JSON-LD Entity Schema representing the organization.
// Direct semantic mapping optimized for LLMs, Knowledge Graphs, and Generative Engines.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "IKAAI INDIA",
  "alternateName": "Ikaai India Foundation",
  "url": "https://ikaaiindia.in",
  "logo": "https://ikaaiindia.in/favicon/icon.png",
  "description": "IKAAI INDIA is a research-driven development organization dedicated to impact assessment, social research, policy evaluation, and sustainable transformation across India.",
  "slogan": "Unlocking Insights, Transforming Lives.",
  "knowsAbout": [
    "Social Research",
    "Impact Assessment",
    "Monitoring & Evaluation (M&E)",
    "Baseline, Midline & Endline Studies",
    "Livelihood Studies",
    "Agriculture & Rural Development",
    "CSR Research",
    "Policy Research",
    "Community Development",
    "Capacity Building",
    "Data Collection & Analysis",
    "Sustainable Development",
    "Government & NGO Research Projects"
  ],
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@ikaaiindia.org",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
};

export const metadata = {
  // Canonical Base Domain configuration. Change to your preferred .org or .in production environment.
  metadataBase: new URL("https://ikaaiindia.in"),

  title: {
    default: "Lead with Ikaai",
    template: "%s | IKAAI INDIA",
  },

  description:
    "We unite research, technology and insight from the ground to the boardroom, so you can make informed decisions with confidence.",

  applicationName: "IKAAI INDIA",

  // Keywords remain for generic parsing models, keeping them strictly relevant to prevent keyword-stuffing penalties.
  keywords: [
    "Impact Assessment India",
    "Social Research Organization",
    "Monitoring and Evaluation M&E India",
    "Policy Research NGO",
    "Community Development",
    "Livelihood Studies",
    "CSR Research Partner",
    "Sustainable Development India",
    "Data Collection and Field Analysis"
  ],

  authors: [
    {
      name: "IKAAI INDIA",
      url: "https://ikaaiindia.in",
    },
  ],

  creator: "IKAAI INDIA",
  publisher: "IKAAI INDIA",
  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },

  // Ensures maximum accessibility for search bots and AI web crawlers (GPTBot, ClaudeBot, Google-Extended, etc.)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/favicon/icon.svg",
        type: "image/svg+xml",
      },
    ],

    shortcut: "/favicon/favicon.ico",

    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],

    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ikaaiindia.in",
    siteName: "IKAAI INDIA",
    title: "Lead with Ikaai",
    description:
      "We unite research, technology and insight from the ground to the boardroom, so you can make informed decisions with confidence.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IKAAI INDIA - Unlocking Insights, Transforming Lives",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lead with Ikaai",
    description:
      "We unite research, technology and insight from the ground to the boardroom, so you can make informed decisions with confidence.",
    images: ["/og-image.jpg"],
  },

  // Prevents automated format injection on devices
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },


  category: "Social Research & Consulting",
};

// Kept viewport configuration isolated as required by modern Next.js structures
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00511e",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        {/* Next.js 16 & GEO Compliant JSON-LD Schema Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">

        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}