export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/api/",
                    "/_next/",
                ],
            },

            {
                userAgent: "GPTBot",
                allow: "/",
            },

            {
                userAgent: "Google-Extended",
                allow: "/",
            },

            {
                userAgent: "ClaudeBot",
                allow: "/",
            },

            {
                userAgent: "CCBot",
                allow: "/",
            },
        ],

        sitemap: "https://ikaaiindia.in/sitemap.xml",

        host: "https://ikaaiindia.in",
    };
}