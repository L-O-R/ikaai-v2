import Image from "next/image";

export default function ImpactMoment() {
    return (
        <section>
            <div className="relative overflow-hidden">
                {/* Image */}
                <div className="relative min-h-screen py-20 flex items-center">
                    <Image
                        src="/emotional.png"
                        alt="Mother helping her daughter study in a rural Indian village."
                        fill
                        priority={false}
                        className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full items-end">
                        <div className="max-w-4xl px-10 md:px-16">
                            <p className="mb-stack-md font-label-caps text-label-caps uppercase tracking-[0.2em] text-primary-fixed">
                                Beyond the Data
                            </p>

                            <h2 className="font-display-lg text-headline-md text-on-primary">
                                Real change begins with understanding.
                            </h2>

                            <div className="mt-stack-lg h-[2px] w-24 bg-primary-fixed" />

                            <p className="mt-stack-lg max-w-xl font-body-lg text-body-lg text-surface/90 ">
                                Behind every survey is a conversation.
                                <br />
                                Behind every conversation is a family.
                                <br />
                                Behind every family is a future worth investing in.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}