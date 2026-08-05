import React from 'react';
import PageHero from '../ui/PageHero';
import { heroData } from '@/lib/data/heroData';

const WorkHeader = () => {
    return (
        <PageHero {...heroData.work} />
    );
};

export default WorkHeader;