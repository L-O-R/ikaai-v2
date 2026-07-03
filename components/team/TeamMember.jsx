
import React from 'react'

const TeamMember = ({ name, role, bio, image }) => {
    return (
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral hover-lift transition-all duration-300 text-center group">
            <div className="w-24 h-24 mx-auto rounded-full bg-surface-container-high flex items-center justify-center mb-4 overflow-hidden border-2 border-border-neutral group-hover:border-primary transition-colors">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <span className="material-symbols-outlined text-4xl text-text-muted">person</span>
                )}
            </div>
            <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors">
                {name}
            </h3>
            <p className="font-label-caps text-label-caps uppercase text-primary tracking-widest mt-1">
                {role}
            </p>
            <p className="font-body-md text-body-md text-text-secondary mt-3 leading-relaxed">
                {bio}
            </p>
        </div>
    )
}

export default TeamMember