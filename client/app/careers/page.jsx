
import React from 'react'
import {
    CareerHero,
    WhyJoinUs,
    OpenPositions,
    CareerCta
} from '@/components/career'

export const metadata = {
    title: 'Careers',
    description: 'Join IKAAI India in transforming rural communities through research and development. Explore our open positions and make a difference.',
}

const CareersPage = () => {
    return (
        <main className="bg-surface">
            <CareerHero />
            <WhyJoinUs />
            <OpenPositions />
            <CareerCta />
        </main>
    )
}

export default CareersPage