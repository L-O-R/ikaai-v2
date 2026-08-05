
'use client'

import React from 'react'
import SubHeading from '../shared/SubHeading'

const ContactMap = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop  bg-warm-beige">
            <div className="container-size">

                <div className="relative w-full overflow-hidden rounded-2xl border border-border-neutral shadow-lg aspect-16/7">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4052023887716!2d77.1349512!3d28.737316600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d010052b9055f%3A0x6441bffeed33b88d!2sIkaai%20India%20Research!5e0!3m2!1sen!2sin!4v1783066898306!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                        title="IKAAI India Location"
                    />

                </div>
            </div>
        </section>
    )
}

export default ContactMap