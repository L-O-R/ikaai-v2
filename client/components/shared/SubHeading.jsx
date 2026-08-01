import React from 'react'

const SubHeading = ({ text, highlightText, className = "" }) => {
    return (
        <h2 className={`font-display text-headline-lg text-inverse-text ${className}`}>
            {text}
            {highlightText && (
                <span className="text-text-muted"> {highlightText}</span>
            )}
        </h2>
    )
}

export default SubHeading
