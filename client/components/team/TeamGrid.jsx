import TeamMember from './TeamMember'
import SubHeading from '../shared/SubHeading'

const coreTeam = [
    {
        name: "Neha Sehgal",
        role: "CEO",
        tagline: "12+ years in government policy and applied research",
        bio: "With over 12 years in government policy and applied research, she has coordinated India's Free Trade Agreement negotiations at the Ministry of Commerce and led evaluation studies across healthcare, energy, and rural livelihoods. As Director at Ikaai India Research, she brings policy fluency and on-ground research rigor to every engagement the firm takes on.",
        image: "/team/neha-sehgal.png",
    },
    {
        name: "Devashish Chauhan",
        role: "Director",
        tagline: "15+ years bridging government operations and impact research",
        bio: "His career bridges government operations and applied research, having managed coal statistics and parliamentary inputs at the Ministry of Coal before moving into evaluation and operations leadership. As Director at Ikaai India Research, he anchors the firm's operations while driving impact assessments across CSR, energy, and public welfare projects.",
        image: "/team/devashish-chauhan.png",
    },
    {
        name: "Gehna Sahni",
        role: "Research Associate",
        tagline: "Research across health, education, gender and public policy",
        bio: "She specializes in social research, monitoring and evaluation, and impact assessment. She has contributed to research studies across public health, nutrition, education, gender, and community development, supporting research design, field coordination, data analysis, and report writing. Her research interests include gender, education, Indian Knowledge Systems (IKS), social exclusion and inclusion, and public policy.",
        image: "/team/gehna-sahani.png",
    },
    {
        name: "Khushi Rastogi",
        role: "Research Associate",
        tagline: "Evidence-based research and programme evaluation",
        bio: "Khushi is a Research Associate with a strong interest in evidence-based research, programme evaluation, and development initiatives, and is skilled in conducting literature reviews, data analysis, and translating research findings into actionable insights that support informed decision-making.",
        image: "/team/khushi-rastogi.png",
    },
    {
        name: "Poonam Chauhan",
        role: "Accounts Manager",
        tagline: "Managing financial operations and audit readiness",
        bio: "Poonam leads corporate finance, budget oversight, and accounts compliance at Ikaai. She ensures strict alignment with financial regulations, client reporting frameworks, and operational audits, bringing rigorous accounting discipline to the foundation.",
        image: "/team/poonam-mam.png",
    },
    {
        name: "Aman Sehgal",
        role: "Operations Manager",
        tagline: "Overseeing logistics, field setups, and timelines",
        bio: "Aman coordinates field survey logistics, resource allocation, and project timelines. He works closely with research teams to ensure seamless deployment of surveyors and equipment across diverse geographical landscapes, maintaining high operational efficiency.",
        image: "/team/aman-sehgal.png",
    },
    {
        name: "Vinay Kumar",
        role: "Field Manager",
        tagline: "Leading field survey operations and quality assurance",
        bio: "Vinay manages field teams and ensures data quality checks during large-scale surveys. He leads training workshops for enumerators and implements on-ground quality assurance protocols to safeguard data integrity and surveyor compliance.",
        image: "/team/vinay-kumar.png",
    },
]

const associates = [
    {
        name: "Shish Pal Bansal",
        role: "Consultancy Advisor",
        tagline: "40+ years in farm mechanization and agri-policy advisory",
        bio: "He brings over four decades of experience in farm mechanization and agricultural engineering, and has served as an Advisor to NITI Aayog, NCAER, and WAPCOS on national studies covering irrigation, mechanization, and rural livelihoods. His work has shaped policy recommendations on farm machinery, water use efficiency, and agri-based rural development across India.",
        image: null,
    },
    {
        name: "Sourabh Khurana",
        role: "CSR & Sustainability Consultant",
        tagline: "8+ years driving CSR and sustainability programmes",
        bio: "He brings over 8 years of experience across CSR, sustainability, and programme management, having led large-scale interventions spanning scholarships, volunteer engagement, and fund governance at organizations like the Raman Kant Munjal Foundation and National CSR Network. Currently at Cotton Connect, he continues to drive structured, evidence-based approaches to sustainable impact.",
        image: "/team/sourabh-khurana.png",
    },
    {
        name: "Aditi",
        role: "Learning & Wellbeing Consultant",
        tagline: "Social-emotional learning expert across 30+ schools",
        bio: "She specializes in social-emotional learning for schools. She has worked with 30+ schools, including Delhi Public School, Euro Public School, and National Public School, impacting 2,000+ students, 500+ teachers, and 500+ parents. Her sessions tackle real challenges—exam anxiety, screen dependence, and teacher burnout—creating lasting change in how students, teachers, and parents engage with each other.",
        image: "/team/aditi.png",
    },
    {
        name: "Nishchaya Nigam",
        role: "Legal Associate",
        tagline: "Precision in every clause, protection in every decision",
        bio: "Precision in every clause. Protection in every decision. Nishchaya has supported organizations in mitigating risk, structuring agreements, and navigating regulatory requirements with precision and diligence. Their attention to detail and sound legal judgment make them a trusted resource in safeguarding the organization's interests while enabling smooth business operations.",
        image: "/team/nishchaya-nigam.png",
    },
    {
        name: "NHRG Associate",
        role: "CA (Chartered Accountant)",
        tagline: "Every number accounted for, every decision backed by clarity",
        bio: "Every number accounted for. Every decision backed by clarity. They bring precision and sound fiscal judgment to strengthen financial controls and drive informed business decisions. Their meticulous approach makes them a trusted pillar of the organization's financial integrity.",
        image: "/team/nhrg-associate.png",
    }
]

function TeamSection({ eyebrow, title, members }) {
    const [titleLead, ...titleRemainder] = title.split(' ')
    const titleHighlight = titleRemainder.join(' ')

    return (
        <div className="relative">


            {/* Title Section (inspired by layout in the image) */}
            <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-neutral pb-6 z-10">
                <div className="flex flex-col gap-2">
                    <span className="inline-self-start max-w-max bg-surface-container-high border border-border-neutral px-4 py-1.5 rounded-full text-text-muted font-sans text-xs uppercase tracking-widest font-bold">
                        {eyebrow}
                    </span>
                    <SubHeading
                        text={titleLead}
                        highlightText={titleHighlight}
                    />
                </div>

                <div className="hidden md:block font-display text-5xl lg:text-7xl font-extrabold text-transparent select-none text-stroke-neutral">
                    IKAAI
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 relative z-10">
                {members.map((member) => (
                    <TeamMember key={member.name} {...member} />
                ))}
            </div>
        </div>
    )
}

const TeamGrid = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop bg-surface space-y-16 md:space-y-24">
            <div className="container-size">
                <TeamSection eyebrow="Meet the Team" title="Core Members" members={coreTeam} />
            </div>
            <div className="container-size">
                <TeamSection
                    eyebrow="Beyond the Core Team"
                    title="Associates & Advisors"
                    members={associates}
                />
            </div>
        </section>
    )
}

export default TeamGrid
