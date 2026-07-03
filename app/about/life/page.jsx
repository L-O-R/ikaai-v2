
import BeliefSection from '@/components/life/BeliefSection'
import LifeCta from '@/components/life/LifeCta'
import LifeCulture from '@/components/life/LifeCulture'
import LifeEvents from '@/components/life/LifeEvents'
import LifeHero from '@/components/life/LifeHero'
import React from 'react'

export const metadata = {
    title: 'Life at IKAAI | IKAAI India',
    description: 'Discover the culture, values, and people that make IKAAI India a great place to work.',
}

const LifePage = () => {


    return (
        <main className="bg-surface">
            <LifeHero />
            <BeliefSection />
            <LifeCulture />
            <LifeEvents />
            <LifeCta />
        </main>
    )
}

export default LifePage