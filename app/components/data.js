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
            { value: 3.5, label: "Years Experience", imageUrl: "/icons/experience.svg" },
            { value: 3, label: "Projects Delivered", imageUrl: "/icons/projects.svg" },
            { value: 3, label: "Happy Clients", imageUrl: "/icons/clients.svg" },
            { value: 15, label: "Code Reviews", imageUrl: "/icons/reviews.svg" },
        ]
    },
    about: {
        title: "About Me",
        description: "Results-driven Senior Software Developer with 3.5+ years of experience building performant, scalable web and mobile applications using React.js, Next.js, React Native, Node.js, MongoDB, and Tailwind CSS. Proven expertise in delivering OTT platforms (video playback, subscriptions, booking engines), real estate portals, CRM/CMS systems, and enterprise dashboards. Currently leading frontend development at Real Beez Projects Pvt Ltd (Hyderabad).",
        highlights: [
            "MERN Stack (React, Node, Express, MongoDB)",
            "Next.js (SSR/SSG) & Tailwind CSS",
            "React Native (iOS, Android, Android TV)",
            "State Management: Redux, Context API",
            "API Integration & Performance Optimization",
            "Cross-browser Testing & Responsive Design",
            "JIRA, Git, Bitbucket, Figma, Postman",
            "OTT Platforms | Real Estate CRM | Enterprise Dashboards"
        ],
        resume: "https://drive.google.com/file/d/1rXk4hwM5mX_a3pwod-lY9l0LTtifovsq/view?usp=sharing",
        imageUrl: "/images/bheema1.jpeg",
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
                company: "Real Beez Projects Pvt Ltd",
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
                description: "Developed and optimized frontend solutions across multiple platforms including CMS/CRM, B2C website (Travelxp), Android TV app, and mobile app (React Native). Built reusable component libraries, improved code efficiency, and ensured timely delivery. Used prop drilling and Context API for state management, integrated REST APIs, and collaborated with cross-functional teams.",
                achievements: [
                    "React.js",
                    "Next.js",
                    "React Native",
                    "Node.js",
                    "MongoDB",
                    "Tailwind CSS",
                    "Context API",
                    "Code Optimization",
                    "Reusable Components",
                    "CMS/CRM Integration",
                    "OTT & TV App Development",
                    "Cross-Functional Delivery"
                ],
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
                "title": "Caterly Dude – Multi-Role Catering & Delivery Platform",
                "description": "Perfect for small events – catering for members with customizable menus. Supports Weddings, Birthdays, Corporate events, Engagements, Family Get‑Togethers, and Housewarming. Built with role‑based dashboards for users, delivery partners, caterers, and waiters, including order tracking, push notifications, and earnings tracking.",
                "tech": ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Socket.io", "Push Notifications"],
                "link": "https://caterly-brown.vercel.app/",
                "github": "https://github.com/bheema-284/caterly",
                "image": "/images/caterlydude.png"
            },
            {
                title: "Real Beez – Real Estate CRM",
                description: "Full-stack enterprise CRM for real estate agents. I built the frontend, backend, database, and server. Implemented a complete CMS/CRM system, the main website, and partial Flutter mobile app (home page).",
                tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Flutter"],
                link: "https://deal-beez.com",
                github: "https://github.com/bheema-284/realbeez",
                image: "/images/realbeez.png"
            },
            {
                title: "Sales Beez – Sales Dashboard",
                description: "Full-stack sales performance platform with Google login + email/password auth. Users can connect their Google account after normal login. Built like an e-commerce site with backend dashboard and hierarchical product approval system – admins can add products, only super admin can approve them.",
                tech: ["Next.js", "Chart.js", "Node.js", "PostgreSQL", "Google OAuth"],
                link: "https://sales.real-beez.com/",
                github: "https://github.com/bheema-284/salesbeez",
                image: "/images/salesbeez.png"
            },
            {
                title: "HR Dashboard (Admin / Manager / Employee)",
                description: "Role-based HR portal with three distinct dashboards. Employees can mark daily attendance, request leave or Attendance Regularization (AR), cancel requests. Managers approve/reject. Super admin has full access. Includes leave management, payroll, employee directory, and performance reviews.",
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
            { degree: "Full-Stack Development", institution: "Masai School, Bangalore", period: "Oct 2021 – July 2022", achievement: "MERN Stack Certification" },
            { degree: "Finishing School Program", institution: "NAC, Hyderabad", period: "Oct 2019 – Dec 2019 ", achievement: "Engineer" },
            { degree: "Bachelor of Civil Engineering", institution: "BGTI, Hyderabad", period: "Sept 2013 – June 2017", achievement: "First Class" },
            { degree: "Intermediate", institution: "Thorrur, Mahabuababd", period: "June 2011 – June 2013", achievement: "First Class" },
            { degree: "SSC", institution: "Nellikudur, Mahabubabad", period: "June 2010 – June 2011", achievement: "First Class" }
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