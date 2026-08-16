import ScrollReveal from "../ui/ScrollReveal";
import SubHeading from "../shared/SubHeading";

const MissionVision = () => {
	return (
		<section className="py-section-mobile md:py-section-desktop bg-surface">
			<div className="container-size px-gutter">
				<ScrollReveal className="text-center mb-12 md:mb-16">
					<span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
						Our Compass
					</span>
					<SubHeading text="Mission &" highlightText="Vision" />
				</ScrollReveal>
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-stretch">
					{/* Mission */}
					<ScrollReveal
						delay={0.1}
						className="lg:col-span-3 flex flex-col bg-surface-container-low rounded-2xl p-8 md:p-10 border border-border-neutral hover-lift transition-all duration-300"
					>
						<div className="w-14 h-14 rounded-full bg-warm-beige flex items-center justify-center mb-6 shrink-0">
							<span className="material-symbols-outlined text-headline-sm text-primary">
								flag
							</span>
						</div>
						<h3 className="font-display text-headline-sm text-on-surface mb-4">
							Our Mission
						</h3>
						<p className="font-sans text-body-md text-text-secondary leading-relaxed">
							Our mission is to partner with governments, development
							organisations, corporates, research institutions, and communities
							to deliver innovative research, AI-enabled analytics, advisory,
							monitoring &amp; evaluation, impact assessment, project
							management, and capacity-building solutions that generate
							credible evidence, empower institutions, enable informed
							decision-making, strengthen policies and programmes, and create
							measurable, sustainable development outcomes.
						</p>
					</ScrollReveal>

					{/* Vision */}
					<ScrollReveal
						delay={0.2}
						className="lg:col-span-2 flex flex-col bg-warm-beige text-white rounded-2xl p-8 md:p-10 border border-primary/20 hover-lift transition-all duration-300"
					>
						<div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 shrink-0">
							<span className="material-symbols-outlined text-headline-sm text-on-surface">
								visibility
							</span>
						</div>
						<h3 className="font-display text-headline-sm text-on-surface mb-4">
							Our Vision
						</h3>
						<p className="font-sans text-body-lg text-on-surface/90 leading-relaxed">
							To be a trusted global partner in advancing evidence-based
							governance, sustainable development, and social impact through
							research, innovation, technology, and advisory solutions.
						</p>
						<div className="mt-auto pt-8 flex items-center gap-1 text-on-surface/70">
							<span
								className="material-symbols-outlined text-body-lg!"
								aria-hidden="true"
							>
								public
							</span>
							<span className="font-sans text-body-md font-bold capitalize tracking-tight">
								Guided by evidence. Driven by impact.
							</span>
						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
};

export default MissionVision;
