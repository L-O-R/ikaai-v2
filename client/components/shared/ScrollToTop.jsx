'use client'

import { useState, useEffect, useCallback } from "react"

const SHOW_AFTER_PX = 400

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > SHOW_AFTER_PX)
        }

        // Set initial state (in case the page loads already scrolled)
        handleScroll()

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-inverse-on-surface shadow-[0px_4px_12px_rgba(0,0,0,0.15)] border border-inverse-on-surface/10 transition-all duration-300 ease-in-out hover:bg-on-primary-fixed-variant active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <span className="material-symbols-outlined">arrow_upward</span>
        </button>
    )
}