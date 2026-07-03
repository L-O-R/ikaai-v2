
import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import CtaSection from '@/components/about/CtaSection'
import MissionVision from '@/components/about/MissionVision'
import Timeline from '@/components/about/Timeline'
import React from 'react'

export const metadata = {
    title: 'About IKAAI India | Research & Rural Development',
    description: 'Learn about IKAAI India — our mission, vision, and journey in transforming rural communities through research and evidence-based development.',
}

const AboutPage = () => {
    return (
        <main className="bg-surface">
            <AboutHero />
            <AboutStory />
            <MissionVision />
            <Timeline />
            <CtaSection />
        </main>
    )
}

export default AboutPage