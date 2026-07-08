
import React from 'react'
import {
    MediaHero,
    MediaGallery,
    MediaCta
} from '@/components/media'

export const metadata = {
    title: 'Media | IKAAI India',
    description: 'Explore our visual stories — moments from the field, community engagement, and the people behind IKAAI India\'s work in rural development.',
}

const MediaPage = () => {
    return (
        <main className="bg-surface">
            <MediaHero />
            <MediaGallery />
            <MediaCta />
        </main>
    )
}

export default MediaPage