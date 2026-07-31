"use client";

import { navLinks } from '@/lib/data/headerData';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import Dropdown from './DropDown';
import MobileAccordion from './MobileAccordian';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const [mobileOpenAccordion, setMobileOpenAccordion] = useState(null)
    const pathname = usePathname()
    const navRef = useRef(null);

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setMobileOpenAccordion(null)
    }, [pathname])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isMobileMenuOpen])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index)
    }

    const closeDropdown = useCallback(() => setOpenDropdown(null), [])
    const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v)

    const toggleMobileAccordion = (index) => {
        setMobileOpenAccordion(mobileOpenAccordion === index ? null : index)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setMobileOpenAccordion(null)
    }

    return (
        <header>

            <nav className="bg-warm-beige border-b border-border-neutral/50 shadow-xs fixed top-0 left-0 w-full max-w-full z-50 transition-all duration-300 ease-in-out py-4 text-on-surface overflow-x-clip" id="main-nav">
                <div className="flex justify-between items-center w-full max-w-container-max mx-auto relative z-10">

                    {/* Logo */}
                    <Link className="flex items-center justify-start gap-2 shrink-0" href="/" onClick={closeMobileMenu}>
                        <Image
                            className="h-10 w-auto md:h-12 lg:h-14 object-contain"
                            alt="IKAAI India Logo"
                            src="/logo.png"
                            width={500}
                            height={500}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-wrap justify-end" ref={navRef}>
                        {navLinks.map((link, index) => {
                            if (link.type === 'dropdown') {
                                const isDropdownActive = link.items?.some(item => pathname === item.href);
                                return (
                                    <Dropdown
                                        key={link.label}
                                        label={link.label}
                                        items={link.items}
                                        isOpen={openDropdown === index}
                                        toggle={() => toggleDropdown(index)}
                                        close={closeDropdown}
                                        headerTheme="dark" // Forces the dropdown to adapt to a light/neutral header style
                                        isActive={isDropdownActive}
                                    />
                                )
                            }
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`nav-link font-sans text-label-caps uppercase border-b-2 py-1 ${isActive
                                        ? 'text-primary border-primary'
                                        : 'text-on-surface hover:text-primary border-transparent hover:border-primary/50'
                                        } transition-colors whitespace-nowrap`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        type="button"
                        className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center focus:outline-none group rounded-full bg-primary/10 border border-primary/15 hover:bg-primary/20 transition-all duration-300 shrink-0"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className="relative w-6 h-5">
                            <span
                                className={`absolute left-0 w-6 h-0.5 bg-primary rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] origin-center ${isMobileMenuOpen ? 'top-2 rotate-45 w-6' : 'top-0 rotate-0'
                                    }`}
                            />
                            <span
                                className={`absolute left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary/80 rounded-full transition-all duration-400 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 top-2'
                                    }`}
                            />
                            <span
                                className={`absolute left-0 w-6 h-0.5 bg-primary rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] origin-center ${isMobileMenuOpen ? 'top-2 -rotate-45 w-6' : 'top-4 rotate-0'
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Backdrop & Container */}
                <div
                    className={`fixed inset-0 z-40 overflow-hidden transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    <div
                        className={`absolute inset-0 bg-surface/95 backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="relative flex flex-col h-full px-6 pt-24 pb-8 overflow-y-auto">
                            <button
                                type="button"
                                className="absolute top-4 right-4 lg:hidden z-50 w-11 h-11 flex items-center justify-center focus:outline-none group rounded-full bg-surface-container-low hover:bg-surface-container transition-all duration-300 border border-border-neutral"
                                onClick={toggleMobileMenu}
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined text-2xl text-on-surface">close</span>
                            </button>

                            <div className="flex flex-col flex-1 justify-center max-w-sm mx-auto w-full">
                                {navLinks.map((link, index) => {
                                    if (link.type === 'dropdown') {
                                        const isDropdownActive = link.items?.some(item => pathname === item.href);
                                        return (
                                            <MobileAccordion
                                                key={link.label}
                                                label={link.label}
                                                items={link.items}
                                                isOpen={mobileOpenAccordion === index}
                                                toggle={() => toggleMobileAccordion(index)}
                                                onNavigate={closeMobileMenu}
                                                isActive={isDropdownActive}
                                            />
                                        )
                                    }
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className={`block py-4 font-display text-2xl transition-colors border-b border-border-neutral last:border-0 ${isActive ? 'text-primary font-medium' : 'text-on-surface hover:text-primary'
                                                }`}
                                            onClick={closeMobileMenu}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;