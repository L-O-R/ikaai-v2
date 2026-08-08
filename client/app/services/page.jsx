
import React from 'react'
import { ServicesHero, ServiceShowcase, ServicesCta } from '@/components/services'

export const metadata = {
    title: 'Services',
    description: 'Research, monitoring, data collection, impact assessment, capacity building, and policy advisory services for development organizations across India.',
}

const ServicesPage = () => {
    return (
        <main className="bg-surface">
            <ServicesHero />
            <ServiceShowcase />
            <ServicesCta />
        </main>
    )
}

export default ServicesPage