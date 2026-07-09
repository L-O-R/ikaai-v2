"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/data/apiErrors";
import { getClients } from "@/data/getClients";
import LogoLoop from "../ui/LogoLoop";

const Client = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        getClients()
            .then((data) => {
                if (isMounted) setClients(data.filter((client) => client.src));
            })
            .catch((err) => {
                if (isMounted)
                    setError(getErrorMessage(err, "Unable to load clients."));
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const showMarquee = clients.length > 6;

    return (
        <section className="py-20 md:py-28 bg-surface overflow-hidden">
            <div className="max-w-container-max mx-auto px-4 md:px-8">
                <div className="mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Trusted By
                    </span>
                    <h2 className="font-headline-lg text-[7vw] font-bold tracking-[-0.2rem] text-on-surface">
                        Clients & Partners
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mt-4" />
                    <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mt-4">
                        Governments, NGOs, and development agencies that rely on our
                        research and development expertise to drive evidence-based change.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {[
                            "client-loading-1",
                            "client-loading-2",
                            "client-loading-3",
                            "client-loading-4",
                            "client-loading-5",
                            "client-loading-6",
                        ].map((item) => (
                            <div
                                key={item}
                                className="h-36 rounded-xl border border-border-neutral bg-surface-container-high animate-pulse"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <p className="font-body-md text-body-md text-text-muted">{error}</p>
                ) : clients.length === 0 ? (
                    <p className="font-body-md text-body-md text-text-muted">
                        Client logos will appear here once project clients are published.
                    </p>
                ) : showMarquee ? (
                    <div className="grid grid-cols-3 gap-4 md:gap-8 h-[400px] md:h-[480px]">
                        <div className="overflow-hidden">
                            <LogoLoop
                                logos={clients}
                                direction="up"
                                logoHeight={120}
                                gap={36}
                                speed={8}
                                pauseOnHover
                                className="h-full w-full"
                            />
                        </div>
                        <div className="overflow-hidden">
                            <LogoLoop
                                logos={clients}
                                direction="down"
                                logoHeight={120}
                                gap={36}
                                speed={10}
                                pauseOnHover
                                className="h-full w-full"
                            />
                        </div>
                        <div className="overflow-hidden">
                            <LogoLoop
                                logos={clients}
                                direction="up"
                                logoHeight={120}
                                gap={36}
                                speed={9}
                                pauseOnHover
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 place-items-center">
                        {clients.map((client) => (
                            <div
                                key={client.alt}
                                className="w-full min-h-36 border border-primary/15 p-4 rounded-xl flex items-center justify-center bg-surface-container-low"
                            >
                                <Image
                                    src={client.src}
                                    alt={client.alt}
                                    width={160}
                                    height={96}
                                    unoptimized
                                    className="max-h-24 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Client;
