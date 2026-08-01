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
    { label: 'Projects', href: '/work', type: 'link' },
    { label: 'Media', href: '/media', type: 'link' },
    { label: 'Blog', href: '/stories', type: 'link' },
    {
        label: 'Contact',
        type: 'dropdown',
        items: [
            { label: 'Want a Survey', href: 'https://forms.google.com/your-survey', external: true },
            { label: 'Get in Touch', href: '/contact' },
            { label: 'Join Us', href: '/careers' },
        ],
    },
]