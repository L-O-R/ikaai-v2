import Image from "next/image";
import SubHeading from "../shared/SubHeading";

export default function ImpactMoment() {
    return (
        <section>
            <div className="relative overflow-hidden">
                {/* Image */}
                <div className="relative min-h-screen py-20 flex items-center">
                    <Image
                        src="/hero/village-primary-school-community.jpg"
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
                                Beyond Research
                            </p>

                            <SubHeading
                                text="Every insight begins with people"
                                className="flex flex-col text-white!"
                            />

                            <p className="mt-stack-lg max-w-xl font-sans text-body-lg text-surface/90 space-y-2 flex flex-col">
                                <span>Behind every statistic is a story.</span>
                                <span>Behind every household is a lived reality.</span>
                                <span>Behind every community is the opportunity to create lasting change.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}