import Image from "next/image";
import SubHeading from "../shared/SubHeading";

export default function ImpactMoment() {
    return (
        <section>
            <div className="relative overflow-hidden">
                {/* Image */}
                <div className="relative min-h-screen py-20 flex items-center">
                    <Image
                        src="/hero/market_research.png"
                        alt="Building Stronger Communities Through Knowledge."
                        fill
                        priority={false}
                        className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />

                    {/* Content */}
                    <div className="container-size relative z-10 flex h-full items-end">
                        <div className="max-w-4xl">
                            <p className="mb-stack-md font-sans text-label-caps uppercase tracking-[0.2em] text-primary-fixed">
                                BEYOND DATA
                            </p>

                            <SubHeading
                                text="Every business decision begins with insight"
                                className="flex flex-col text-white!"
                            />

                            <p className="mt-stack-lg max-w-xl font-sans text-body-lg text-surface/90 space-y-2 flex flex-col">
                                <span>Behind every customer is a need.</span>
                                <span>Behind every market is an opportunity.</span>
                                <span>Behind every successful brand is reliable research.</span>
                            </p>
                            <p className="mt-stack-lg text-body-lg font-sans text-surface max-w-xl leading-normal ">
                                We uncover the insights behind consumer behaviour, market trends, and business performance to help organizations innovate, compete, and grow with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}