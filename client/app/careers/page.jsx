
import React from 'react'
import {
    CareerHero,
    WhyJoinUs,
    OpenPositions,
    PerksBenefits,
    CareerCta
} from '@/components/career'

export const metadata = {
    title: 'Careers | IKAAI India',
    description: 'Join IKAAI India in transforming rural communities through research and development. Explore our open positions and make a difference.',
}

const CareersPage = () => {
    return (
        <main className="bg-surface">
            <CareerHero />
            <WhyJoinUs />
            <OpenPositions />
            <PerksBenefits />
            <CareerCta />
        </main>
    )
}

export default CareersPage