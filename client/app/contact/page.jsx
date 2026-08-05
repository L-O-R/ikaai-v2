import React from "react";
import {
    ContactInfo,
    ContactForm,
    ContactMap,
    ContactCta,
} from "@/components/contact";

import { heroData } from "@/lib/data/heroData";

export const metadata = {
    title: "Contact IKAAI India | Get in Touch",
    description:
        "Reach out to IKAAI India for research partnerships, surveys, or to learn more about our work in rural development.",
};

const ContactPage = () => {
    return (
        <main>
            <section className="bg-background min-h-[45vh] flex items-end">
                <div className="container-size space-y-1 ">
                    <span className="font-sans text-headline-sm uppercase text-text-muted tracking-tight block">
                        {heroData.contact.eyebrow}
                    </span>
                    <h1 className="font-display text-headline-xl2 text-on-background mb-4">
                        {heroData.contact.title}
                        <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-on-surface inline-block ml-2"></span>
                    </h1>
                </div>
            </section>

            <div className="container-size">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-16 md:py-24 items-start">


                    <div className="lg:col-span-5 space-y-6 select-none">

                        <p className="font-sans text-body-lg text-on-surface/90 leading-relaxed">
                            {heroData.contact.description}
                        </p>
                    </div>
                    <div className="lg:col-span-7 space-y-12">
                        <ContactForm />
                        <ContactInfo />
                    </div>


                </div>
            </div>

            <ContactMap />
            <ContactCta />
        </main>
    );
};

export default ContactPage;