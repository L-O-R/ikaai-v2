
import TeamGrid from '@/components/team/TeamGrid'
import TeamHero from '@/components/team/TeamHero'
import React from 'react'

export const metadata = {
    title: 'Our Team | IKAAI India',
    description: 'Meet the passionate team behind IKAAI India — researchers, development practitioners, and changemakers.',
}

const TeamPage = () => {
    return (
        <main className="bg-surface">
            <TeamHero />
            <TeamGrid />
        </main>
    )
}

export default TeamPage