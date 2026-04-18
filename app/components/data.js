import { Code, Database, Layout, Smartphone, Server, GitBranch, Award, Target, Lightbulb, Heart, BarChart3, User, Mail, Linkedin, Instagram, Facebook, Briefcase, GraduationCap, Rocket, Users, FolderGit2 } from 'lucide-react';

export const pageData = {
    navLinks: [
        { name: "About", id: "about" },
        { name: "Skills", id: "positioning" },
        { name: "Experience", id: "journey" },
        { name: "Tech Stack", id: "companies" },
        { name: "Projects", id: "projects" },
        { name: "Contact", id: "contact" },
    ],
    hero: {
        title: "Senior Software Developer | MERN Stack Specialist",
        subtitle: "I am a results-driven MERN Stack Developer with 3.5+ years of experience building scalable web & mobile apps using React.js, Next.js, React Native, Node.js, MongoDB, and Tailwind CSS. I have delivered OTT platforms (video playback, subscriptions, booking engines), real-estate portals, CRM/CMS systems, and enterprise dashboards.\n\nCurrently at Travelxp.com (Mumbai), I develop feature-rich modules and cross-platform mobile/TV apps. My projects include Alpha Realty (job board with auth & analytics), an LMS dashboard, and a quiz app. I am proficient in JIRA, Git, Figma, and Agile workflows.\n\nI am actively seeking MERN / Frontend opportunities. If you have openings or referrals, let’s connect.",
        name: "Bheemudu Guguloth",
        imageUrl: "/images/picture1.png",
        bgImage: "/images/bgimage2.jpeg",
    },
    stats: {
        title: "Impact Numbers",
        items: [
            { value: 4, label: "Years Experience", imageUrl: "/icons/experience.svg" },
            { value: 15, label: "Projects Delivered", imageUrl: "/icons/projects.svg" },
            { value: 10, label: "Happy Clients", imageUrl: "/icons/clients.svg" },
            { value: 100, label: "Code Reviews", imageUrl: "/icons/reviews.svg" },
        ]
    },
    about: {
        title: "About Me",
        description: "I'm a results-driven Senior Software Developer with 4+ years of experience in building performant, scalable user interfaces using React.js, Next.js, and React Native. Currently leading frontend development at Real Beez Project Pvt Ltd (Hyderabad).",
        description1: "Previously at Travelxp.com (Mumbai), I built OTT platforms with video playback, subscription systems, booking engines, and program detail pages. I've also developed cross-platform mobile apps and Android TV apps using React Native.",
        description2: "My domain expertise spans CRM, CMS, Real Estate job portals, property listing with hierarchy approvals, and enterprise dashboards. I'm a problem solver, team player, and continuous learner.",
        highlights: [
            "MERN Stack (React, Node, Express, MongoDB)",
            "Next.js (SSR/SSG) & Tailwind CSS",
            "React Native (iOS, Android, Android TV)",
            "State Management: Redux, Context API",
            "API Integration & Performance Optimization",
            "Cross-browser Testing & Responsive Design",
            "JIRA, Git, Bitbucket, Figma"
        ],
        imageUrl: "/images/pic.jpeg",
    },
    skills: {
        title: "Core Competencies",
        points: [
            { icon: <Code className="text-yellow-600" size={32} />, title: "Frontend Development", description: "React.js, Next.js, Tailwind CSS, Material UI, Bootstrap – building responsive, high-performance UIs." },
            { icon: <Server className="text-yellow-600" size={32} />, title: "Backend & API", description: "Node.js, Express.js, RESTful APIs, JWT authentication, MongoDB, Mongoose." },
            { icon: <Smartphone className="text-yellow-600" size={32} />, title: "Mobile Development", description: "React Native (iOS, Android, Android TV), Flutter basics – cross-platform apps." },
            { icon: <Database className="text-yellow-600" size={32} />, title: "Database Management", description: "MongoDB, PostgreSQL (basic), Firebase – data modeling and optimization." },
            { icon: <GitBranch className="text-yellow-600" size={32} />, title: "Version Control & Tools", description: "Git, GitHub, Bitbucket, JIRA, Figma, Postman, Vercel." },
            { icon: <Briefcase className="text-yellow-600" size={32} />, title: "Domain Expertise", description: "OTT platforms, Real Estate portals, CRM/CMS, Job boards, Approval hierarchies." },
        ]
    },
    experience: {
        title: "Work Experience",
        timeline: [
            {
                role: "Senior Software Developer",
                company: "Real Beez Project Pvt Ltd",
                period: "Sept 2025 – Present",
                location: "Hyderabad",
                description: "Leading frontend development for real estate CRM and dashboard products. Building scalable React/Next.js applications with role-based access, integrating RESTful APIs, optimizing performance.",
                achievements: ["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Team Leadership"],
                award: "",
            },
            {
                role: "Front End Developer",
                company: "Travelxp India Private Limited",
                period: "Aug 2022 – March 2025",
                location: "Mumbai",
                description: "Developed interactive UIs for web and Android TV apps using React.js, Next.js, React Native. Integrated APIs, optimized performance, built reusable components, cross-browser testing.",
                achievements: ["React.js", "Next.js", "React Native", "OTT Platforms", "Jira", "Performance Optimization"],
                award: "",
            },
            {
                role: "Graduate Apprentice Trainee",
                company: "Power Grid India Limited",
                period: "2021 – 2022",
                location: "Hyderabad",
                description: "Contributed to operational projects, stakeholder meetings, gained foundational knowledge in substation construction, estimation, and costing.",
                achievements: ["Project Coordination", "Estimation", "Team Collaboration"],
                award: "",
            }
        ]
    },
    companies: {
        title: "Tech Stack & Tools",
        items: [
            { name: "Frontend", role: "Expert", description: "React.js, Next.js, Tailwind CSS, Bootstrap, Material UI, Redux, Context API", focus: ["Responsive Design", "SPA/SSR", "Component Architecture"], vision: "Building fast, accessible, and delightful user interfaces.", imageUrl: "/frontend-icon.svg" },
            { name: "Backend & DB", role: "Proficient", description: "Node.js, Express.js, MongoDB, Mongoose, RESTful APIs, JWT", focus: ["API Design", "Database Modeling", "Security"], vision: "Creating robust and scalable backend services.", imageUrl: "/backend-icon.svg" },
            { name: "Mobile", role: "Proficient", description: "React Native (iOS, Android, TV apps), Flutter (basic)", focus: ["Cross-platform", "Offline support", "Push notifications"], vision: "Delivering native-like experiences across devices.", imageUrl: "/mobile-icon.svg" },
            { name: "Tools", role: "Daily Driver", description: "Git, GitHub, Bitbucket, JIRA, Figma, Postman, Vercel", focus: ["Agile/Scrum", "CI/CD", "Code Reviews"], vision: "Streamlined development and collaboration.", imageUrl: "/tools-icon.svg" },
        ]
    },
    projects: {
        title: "Featured Projects",
        list: [
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
                image: "/images/alpharealty.png"
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
                link: "https://employer.real-beez.com/",
                github: "https://github.com/bheema-284/realbeez",
                image: "/images/hr.png"
            }
        ]
    },
    education: {
        title: "Education & Credentials",
        items: [
            { degree: "Full-Stack Development", institution: "Masai School, Bangalore", period: "2021 – 2022", achievement: "MERN Stack Certification" },
            { degree: "Bachelor of Civil Engineering", institution: "BGTI, Hyderabad", period: "2016 – 2020", achievement: "First Class" },
            { degree: "Finishing School Programme", institution: "NAC, Hyderabad", period: "2019", achievement: "Engineer" }
        ],
        awards: [
            "Recognized for best performance in React.js at Masai School",
            "Delivered 15+ production-grade projects for Travelxp and Real Beez",
            "Mentored junior developers and conducted code reviews"
        ]
    },
    contact: {
        title: "Let's Connect",
        description: "I'm actively looking for MERN / Frontend roles. If you have any openings or referrals, I'd greatly appreciate your support.",
        email: "bheemudug@gmail.com",
        phone: "+91 9000133416",
        linkedin: "https://linkedin.com/in/bheemudu-guguloth-290089202",
        github: "https://github.com/bheema-284",
        instagram: "",
        facebook: "",
        address: "Hyderabad, Telangana, India",
    }
};