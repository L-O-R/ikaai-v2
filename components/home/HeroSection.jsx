import React from 'react'

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex overflow-hidden pt-32 pb-12 text-on-secondary">
            <video autoPlay className="video-bg" loop muted playsInline>
                <source src="/video/ikaai.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" />
            <div className='max-w-container-max w-full mx-auto z-10 flex flex-col justify-between'>
                <div>
                    <h1
                        className=' text-headline-lg md:text-[8rem]  lg:text-[14rem] capitalize font-semibold font-headline-lg leading-none'>
                        ikaai India
                    </h1>
                    <p className='text-xl lg:-mt-6 ml-1 md:ml-2 lg:ml-4'>Research and Consultancy</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between max-md:gap-4'>
                    <p className='self-end text-xl flex flex-col gap-1 '>
                        <span>Measuring impact</span>
                        <span className='md:ml-10'>across Bharat</span>
                    </p>
                    <ul className='list-none space-y-2 text-xl'>
                        <li>Social & Development Research</li>
                        <li>Data Collection & Analytics</li>
                        <li>Impact Assessment</li>
                        <li>Capacity Building workshops</li>
                        <li>Policy & Advisory consultancy</li>
                    </ul>
                </div>
            </div>

        </section>
    )
}

export default HeroSection