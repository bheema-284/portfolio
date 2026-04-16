const skills = {
    "Frontend Technologies": [
        "React.js", "Next.js (SSR, SSG)", "JavaScript (ES6+)", "HTML5", "CSS3",
        "Tailwind CSS", "SCSS", "Bootstrap", "Material UI"
    ],
    "Backend & Databases": [
        "Node.js", "Express.js", "MongoDB", "Mongoose", "RESTful APIs"
    ],
    "Mobile Development": [
        "React Native", "React Native for TV", "Flutter (basic)"
    ],
    "State Management": [
        "Redux", "Redux Toolkit", "Context API"
    ],
    "Tools & Methodologies": [
        "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Agile/Scrum",
        "Postman", "Vercel", "Figma"
    ],
    "Domain Expertise": [
        "OTT Platforms (Video Streaming, Subscriptions, Booking)",
        "CRM (Customer Relationship Management)",
        "CMS (Content Management System)",
        "Real Estate Portals (Job portals, Property listing, Approval hierarchy)"
    ],
    "Soft Skills": [
        "Problem Solving", "Team Collaboration", "Cross-browser Testing",
        "Performance Optimization", "Communication", "Adaptability"
    ]
};

export default function Skills() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Technical & Professional Skills</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">{category}</h2>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}