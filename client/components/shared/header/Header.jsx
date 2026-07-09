"use client";

import { navLinks } from '@/data/headerData';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import Dropdown from './DropDown';
import MobileAccordion from './MobileAccordian';
import { pageConfig } from './appconfig';




const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const [mobileOpenAccordion, setMobileOpenAccordion] = useState(null)
    const pathname = usePathname()
    const navRef = useRef(null);

    const headerTheme =
        pageConfig[pathname]?.header ?? "light";

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
        console.log('toggleDropdown called with index:', index, 'current openDropdown:', openDropdown);
        setOpenDropdown(openDropdown === index ? null : index)
        console.log(true)
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
    console.log('openDropdown in Header:', openDropdown);

    return (
        <header>
            <nav className={`absolute top-0 left-0 w-full max-w-full z-50 transition-all duration-300 ease-in-out py-5 ${headerTheme === 'dark' ? 'text-on-surface' : 'text-white'} overflow-x-clip`} id="main-nav">
                <div className="flex justify-between items-center w-full max-w-container-max mx-auto relative z-10 px-4 md:px-8">
                    {/* Logo */}
                    <Link className="flex items-center justify-start gap-2 shrink-0" href="/" onClick={closeMobileMenu}>
                        <Image
                            className="h-10 w-auto md:h-14 lg:h-16 object-contain"
                            alt="IKAAI India Logo"
                            src="/logo.png"
                            width={500}
                            height={500}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation — switches on at lg, not md, so it never gets cramped on tablets */}
                    <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-wrap justify-end " ref={navRef}>
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
                                        headerTheme={headerTheme}
                                        isActive={isDropdownActive}
                                    />
                                )
                            }
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`nav-link font-label-caps text-label-caps uppercase border-b-2 ${isActive
                                        ? (headerTheme === 'dark' ? 'text-primary border-primary' : 'text-white border-white')
                                        : (headerTheme === 'dark' ? 'text-on-surface hover:text-on-surface/80 border-transparent hover:border-on-surface/60' : 'text-white hover:text-white/80 border-transparent hover:border-white/60')
                                        } transition-colors whitespace-nowrap`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Toggle (visible button) — now shows below lg to match the nav breakpoint */}
                    <button
                        type="button"
                        className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center focus:outline-none group rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 shrink-0"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className="relative w-6 h-5">
                            <span
                                className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] origin-center ${isMobileMenuOpen ? 'top-2 rotate-45 w-6' : 'top-0 rotate-0'
                                    }`}
                            />
                            <span
                                className={`absolute left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/80 rounded-full transition-all duration-400 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-x-0 w-0' : 'opacity-100 scale-x-100 top-2'
                                    }`}
                            />
                            <span
                                className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] origin-center ${isMobileMenuOpen ? 'top-2 -rotate-45 w-6' : 'top-4 rotate-0'
                                    }`}
                            />
                        </div>
                    </button>
                </div>


                <div
                    className={`fixed inset-0 z-40 overflow-hidden transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    <div
                        className={`absolute inset-0 bg-surface/95 backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="relative flex flex-col h-full px-6 pt-20 pb-8 overflow-y-auto">
                            {/* Close button inside overlay */}
                            <button
                                type="button"
                                className="absolute top-4 right-4 lg:hidden z-50 w-12 h-12 flex items-center justify-center focus:outline-none group rounded-full bg-surface-container-low hover:bg-surface-container transition-all duration-300 border border-border-neutral"
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
                                            className={`block py-4 font-display-lg text-2xl transition-colors border-b border-border-neutral last:border-0 ${isActive ? 'text-primary font-medium' : 'text-on-surface hover:text-primary'
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

export default Header
