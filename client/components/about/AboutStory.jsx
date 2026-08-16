import ScrollReveal from "../ui/ScrollReveal";

const AboutStory = () => {
	return (
		<section className="bg-warm-beige py-section-mobile md:py-section-desktop">
			<div className="container-size	">
				{/* Eyebrow + Headline */}
				<ScrollReveal className="text-center mb-12 md:mb-16">
					<span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
						Our Story
					</span>

					<h2 className="font-display text-headline-lg font-semibold text-on-surface">
						Every great journey begins with an idea. Ours began with a shared
						purpose.
					</h2>
				</ScrollReveal>

				{/* Story paragraphs */}
				<ScrollReveal delay={0.15} className="max-w-7xl mx-auto">
					<p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
						Ikaai India was founded in 2023 with a simple belief:{" "}
						<strong>
							research should not just produce data and reports.
						</strong>{" "}
						It should help organizations understand problems, make better
						decisions, improve programmes, and create meaningful impact.
					</p>

					<p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
						What started with a focus on Monitoring, Evaluation and Research
						has grown into a{" "}
						<strong>multidisciplinary organization</strong> working across
						research, data solutions, government advisory, CSR and
						sustainability, capacity building, field operations, and digital
						solutions.
					</p>

					<p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
						Over the years, we have worked across sectors including health,
						education, agriculture, fisheries, environment, renewable energy,
						governance, urban development, CSR, livelihoods, and public
						policy. Our work has reached{" "}
						<strong>more than 1.25 lakh respondents</strong> across India,
						giving us a strong understanding of both data and the realities on
						the ground.
					</p>

					<p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
						Today, Ikaai India works with government institutions, corporates,
						academic institutions, and development partners to generate
						reliable evidence and turn it into practical insights and
						solutions.
					</p>

					<p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
						Our next phase is bigger. We aim to build Ikaai India into a{" "}
						<strong>trusted research and advisory organization</strong> with a
						wider global presence. We look forward to working with
						international development partners, expanding our capabilities,
						and contributing to complex social and development challenges
						beyond India.
					</p>

					<p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
						As we grow, our purpose will remain the same:{" "}
						<em>
							to create knowledge that leads to better decisions, stronger
							institutions, and meaningful change.
						</em>
					</p>

					<p className="font-sans text-body-md text-text-secondary leading-relaxed">
						<strong>The journey has just begun.</strong>
					</p>
				</ScrollReveal>
			</div>
		</section>
	);
};

export default AboutStory;