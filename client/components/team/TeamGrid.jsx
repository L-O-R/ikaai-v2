import React from 'react'
import TeamMember from './TeamMember'

// Categorized based on role wording in the bios (e.g. "Consultant", "Advisor",
// "currently at [other org]" read as external). Flag any of these to the
// client to confirm — Nishchaya Nigam ("Legal Associate") in particular could
// go either way and was a judgment call.
const coreTeam = [
    {
        name: "Devashish Chauhan",
        role: "CEO & Co-Founder",
        tagline: "15+ years bridging government operations and impact research",
        bio: "His career bridges government operations and applied research, having managed coal statistics and parliamentary inputs at the Ministry of Coal before moving into evaluation and operations leadership. As Director at Ikaai India Research, he anchors the firm's operations while driving impact assessments across CSR, energy, and public welfare projects.",
        image: "/team/devashish-chauhan.png",
    },
    {
        name: "Neha Sehgal",
        role: "CEO & Co-Founder",
        tagline: "12+ years in government policy and applied research",
        bio: "With over 12 years in government policy and applied research, she has coordinated India's Free Trade Agreement negotiations at the Ministry of Commerce and led evaluation studies across healthcare, energy, and rural livelihoods. As Director at Ikaai India Research, she brings policy fluency and on-ground research rigor to every engagement the firm takes on.",
        image: "/team/neha-sehgal.jpeg",
    },

    {
        name: "Shish Pal Bansal",
        role: "Consultancy Advisor",
        tagline: "40+ years in farm mechanization and agri-policy advisory",
        bio: "He brings over four decades of experience in farm mechanization and agricultural engineering, and has served as an Advisor to NITI Aayog, NCAER, and WAPCOS on national studies covering irrigation, mechanization, and rural livelihoods. His work has shaped policy recommendations on farm machinery, water use efficiency, and agri-based rural development across India.",
        image: "/team/shish-pal-bansal.jpeg",
    },
    {
        name: "Sourabh Khurana",
        role: "CSR & Sustainability Consultant",
        tagline: "8+ years driving CSR and sustainability programmes",
        bio: "He brings over 8 years of experience across CSR, sustainability, and programme management, having led large-scale interventions spanning scholarships, volunteer engagement, and fund governance at organizations like the Raman Kant Munjal Foundation and National CSR Network. Currently at Cotton Connect, he continues to drive structured, evidence-based approaches to sustainable impact.",
        image: "/team/sourabh-khurana.jpeg",
    },
    {
        name: "Aditi",
        role: "Learning & Wellbeing Consultant, Capacity-Building Consultant, Facilitator & Consultant",
        tagline: "Social-emotional learning expert across 30+ schools",
        bio: "She specializes in social-emotional learning for schools. She has worked with 30+ schools, including Delhi Public School, Euro Public School, and National Public School, impacting 2,000+ students, 500+ teachers, and 500+ parents. Her sessions tackle real challenges—exam anxiety, screen dependence, and teacher burnout—creating lasting change in how students, teachers, and parents engage with each other.",
        image: "/team/aditi.jpeg",
    },

]

const associates = [


    {
        name: "Nishchaya Nigam",
        role: "Legal Associate",
        tagline: "Precision in every clause, protection in every decision",
        bio: "Precision in every clause. Protection in every decision. Nishchaya has supported organizations in mitigating risk, structuring agreements, and navigating regulatory requirements with precision and diligence. Their attention to detail and sound legal judgment make them a trusted resource in safeguarding the organization's interests while enabling smooth business operations.",
        image: "/team/nishchaya-nigam.jpeg",
    },

    {
        name: "NHRG Associate",
        role: "CA (Chartered Accountant)",
        tagline: "Every number accounted for, every decision backed by clarity",
        bio: "Every number accounted for. Every decision backed by clarity. They bring precision and sound fiscal judgment to strengthen financial controls and drive informed business decisions. Their meticulous approach makes them a trusted pillar of the organization's financial integrity.",
        image: "/team/nhrg-associate.png",
    },
    {
        name: "Gehna Sahani",
        role: "Research Associate",
        tagline: "Research across health, education, gender and public policy",
        bio: "She specializes in social research, monitoring and evaluation, and impact assessment. She has contributed to research studies across public health, nutrition, education, gender, and community development, supporting research design, field coordination, data analysis, and report writing. Her research interests include gender, education, Indian Knowledge Systems (IKS), social exclusion and inclusion, and public policy.",
        image: "/team/gehna-sahani.jpeg",
    },
    {
        name: "Khushi Rastogi",
        role: "Research Associate",
        tagline: "Evidence-based research and programme evaluation",
        bio: "Khushi is a Research Associate with a strong interest in evidence-based research, programme evaluation, and development initiatives, and is skilled in conducting literature reviews, data analysis, and translating research findings into actionable insights that support informed decision-making.",
        image: "/team/khushi-rastogi.jpeg",
    },
]

function TeamSection({ eyebrow, title, members }) {
    return (
        <div>
            <div className="text-center mb-10 md:mb-12">
                <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
                    {eyebrow}
                </span>
                <h2 className="font-display text-headline-lg text-on-surface">
                    {title}
                </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                <TeamSection eyebrow="Meet the Team" title="Experts in Action" members={coreTeam} />
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