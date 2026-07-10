
import React from 'react'
import {
    ContactHero,
    ContactInfo,
    ContactForm,
    ContactMap,
    ContactCta
} from '@/components/contact'

export const metadata = {
    title: 'Contact IKAAI India | Get in Touch',
    description: 'Reach out to IKAAI India for research partnerships, surveys, or to learn more about our work in rural development.',
}

const ContactPage = () => {
    return (
        <main className="bg-surface">
            <ContactHero />
            <div className="container mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 md:py-16">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
            <ContactMap />
            <ContactCta />
        </main>
    )
}

export default ContactPage