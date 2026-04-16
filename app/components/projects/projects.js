import ProjectCard from "./projectcard";


const projects = [
    {
        title: "Real Estate Job Portal",
        description: "Fully responsive job board for real estate industry with login, signup, dashboard, jobs, candidates profile, analytics, tasks, and settings pages. Built with Next.js, Tailwind CSS, Context API.",
        tech: ["Next.js", "Tailwind CSS", "Context API", "MongoDB"],
        link: "https://realestatejobs-delta.vercel.app/",
        github: "https://github.com/bheema-284/realestatejobs",
        image: "/images/dashboard.jpg"
    },
    {
        title: "Alpha Realty – Refer & Earn Real Estate Platform",
        description: "A modern referral platform for the real estate industry. Users can discover premium properties, join a referral program, and earn rewards by connecting friends and family with their dream homes. Built with Next.js, Tailwind CSS, Context API, and MongoDB.",
        tech: ["Next.js", "Tailwind CSS", "Context API", "MongoDB"],
        link: "https://alphareality-ten.vercel.app/",
        github: "https://github.com/bheema-284/alphareality",
        image: "/images/alpha.png"
    },   
    {
        title: "Fun Quiz App",
        description: "Interactive quiz game with multiple-choice questions, scoring logic, final score summary, answer validation, and restart option. Clean responsive UI.",
        tech: ["React", "Tailwind CSS"],
        link: "https://main--timely-gnome-b21044.netlify.app/",
        github: "https://github.com/bheema-284/fun-quiz-app",
        image: "/images/funquiz.png"
    },
    {
        title: "Travelxp OTT Platform",
        description: "Large-scale OTT web app with video playback, subscription tiers, booking systems, program detail pages. Optimized for speed and SEO.",
        tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind"],
        link: "https://travelxp.com",
        github: null,
        image: "/images/travelxp.png"
    },
    {
        title: "Real Beez – Real Estate CRM",
        description: "Enterprise CRM for real estate agents with lead management, property tracking, analytics dashboards, and role-based access.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
        link: "https://deal-beez.com",
        github: "https://github.com/bheema-284/realbeez",
        image: "/images/realbeez.png"
    },
    {
        title: "Sales Beez – Sales Dashboard",
        description: "Sales performance dashboard for managers and admins with real-time charts, reporting, and approval workflows.",
        tech: ["Next.js", "Chart.js", "Node.js", "PostgreSQL"],
        link: "https://sales.real-beez.com/",
        github: "https://github.com/bheema-284/salesbeez",
        image: "/images/salesbeez.png"
    },
    {
        title: "HR Dashboard (Admin / Manager / Employee)",
        description: "Role-based HR portal with leave management, payroll, employee directory, and performance reviews. Three distinct dashboards.",
        tech: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Tailwind"],
        link: 'https://employer.real-beez.com/',
        github: "https://github.com/bheema-284/realbeez",
        image: "/images/hr.png"
    }
];

export default function Projects() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} {...project} />
                ))}
            </div>
        </div>
    );
}