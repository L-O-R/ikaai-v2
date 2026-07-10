import Link from "next/link";

const NavItemLink = ({ item, className, onNavigate }) => {
    const isExternal = item.external || /^https?:\/\//.test(item.href)
    return (
        <Link
            href={item.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={className}
            onClick={() => {
                if (onNavigate) onNavigate();
            }}
        >
            {item.label}
        </Link>
    )
}

export default NavItemLink