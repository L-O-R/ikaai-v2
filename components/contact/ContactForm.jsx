// root/components/contact/ContactForm.jsx
'use client'

import React, { useState } from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1500)
    }

    return (
        <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 lg:p-10 border border-border-neutral">
            <h3 className="font-headline-md text-headline-sm text-on-surface mb-6">
                Send Us a Message
            </h3>

            {isSubmitted ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
                    </div>
                    <h4 className="font-headline-md text-xl text-on-surface mb-2">Thank You!</h4>
                    <p className="font-body-md text-body-md text-text-secondary">
                        Your message has been sent. We'll get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 font-label-caps text-label-caps uppercase text-primary hover:text-primary/80 transition-colors"
                    >
                        Send Another Message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border border-border-neutral rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors font-body-md text-body-md text-on-surface placeholder:text-text-muted/50"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border border-border-neutral rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors font-body-md text-body-md text-on-surface placeholder:text-text-muted/50"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-2">
                            Subject
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border border-border-neutral rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors font-body-md text-body-md text-on-surface appearance-none"
                        >
                            <option value="">Select a subject</option>
                            <option value="Research Partnership">Research Partnership</option>
                            <option value="Survey Request">Survey Request</option>
                            <option value="Media Inquiry">Media Inquiry</option>
                            <option value="Career Opportunity">Career Opportunity</option>
                            <option value="General Inquiry">General Inquiry</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border border-border-neutral rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors font-body-md text-body-md text-on-surface placeholder:text-text-muted/50 resize-none"
                            placeholder="Tell us how we can help..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-primary-container transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </form>
            )}
        </div>
    )
}

export default ContactForm