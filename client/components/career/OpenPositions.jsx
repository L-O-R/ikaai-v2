'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { getJobs } from '@/lib/api/getJobs'
import JobApplicationForm from './JobApplicationForm'

const OpenPositions = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [openIndex, setOpenIndex] = useState(null)
    const [selectedJobSlug, setSelectedJobSlug] = useState(null)

    // Debounce search to avoid excessive API calls
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300) // 300ms delay

        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const data = await getJobs({
                    search: debouncedSearch,
                    // department removed – no filter by department
                })
                setJobs(data?.results || [])
                setError('')
            } catch (err) {
                setError(err?.message || 'Unable to load current openings right now.')
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [debouncedSearch]) // only runs when debouncedSearch changes

    // Remove department logic – no need for departments list

    const toggleJob = (index, slug) => {
        setOpenIndex(openIndex === index ? null : index)
        setSelectedJobSlug(slug)
    }

    const handleApplied = () => {
        setOpenIndex(null)
        setSelectedJobSlug(null)
    }

    return (
        <section
            id="open-positions"
            className="py-section-mobile md:py-section-desktop bg-white"
        >
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Open Positions
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        Join Our Team
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                    <p className="font-body-md text-body-md text-text-secondary max-w-2xl mx-auto mt-4">
                        We're looking for passionate individuals who want to make a difference. Explore our current
                        openings and find your place at IKAAI India.
                    </p>
                </div>

                {/* Search Bar – full width, bigger */}
                <div className="mx-auto mb-8 max-w-2xl">
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search roles, departments or locations"
                        className="w-full rounded-full border border-border-neutral bg-surface-container-low px-6 py-4 text-body-lg shadow-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                {/* Loading / Error / Empty */}
                {loading ? (
                    <p className="text-center text-text-secondary">Loading current openings…</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : jobs.length === 0 ? (
                    <p className="text-center text-text-secondary">No open positions match your search right now.</p>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {jobs.map((job, index) => {
                            const isOpen = openIndex === index
                            return (
                                <div
                                    key={job.slug}
                                    className="bg-white rounded-2xl border border-border-neutral shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                                >
                                    {/* Accordion Header */}
                                    <button
                                        onClick={() => toggleJob(index, job.slug)}
                                        className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 focus:outline-none group"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 mt-1">
                                                <span className="font-label-caps text-label-caps uppercase text-text-muted flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                    {job.location}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-text-muted" />
                                                <span className="font-label-caps text-label-caps uppercase text-text-muted flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">work</span>
                                                    {job.employment_type}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-text-muted" />
                                                <span className="font-label-caps text-label-caps uppercase text-primary/70">
                                                    {job.department}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`material-symbols-outlined text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                                expand_more
                                            </span>
                                        </div>
                                    </button>

                                    {/* Accordion Body */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 border-t border-border-neutral">
                                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed mb-4">
                                                {job.description}
                                            </p>

                                            <div className="mb-6 rounded-xl border border-border-neutral bg-surface-container-low p-4">
                                                <p className="font-label-caps text-label-caps uppercase text-on-surface">
                                                    Application details
                                                </p>
                                                <p className="mt-1 font-body-md text-body-md text-text-secondary">
                                                    {job.experience_level ? `Experience: ${job.experience_level}` : 'Experience level available upon review.'}
                                                </p>
                                                {job.application_deadline ? (
                                                    <p className="mt-1 font-body-md text-body-md text-text-secondary">
                                                        Deadline: {job.application_deadline}
                                                    </p>
                                                ) : null}
                                            </div>

                                            <div className="rounded-xl border border-border-neutral bg-surface-container-low p-4 md:p-6">
                                                <div className="mb-4 flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="font-label-caps text-label-caps uppercase text-on-surface">
                                                            Apply for this role
                                                        </p>
                                                        <p className="font-body-md text-body-md text-text-secondary">
                                                            Submit your details and a Google Drive resume link.
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleApplied}
                                                        className="rounded-full border border-border-neutral px-4 py-2 font-label-caps text-label-caps uppercase text-text-secondary transition hover:border-primary hover:text-primary"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                                <JobApplicationForm jobSlug={selectedJobSlug || job.slug} onSubmitted={handleApplied} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                <div className="text-center mt-12">
                    <p className="font-body-md text-body-md text-text-secondary">
                        Don't see a role that fits?{' '}
                        <a href="mailto:careers@ikaai.org" className="text-primary hover:underline font-semibold">
                            Send us your CV
                        </a>{' '}
                        and we'll keep you in mind for future opportunities.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default OpenPositions