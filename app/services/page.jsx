
import React from 'react'
import { ServicesHero, ServiceShowcase } from '@/components/services'

export const metadata = {
    title: 'Our Services | IKAAI India',
    description: 'Research, monitoring, data collection, impact assessment, capacity building, and policy advisory services for development organizations across India.',
}

const ServicesPage = () => {
    return (
        <main className="bg-surface">
            <ServicesHero />
            <ServiceShowcase />
        </main>
    )
}

export default ServicesPage