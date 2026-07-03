import { usePathname } from "next/navigation"
import NavItemLink from "./NavItemLink"

const MobileAccordion = ({ label, items, isOpen, toggle, onNavigate, isActive }) => {
    const pathname = usePathname()
    return (
        <div className="border-b border-border-neutral last:border-0">
            <button
                onClick={toggle}
                className={`w-full flex items-center justify-between py-4 font-display-lg text-2xl transition-colors focus:outline-none ${
                    isActive ? 'text-primary font-medium' : 'text-on-surface hover:text-primary'
                }`}
            >
                {label}
                <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pb-4 space-y-3 pl-4">
                    {items.map((item) => {
                        const isItemActive = pathname === item.href
                        return (
                            <NavItemLink
                                key={item.label}
                                item={item}
                                className={`block font-body-lg text-body-lg transition-colors ${
                                    isItemActive ? 'text-primary font-medium' : 'text-on-surface/70 hover:text-primary'
                                }`}
                                onNavigate={onNavigate}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MobileAccordion