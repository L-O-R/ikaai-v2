// root/components/contact/ContactInfo.jsx
'use client'

import React from 'react'

const contactDetails = [
    {
        icon: 'location_on',
        title: 'Office Address',
        details: ['Ground floor', 'B-11/10, Pocket 11', 'Sector 18, Rohini', 'Delhi, 110089'],
    },
    {
        icon: 'phone',
        title: 'Phone',
        details: ['+91 98765 43210', '+91 98765 43211'],
    },
    {
        icon: 'mail',
        title: 'Email',
        details: ['info@ikaai.org', 'research@ikaai.org'],
    },
    {
        icon: 'schedule',
        title: 'Working Hours',
        details: ['Monday - Friday', '9:00 AM - 6:00 PM IST'],
    },
]

const socialLinks = [
    { icon: 'language', label: 'Website', href: 'https://ikaai.org' },
    { icon: 'mail', label: 'Email', href: 'mailto:info@ikaai.org' },
    { icon: 'share', label: 'Social', href: '#' },
]

const ContactInfo = () => {
    return (
        <div className="space-y-8">
            <div>
                <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                    Contact Information
                </span>
                <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface mb-4">
                    Get in Touch
                </h2>
                <div className="w-16 h-0.5 bg-harvest-gold/60 mb-6" />
                <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                    We're here to help. Whether you're a researcher, partner, or community member — reach out and
                    we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="space-y-6">
                {contactDetails.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0 mt-1">
                            <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                        </div>
                        <div>
                            <h3 className="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-1">
                                {item.title}
                            </h3>
                            {item.details.map((line, i) => (
                                <p key={i} className="font-body-md text-body-md text-on-surface/80">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-border-neutral">
                <h3 className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest mb-4">
                    Connect With Us
                </h3>
                <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-surface-container-low border border-border-neutral flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                            aria-label={link.label}
                        >
                            <span className="material-symbols-outlined text-xl">{link.icon}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContactInfo