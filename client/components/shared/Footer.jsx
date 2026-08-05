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
                        <div className="flex items-center gap-5 text-slate-600">
                            <Link
                                href="https://www.linkedin.com/company/ikaai-india/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-slate-950 transition-all hover:scale-110"
                                aria-label="LinkedIn Profile"
                            >
                                <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://x.com/ikaai_official?s=11"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-slate-950 transition-all hover:scale-110"
                                aria-label="X Profile"
                            >
                                <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://www.instagram.com/ikaaiindia.official/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-slate-950 transition-all hover:scale-110"
                                aria-label="Instagram Profile"
                            >
                                <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 02H" />
                                </svg>
                            </Link>

                            <Link
                                href="https://www.youtube.com/@ikaaiindia.official"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-slate-950 transition-all hover:scale-110"
                                aria-label="YouTube Channel"
                            >
                                <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
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

            <div className="bg-slate-950 py-6 text-slate-400">
                <div className=" px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p className="font-sans text-body-sm tracking-wide text-slate-400">
                        &copy; {new Date().getFullYear()} IKAAI India. All rights reserved.
                    </p>
                    <p className="font-sans text-body-sm tracking-wide text-slate-400">
                        Designed & Developed by Dhivardhana Solutions.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;