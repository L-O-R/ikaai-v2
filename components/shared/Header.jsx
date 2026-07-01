import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header>
            <nav className="absolute top-0 w-full z-50 transition-all duration-300 ease-in-out py-5 text-white" id="main-nav">
                <div className="flex justify-between items-center w-full max-w-container-max mx-auto relative z-10">
                    <Link className="flex items-center  justify-start gap-2" href="/">
                        <Image className="h-14 md:h-16 object-contain w-max" alt='Ikaai India Logo' data-alt="IKAAI India Logo" src="/logo.png" width={500} height={500} />
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="nav-link font-label-caps text-label-caps uppercase text-white hover:text-white/80 transition-colors border-b-2 border-transparent hover:border-white/60 pb-1"
                            href="#">About</Link>
                        <Link className="nav-link font-label-caps text-label-caps uppercase text-white hover:text-white/80 transition-colors border-b-2 border-transparent hover:border-white/60 pb-1"
                            href="#">Programs</Link>
                        <Link className="nav-link font-label-caps text-label-caps uppercase text-white hover:text-white/80 transition-colors border-b-2 border-transparent hover:border-white/60 pb-1"
                            href="#">Impact</Link>
                        <Link className="nav-link font-label-caps text-label-caps uppercase text-white hover:text-white/80 transition-colors border-b-2 border-transparent hover:border-white/60 pb-1"
                            href="#">Stories</Link>
                        <Link className="nav-link font-label-caps text-label-caps uppercase text-white hover:text-white/80 transition-colors border-b-2 border-transparent hover:border-white/60 pb-1"
                            href="#">Partners</Link>
                    </div>
                    <div className="hidden md:block">
                        <Link className="inline-flex items-center justify-center px-6 py-3 bg-primary-container text-white font-label-caps text-label-caps rounded-xl hover:bg-opacity-90 transition-opacity"
                            href="#">Connect</Link>
                    </div>
                    <button className="md:hidden text-white">
                        <span className="material-symbols-outlined" data-icon="menu">menu</span>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header