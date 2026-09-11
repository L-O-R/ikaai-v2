import SubHeading from "../shared/SubHeading";
import TeamMember from "./TeamMember";

const coreTeam = [
  {
    name: "Neha Sehgal",
    role: "Chief Executive Officer",
    tagline: "12+ years in government policy and applied research",
    bio: "Former consultant with the Ministry of Heavy Industries and Ministry of Commerce & Industry, she brings extensive experience across sectors including Automotive, International Relations, Monitoring and evaluation in Health, Livelihoods and Education, complemented by an academic background in Economics and Development Studies.",
    image: "/team/neha-sehgal.png",
  },
  {
    name: "Devashish Chauhan",
    role: "Director",
    tagline: "15+ years bridging government operations and impact research",
    bio: "He brings experience across the development, energy, and research sectors, including consulting the Statistics Division of the Ministry of Coal. He has an academic background in Economics and Statistics.",
    image: "/team/devashish-chauhan_sir.png",
  },
  {
    name: "Gehna Sahni",
    role: "Research Associate",
    tagline: "Research across health, education, gender and public policy",
    bio: "She brings expertise in designing and executing social and market research projects, with extensive experience in managing research studies across India.",
    image: "/team/gehna-sahani-mam.png",
  },
  {
    name: "Khushi Rastogi",
    role: "Research Associate",
    tagline: "Evidence-based research and programme evaluation",
    bio: "She brings strong expertise in social and market research, with a background in Economics and experience in designing and executing research projects across India.",
    image: "/team/khushi-rastogi.png",
  },
  {
    name: "Poonam",
    role: "Accounts Manager",
    tagline: "Managing financial operations and audit readiness",
    bio: "She brings extensive experience across accounting and finance, and leads Ikaai India's accounting and financial management functions.",
    image: "/team/poonam-mam.png",
  },
  {
    name: "Aman Kumar",
    role: "Operations Manager",
    tagline: "Overseeing logistics, field setups, and timelines",
    bio: "He brings a young and energetic perspective to Ikaai India, managing project operations and supporting the smooth execution of organizational activities.",
    image: "/team/aman-sehgal.png",
  },
  {
    name: "Vinay Kumar",
    role: "Field Manager",
    tagline: "Leading field survey operations and quality assurance",
    bio: "He brings extensive experience in field operations and team management, ensuring effective coordination and smooth execution of fieldwork across research studies in India.",
    image: "/team/vinay-kumar.png",
  },
];

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
    bio: "He brings expertise across CSR, sustainability, and programme management, having led large-scale interventions spanning scholarships, volunteer engagement, and fund governance.",
    image: "/team/sourabh-khurana.png",
  },
  {
    name: "Aditi",
    role: "Learning & Wellbeing Consultant",
    tagline: "Social-emotional learning expert across 30+ schools",
    bio: "She specializes in social-emotional learning for schools. She has worked with 30+ schools, including Delhi Public School, Euro Public School, and National Public School, impacting 2,000+ students, 500+ teachers, and 500+ parents. Her sessions tackle real challenges—exam anxiety, screen dependence, and teacher burnout—creating lasting change in how students, teachers, and parents engage with each other.",
    image: "/team/aditi_mam.png",
  },
  {
    name: "Nishchaya Nigam",
    role: "Legal Advisor",
    subRole: "Managing Partner, Macrus Legal",
    tagline: "Precision in every clause, protection in every decision",
    bio: "Precision in every clause. Protection in every decision. Nishchaya has supported organizations in mitigating risk, structuring agreements, and navigating regulatory requirements with precision and diligence. Their attention to detail and sound legal judgment make them a trusted resource in safeguarding the organization's interests while enabling smooth business operations.",
    image: "/team/nishchaya-nigam.png",
  },
  {
    name: "NHRG Associate",
    role: "CA (Chartered Accountant)",
    tagline: "Every number accounted for, every decision backed by clarity",
    bio: "Every number accounted for. Every decision backed by clarity. They bring precision and sound fiscal judgment to strengthen financial controls and drive informed business decisions. Their meticulous approach makes them a trusted pillar of the organization's financial integrity.",
    image: "/team/nhrg-associates.png",
  },
];

function TeamSection({ eyebrow, title, members }) {
  const [titleLead, ...titleRemainder] = title.split(" ");
  const titleHighlight = titleRemainder.join(" ");

  return (
    <div className="relative ">
      {/* Title Section (inspired by layout in the image) */}
      <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4  pb-6 z-10">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-label-caps capitalize text-text-muted tracking-tighter block">
            {eyebrow}
          </span>
          <SubHeading text={titleLead} highlightText={titleHighlight} />
        </div>

        <div className="hidden md:block font-display text-5xl lg:text-7xl font-extrabold text-transparent select-none text-stroke-neutral">
          IKAAI
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 relative z-10">
        {members.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}

const TeamGrid = () => {
  return (
    <section className="py-section-mobile md:py-section-desktop bg-surface space-y-16 md:space-y-24">
      <div className="container-size">
        <TeamSection
          eyebrow="Meet the Team"
          title="Core Members"
          members={coreTeam}
        />
      </div>
      <div className="container-size">
        <TeamSection
          eyebrow="Beyond the Core Team"
          title="Advisors & Consultants"
          members={associates}
        />
      </div>
    </section>
  );
};

export default TeamGrid;
