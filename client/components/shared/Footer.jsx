import React from "react";
import Link from "next/link";
import { navLinks } from "@/lib/data/headerData";

const Footer = () => {
    const mainLinks = navLinks.map((link) => {
        if (link.type === "link") {
            return { label: link.label, href: link.href };
        }
        if (link.label === "About") {
            return { label: "About", href: "/about" };
        }
        if (link.label === "Contact") {
            return { label: "Contact", href: "/contact" };
        }

        return { label: link.label, href: link.items?.[0]?.href || "#" };
    });

    const finalNavigation = [
        { label: "Home", href: "/" },
        ...mainLinks,
        { label: "FAQs", href: "/faq" }
    ];

    return (
        <footer className="bg-white border-t border-slate-100">
            <div className="max-w-container-max mx-auto px-4 md:px-8 py-16 md:py-24">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

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

                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="font-sans text-body-sm uppercase tracking-widest text-slate-400 font-bold mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {finalNavigation.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="font-sans text-body-md text-slate-600 hover:text-slate-950 font-medium transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3 lg:col-span-4">
                        <h4 className="font-sans text-body-sm uppercase tracking-widest text-slate-400 font-bold mb-4">
                            Social
                        </h4>
                        <div className="flex items-center gap-3">
                            <Link
                                href="https://www.linkedin.com/company/ikaai-india/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 lg:w-12 lg:h-12 p-1 rounded-full  flex items-center justify-center text-slate-600 hover:text-primary hover:-translate-y-1 transition-all duration-300"
                                aria-label="LinkedIn Profile"
                            >
                                <svg className="w-full h-full fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://x.com/ikaai_official?s=11"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 lg:w-12 lg:h-12 p-1 rounded-full  flex items-center justify-center text-slate-600 hover:text-primary hover:-translate-y-1 transition-all duration-300"
                                aria-label="X Profile"
                            >
                                <svg className="w-full h-full fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://www.instagram.com/ikaaiindia.official/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 lg:w-12 lg:h-12 p-1 rounded-full  flex items-center justify-center text-slate-600 hover:text-primary hover:-translate-y-1 transition-all duration-300"
                                aria-label="Instagram Profile"
                            >
                                <svg className="w-full h-full fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://www.youtube.com/@ikaaiindia.official"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 lg:w-12 lg:h-12 p-1 rounded-full  flex items-center justify-center text-slate-600 hover:text-primary hover:-translate-y-1 transition-all duration-300"
                                aria-label="YouTube Channel"
                            >
                                <svg className="w-full h-full fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087-1.837-.495-9.21-.495-9.21-.495s-7.373 0-9.21.495c-1.017.272-1.814 1.071-2.086 2.087-.496 1.839-.496 5.679-.496 5.679s0 3.84.496 5.68c.272 1.015 1.069 1.814 2.086 2.086 1.837.495 9.21.495 9.21.495s7.373 0 9.21-.495c1.015-.272 1.813-1.071 2.085-2.086.496-1.84.496-5.68.496-5.68s0-3.84-.496-5.679zm-14.161 9.514v-7.354l6.45 3.677-6.45 3.677z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-20 md:mt-32 flex flex-col items-end w-full">
                    <div className="text-right select-none">
                        <h2 className="font-display leading-none tracking-tighter font-extrabold text-on-surface drop-shadow-xl text-headline-xl">
                            ikaai India
                        </h2>
                        <p className="font-sans text-headline-md text-on-surface/95 ml-1 font-semibold tracking-wide drop-shadow-md text-right">
                            Research and Consultancy
                        </p>
                    </div>
                </div>

            </div>

            <div className="bg-slate-950 px-4 md:px-8 py-6 text-slate-400 flex flex-col md:flex-row justify-between gap-4 items-end">
                <div className="  flex flex-col justify-between gap-2 text-xs">
                    <p className="font-sans text-body-sm tracking-wide text-slate-400">
                        &copy; {new Date().getFullYear()} IKAAI India Research Pvt. Ltd. All rights reserved.
                    </p>
                    <p className="font-sans text-body-sm tracking-wide text-slate-400">
                        Designed & Developed with <span className="text-red-500">&#10084;</span> by Dhivardhana Solutions.
                    </p>
                </div>
                <div>
                    <p>An ISO 9001:2015 Certified Company</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;