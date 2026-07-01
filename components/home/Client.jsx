import React from 'react'
import LogoLoop from '../ui/LogoLoop'

const clients = [
    { src: "/client/up.png", alt: "Client 1", href: "https://client1.com" },
    { src: "/client/cbm.png", alt: "Client 2", href: "https://client2.com" },
    { src: "/client/CMPDIL.png", alt: "Client 3", href: "https://client3.com" },
    { src: "/client/igsss.png", alt: "Client 4", href: "https://client4.com" },
    { src: "/client/DelhiPolice.png", alt: "Client 5", href: "https://client5.com" },
    { src: "/client/leprosy.png", alt: "Client 6", href: "https://client6.com" },
    { src: "/client/Mamta.png", alt: "Client 7", href: "https://client7.com" },
    { src: "/client/National.png", alt: "Client 8", href: "https://client8.com" },
    { src: "/client/NPCL.png", alt: "Client 9", href: "https://client9.com" },
]

const Client = () => {
    return (
        <section className="py-20 bg-surface">
            <div className="max-w-container-max mx-auto px-4 md:px-8 mb-8">
                <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface text-center mb-12">
                    Our Clients
                </h2>
                <div className=" relative overflow-hidden space-y-20">
                    <LogoLoop
                        logos={clients}
                        speed={80}
                        direction="left"
                        logoHeight={120}
                        gap={80}
                        fadeOut
                        fadeOutColor="#fcf9f8"
                        scaleOnHover
                        ariaLabel="Our trusted clients"
                    />
                    <LogoLoop
                        logos={clients}
                        speed={80}
                        direction="right"
                        logoHeight={120}
                        gap={80}
                        fadeOut
                        fadeOutColor="#fcf9f8"
                        scaleOnHover
                        ariaLabel="Our trusted clients"
                    />
                </div>
            </div>
        </section>
    )
}

export default Client