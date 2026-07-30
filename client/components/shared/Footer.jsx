import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-inverse-surface text-inverse-on-surface">
            <div className="max-w-container-max mx-auto  py-12 md:py-16">
                {/* Main 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 ">
                    {/* Left Column – Brand & Description */}
                    <div className="md:col-span-3 ">
                        <h2 className="font-headline-lg text-headline-lg text-inverse-on-surface">
                            Ikaai India
                        </h2>
                        <p className="mb-8 font-label-caps text-body-lg font-semibold uppercase tracking-widest text-inverse-on-surface mt-1">
                            Research and Consultancy
                        </p>
                        <p className="font-body-md text-body-md text-inverse-on-surface/70 max-w-md mt-4 leading-relaxed">
                            Empowering communities through rigorous research, sustainable
                            livelihoods, and community-driven development initiatives across
                            India.
                        </p>
                    </div>

                    {/* Right Column – Explore + Resources + Address */}
                    <div className="flex flex-col md:col-span-2  w-full">
                        {/* Explore & Resources grid */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-inverse-on-surface/40 mb-4">
                                    Explore
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link
                                            href="/about"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/services"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Our Programs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/work"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Impact & Reach
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/stories"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Success Stories
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-inverse-on-surface/40 mb-4">
                                    Resources
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link
                                            href="/media"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Annual Reports
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/media"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Research Papers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/careers"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Careers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/faq"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            FAQs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="font-body-md text-body-md text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Address block – below the links */}
                        <div className="mt-8 pt-6 border-t border-inverse-on-surface/10 space-y-2 text-inverse-on-surface/60">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-base mt-0.5">location_on</span>
                                <span className="font-body-md text-body-md">
                                    B-11/10 Ground Floor, Sector 18 Rohini,<br />
                                    New Delhi 110089, INDIA
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-base">phone</span>
                                <span className="font-body-md text-body-md">8448491823</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-base">mail</span>
                                <span className="font-body-md text-body-md">info@ikaaiindia.in</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar – small and gray */}
                <div className="border-t border-inverse-on-surface/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-inverse-on-surface/40 text-xs">
                    <p className="font-body-md text-body-sm">
                        &copy; 2023 IKAAI India. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span
                            className="font-label-caps text-body-sm uppercase tracking-widest text-inverse-on-surface/20 cursor-not-allowed select-none"
                        >
                            Privacy Policy
                        </span>
                        <span
                            className="font-label-caps text-body-sm uppercase tracking-widest text-inverse-on-surface/20 cursor-not-allowed select-none"
                        >
                            Terms of Service
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
