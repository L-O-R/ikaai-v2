"use client";

const PageHero = ({ eyebrow, title, description }) => {
  return (
    <section className="relative min-h-[60vh] flex items-end pb-section-desktop px-4 md:px-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-gutter w-full ">
        <div className="md:col-span-3 space-y-1">
          <span className="font-sans text-headline-sm uppercase text-text-muted tracking-tight block">
            {eyebrow}
          </span>
          <h1 className="font-display text-headline-xl2 text-on-background mb-4">
            {title}
            <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-on-surface inline-block ml-2"></span>
          </h1>
        </div>
        <div className="md:col-span-2 flex items-end pb-4 ">
          <p className="font-sans text-body-md text-on-surface/90">{description}</p>
        </div>

      </div>

    </section>
  );
};

export default PageHero;
