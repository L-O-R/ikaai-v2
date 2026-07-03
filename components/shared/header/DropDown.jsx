import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NavItemLink from "./NavItemLink";

const Dropdown = ({ label, items, isOpen, toggle, close, headerTheme, isActive }) => {
    const pathname = usePathname();
    const dropdownRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                close();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () =>
            document.removeEventListener("click", handleClickOutside);
    }, [close]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggle}
                className={`nav-link font-label-caps text-label-caps uppercase border-b-2 ${
                    isActive 
                        ? (headerTheme === 'dark' ? 'text-primary border-primary' : 'text-white border-white') 
                        : (headerTheme === 'dark' ? 'text-on-surface hover:text-on-surface/80 border-transparent hover:border-on-surface/60' : 'text-white hover:text-white/80 border-transparent hover:border-white/60')
                } transition-colors flex items-center gap-1 focus:outline-none whitespace-nowrap`}
            >
                {label}
                <span
                    className="material-symbols-outlined text-sm transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    expand_more
                </span>
            </button>
            <div
                className={`absolute -left-6 top-full mt-1 w-48 bg-surface rounded-xl shadow-lg border border-border-neutral overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                    }`}
            >
                {items.map((item) => {
                    const isItemActive = pathname === item.href;
                    return (
                        <NavItemLink
                            key={item.label}
                            item={item}
                            className={`block px-4 py-3 font-body-md text-body-md transition-colors ${
                                isItemActive 
                                    ? 'bg-surface-container-low text-primary font-medium' 
                                    : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                            }`}
                            onNavigate={close}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default Dropdown
