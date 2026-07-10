'use client'

import React, { useState } from 'react'
import { createJobApplication } from '@/lib/api/createJobApplication'
import { getErrorMessage, getFieldError } from '@/lib/api/apiErrors'

const initialState = {
    name: '',
    email: '',
    phone: '',
    current_company: '',
    years_of_experience: '',
    portfolio_url: '',
    resume_drive_link: '',
    cover_letter: '',
}

const JobApplicationForm = ({ jobSlug }) => {
    const [formData, setFormData] = useState(initialState)
    const [status, setStatus] = useState('idle')
    const [message, setMessage] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const handleChange = (event) => {
        // Prevent typing if form is already successfully submitted
        if (status === 'success') return

        const { name, value } = event.target
        setFormData((current) => ({ ...current, [name]: value }))
        setFormErrors((current) => ({ ...current, [name]: undefined }))
        setMessage('')
    }

    const validateForm = () => {
        const errors = {}

        // Strict Phone Validation (Matches international or local 10-12 digit formats)
        const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10,12}$/
        if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
            errors.phone = 'Please enter a valid 10 to 12-digit phone number.'
        }

        // Strict Google Drive Structural Validation
        const driveRegex = /drive\.google\.com\/(file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+))/
        if (!driveRegex.test(formData.resume_drive_link)) {
            errors.resume_drive_link = 'Please provide a valid document path matching a drive.google.com share link.'
        }

        return errors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // Block submission if already submitting or if already successful
        if (status === 'submitting' || status === 'success') return

        const localErrors = validateForm()
        if (Object.keys(localErrors).length > 0) {
            setFormErrors(localErrors)
            setStatus('error')
            setMessage('Please fix validation issues highlighted below.')
            return
        }

        const now = Date.now()
        const lastSubmitKey = `ikaai_jobapp_last_submit_${jobSlug}`
        const lastSubmitAt = typeof window !== 'undefined' ? Number(sessionStorage.getItem(lastSubmitKey) || 0) : 0
        if (now - lastSubmitAt < 15000) {
            setStatus('error')
            setMessage('Please wait a few seconds before submitting again.')
            return
        }

        sessionStorage.setItem(lastSubmitKey, String(now))
        setStatus('submitting')
        setMessage('')
        setFormErrors({})

        try {
            await createJobApplication({
                job: jobSlug,
                ...formData,
            })

            setStatus('success')
            setMessage('Application submitted successfully! Our team will review your details.')
            setFormData(initialState) // Clears fields so personal data isn't left hanging

        } catch (error) {
            const data = error?.data || {}
            setStatus('error')
            setFormErrors(data)

            const resumeErr = Array.isArray(data?.resume_drive_link) ? data.resume_drive_link[0] : undefined
            const jobErr = typeof data?.detail === 'string' ? data.detail : undefined
            const emailErr = Array.isArray(data?.email) ? data.email[0] : undefined

            setMessage(
                resumeErr || jobErr || emailErr || getErrorMessage(error, 'Unable to submit your application right now.')
            )
        }
    }

    // Dynamic state helpers for cleaner JSX
    const isSubmitting = status === 'submitting'
    const isSuccess = status === 'success'
    const isDisabled = isSubmitting || isSuccess

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border-neutral bg-surface p-6">
            {message ? (
                <div className={`rounded-xl border px-4 py-3 text-sm transition-all ${status === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-primary/20 bg-primary/10 text-primary'}`}>
                    {message}
                </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-text-secondary">
                    <span className="mb-2 block font-medium text-on-surface">Name</span>
                    <input name="name" value={formData.name} onChange={handleChange} disabled={isDisabled} required className="w-full rounded-xl border border-border-neutral bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted" />
                    {getFieldError(formErrors, 'name') ? <p className="mt-1 text-xs text-red-600 font-medium">{getFieldError(formErrors, 'name')}</p> : null}
                </label>
                <label className="block text-sm text-text-secondary">
                    <span className="mb-2 block font-medium text-on-surface">Email</span>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isDisabled} required className="w-full rounded-xl border border-border-neutral bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted" />
                    {getFieldError(formErrors, 'email') ? <p className="mt-1 text-xs text-red-600 font-medium">{getFieldError(formErrors, 'email')}</p> : null}
                </label>
                <label className="block text-sm text-text-secondary">
                    <span className="mb-2 block font-medium text-on-surface">Phone</span>
                    <input type="tel" name="phone" placeholder="e.g. +919876543210" value={formData.phone} onChange={handleChange} disabled={isDisabled} required className={`w-full rounded-xl border bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted ${formErrors.phone ? 'border-red-500' : 'border-border-neutral'}`} />
                    {formErrors.phone ? <p className="mt-1 text-xs text-red-600 font-medium">{formErrors.phone}</p> : null}
                </label>
                <label className="block text-sm text-text-secondary">
                    <span className="mb-2 block font-medium text-on-surface">Current Company</span>
                    <input name="current_company" value={formData.current_company} onChange={handleChange} disabled={isDisabled} className="w-full rounded-xl border border-border-neutral bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted" />
                </label>
                <label className="block text-sm text-text-secondary">
                    <span className="mb-2 block font-medium text-on-surface">Years of Experience</span>
                    <input name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} disabled={isDisabled} className="w-full rounded-xl border border-border-neutral bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted" />
                </label>
                <label className="block text-sm text-text-secondary">
                    <span className="mb-2 block font-medium text-on-surface">Portfolio URL</span>
                    <input type="url" name="portfolio_url" value={formData.portfolio_url} onChange={handleChange} disabled={isDisabled} className="w-full rounded-xl border border-border-neutral bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted" />
                    {getFieldError(formErrors, 'portfolio_url') ? <p className="mt-1 text-xs text-red-600 font-medium">{getFieldError(formErrors, 'portfolio_url')}</p> : null}
                </label>
            </div>

            <label className="block text-sm text-text-secondary">
                <span className="mb-2 block font-medium text-on-surface">Google Drive Resume Link</span>
                <input type="url" name="resume_drive_link" placeholder="https://drive.google.com/file/d/..." value={formData.resume_drive_link} onChange={handleChange} disabled={isDisabled} required className={`w-full rounded-xl border bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted ${formErrors.resume_drive_link ? 'border-red-500' : 'border-border-neutral'}`} />
                {!isSuccess && (
                    <span className="mt-1 block text-xs text-text-muted italic">⚠️ Make sure Link Sharing settings are set to "Anyone with the link can view".</span>
                )}
                {formErrors.resume_drive_link ? <p className="mt-1 text-xs text-red-600 font-medium">{formErrors.resume_drive_link}</p> : null}
            </label>

            <label className="block text-sm text-text-secondary">
                <span className="mb-2 block font-medium text-on-surface">Cover Letter</span>
                <textarea name="cover_letter" value={formData.cover_letter} onChange={handleChange} disabled={isDisabled} rows="4" className="w-full rounded-xl border border-border-neutral bg-white px-3 py-2 disabled:bg-neutral-100 disabled:text-text-muted" />
                {getFieldError(formErrors, 'cover_letter') ? <p className="mt-1 text-xs text-red-600 font-medium">{getFieldError(formErrors, 'cover_letter')}</p> : null}
            </label>

            <button
                type="submit"
                disabled={isDisabled}
                className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition ${isSuccess
                        ? 'bg-green-600 cursor-not-allowed opacity-90'
                        : 'bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
            >
                {isSubmitting ? 'Submitting...' : isSuccess ? 'Application Received ✓' : 'Apply Now'}
            </button>
        </form>
    )
}

export default JobApplicationForm