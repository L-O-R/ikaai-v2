export const navLinks = [
    {
        label: 'About',
        type: 'dropdown',
        items: [
            { label: 'About Us', href: '/about' },
            { label: 'Meet Our Team', href: '/about/team' },
            { label: 'Life at Ikaai', href: '/about/life' },

        ],
    },
    { label: 'Solutions', href: '/services', type: 'link' },
    { label: 'Projects', href: '/projects', type: 'link' },
    { label: 'Media', href: '/media', type: 'link' },
    { label: 'Blog', href: '/blog', type: 'link' },
    {
        label: 'Contact',
        type: 'dropdown',
        items: [
            { label: 'Want a Survey', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdEJU5a7WVLR-SEuPuk3IQPcXWDDTP5J92yW_q2gi2bPmGYgg/viewform?usp=sharing&ouid=100914497929313730290', external: true },
            { label: 'Get in Touch', href: '/contact' },
            { label: 'Join Us', href: '/careers' },
        ],
    },
]