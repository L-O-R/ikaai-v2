"use client";

import { createInquiry } from "@/lib/api/createInquiry";
import { getErrorMessage, getFieldError } from "@/lib/api/apiErrors";
import { useState, useRef, useEffect, useId } from "react";

const subjectOptions = [
  "Research Partnership",
  "Survey Request",
  "Media Inquiry",
  "Career Opportunity",
  "General Inquiry",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxId = useId();
  const triggerId = useId();

  // --- Close on outside click ---
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const closeDropdown = (returnFocus = true) => {
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  };

  const selectOption = (option) => {
    setFormData((prev) => ({ ...prev, subject: option }));
    setFormErrors((prev) => ({ ...prev, subject: undefined }));
    setSubmitError("");
    closeDropdown();
  };

  const handleTriggerKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.preventDefault();
        setIsDropdownOpen(true);
        setHighlightedIndex((prev) =>
          prev < 0 ? subjectOptions.indexOf(formData.subject) : prev
        );
        break;
      case "Escape":
        closeDropdown(false);
        break;
      default:
        break;
    }
  };

  // Keyboard nav once the listbox is open
  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, subjectOptions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0) selectOption(subjectOptions[highlightedIndex]);
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "Tab":
        closeDropdown(false);
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject) {
      setFormErrors((prev) => ({ ...prev, subject: "Please select a subject" }));
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setFormErrors({});

    try {
      await createInquiry(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setFormErrors(error.data || {});
      setSubmitError(
        getErrorMessage(error, "Unable to send your message. Please try again.")
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="py-12 text-left space-y-4">
          <h4 className="font-display text-headline-md text-on-surface font-bold">
            Message Sent Successfully
          </h4>
          <p className="font-sans text-body-md text-text-secondary leading-relaxed">
            Thank you for reaching out. We will get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="font-sans text-label-caps uppercase text-primary font-bold hover:underline"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 w-full" noValidate>
          {submitError && (
            <div
              role="alert"
              className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 font-sans text-body-md text-error"
            >
              {submitError}
            </div>
          )}

          {/* Full Name */}
          <div className="w-full">
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!getFieldError(formErrors, "name")}
              aria-describedby={getFieldError(formErrors, "name") ? "name-error" : undefined}
              className="w-full bg-transparent border-b border-border-neutral px-2 py-4 text-on-surface focus:outline-none focus:border-on-background font-sans text-body-lg placeholder:text-text-muted/60"
              placeholder="Your name *"
            />
            {getFieldError(formErrors, "name") && (
              <p id="name-error" className="mt-2 font-sans text-sm text-error">
                {getFieldError(formErrors, "name")}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!getFieldError(formErrors, "email")}
              aria-describedby={getFieldError(formErrors, "email") ? "email-error" : undefined}
              className="w-full bg-transparent border-b border-border-neutral px-2 py-4 text-on-surface focus:outline-none focus:border-on-background font-sans text-body-lg placeholder:text-text-muted/60"
              placeholder="Email *"
            />
            {getFieldError(formErrors, "email") && (
              <p id="email-error" className="mt-2 font-sans text-sm text-error">
                {getFieldError(formErrors, "email")}
              </p>
            )}
          </div>

          {/* Custom Subject Selector */}
          <div className="w-full relative" ref={dropdownRef}>
            <label id={`${triggerId}-label`} className="sr-only">
              Subject
            </label>
            <div
              id={triggerId}
              ref={triggerRef}
              role="combobox"
              tabIndex={0}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-controls={listboxId}
              aria-labelledby={`${triggerId}-label ${triggerId}`}
              aria-required="true"
              aria-invalid={!!getFieldError(formErrors, "subject")}
              aria-describedby={getFieldError(formErrors, "subject") ? "subject-error" : undefined}
              onClick={() => {
                setIsDropdownOpen((prev) => !prev);
                setHighlightedIndex(subjectOptions.indexOf(formData.subject));
              }}
              onKeyDown={handleTriggerKeyDown}
              className="w-full border-b border-border-neutral px-2 py-4 text-on-surface focus:outline-none focus:border-on-background font-sans text-body-lg cursor-pointer flex items-center justify-between select-none"
            >
              <span className={formData.subject ? "text-on-surface font-medium" : "text-text-muted/60"}>
                {formData.subject || "Select a subject *"}
              </span>
              <span
                aria-hidden="true"
                className={`material-symbols-outlined text-text-muted text-2xl font-light transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              >
                expand_more
              </span>
            </div>

            {isDropdownOpen && (
              <ul
                id={listboxId}
                role="listbox"
                aria-labelledby={`${triggerId}-label`}
                tabIndex={-1}
                onKeyDown={handleListKeyDown}
                className="absolute left-0 z-50 w-full mt-1 bg-white border border-border-neutral rounded-xl shadow-lg py-2 select-none max-h-64 overflow-auto"
              >
                {subjectOptions.map((option, index) => {
                  const isSelected = formData.subject === option;
                  const isHighlighted = highlightedIndex === index;
                  return (
                    <li
                      key={option}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => selectOption(option)}
                      className={`px-4 py-3 font-sans text-body-lg text-on-surface cursor-pointer ${isHighlighted ? "bg-warm-beige" : "hover:bg-warm-beige"
                        } ${isSelected ? "font-medium" : ""}`}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            )}

            {getFieldError(formErrors, "subject") && (
              <p id="subject-error" className="mt-2 font-sans text-sm text-error">
                {getFieldError(formErrors, "subject")}
              </p>
            )}
          </div>

          {/* Your Message */}
          <div className="w-full">
            <label htmlFor="message" className="sr-only">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!getFieldError(formErrors, "message")}
              aria-describedby={getFieldError(formErrors, "message") ? "message-error" : undefined}
              className="w-full bg-transparent border-b border-border-neutral px-2 py-4 text-on-surface focus:outline-none focus:border-on-background font-sans text-body-lg placeholder:text-text-muted/60 resize-none"
              placeholder="Your message"
            />
            {getFieldError(formErrors, "message") && (
              <p id="message-error" className="mt-2 font-sans text-sm text-error">
                {getFieldError(formErrors, "message")}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-warm-beige text-on-surface rounded-xl flex items-center justify-between gap-6 shadow-sm shadow-on-surface/10 hover:shadow-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              <span className="font-sans text-body-md font-semibold tracking-wide">
                {isSubmitting ? "Sending..." : "Submit"}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;