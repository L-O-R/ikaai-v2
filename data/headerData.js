export const navLinks = [
    {
        label: 'About',
        type: 'dropdown',
        items: [
            { label: 'About Us', href: '/about' },
            { label: 'Meet Our Team', href: '/about/team' },
            { label: 'Life at IKAAI', href: '/about/life' },
            { label: 'Join Us', href: '/careers' },
        ],
    },
    { label: 'Media', href: '/media', type: 'link' },
    { label: 'Services', href: '/services', type: 'link' },
    { label: 'Our Work', href: '/work', type: 'link' },
    {
        label: 'Contact',
        type: 'dropdown',
        items: [
            { label: 'Want a Survey', href: 'https://forms.google.com/your-survey', external: true },
            { label: 'Get in Touch', href: '/contact' },
        ],
    },
]