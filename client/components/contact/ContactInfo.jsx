"use client";

import Link from "next/link";
import React from "react";

const ContactInfo = () => {
    return (
        <div className="pt-12 border-t border-slate-100 space-y-6 select-none">

            <div className="md:col-span-5 space-y-4">
                <div className="flex gap-2">
                    <Link href="tel:+918448491823">
                        <span className="block font-sans text-body-md text-slate-500 font-medium hover:text-on-surface">
                            +91 8448491823
                        </span>
                    </Link>
                    <span className="inline-block w-0.5 h-6 bg-border-neutral my-auto transform rotate-15"></span>
                    <Link href="tel:011-41046676">
                        <span className="block font-sans text-body-md text-slate-500 font-medium hover:text-on-surface">
                            011-41046676
                        </span>
                    </Link>
                </div>

                <Link
                    href="mailto:info@ikaaiindia.in"
                    className="inline-flex items-center gap-3 group/mail"
                >
                    <span className="font-display text-headline-md font-bold text-slate-950 underline underline-offset-8 decoration-2 decoration-slate-950 transition-colors group-hover/mail:text-slate-700">
                        info@ikaaiindia.in
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default ContactInfo;