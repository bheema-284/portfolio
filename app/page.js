"use client";
import Link from "next/link";
import Counter from "./components/counter";
import GlowCard from "./components/glowcard";
import { Briefcase } from "lucide-react";

const workExperience = [
  {
    role: "Senior Software Developer",
    company: "Real Beez Project Pvt Ltd, Hyderabad",
    period: "Sept 2025 – Present",
    description: "Leading frontend development for real estate CRM and dashboard products. Building scalable React/Next.js applications with role-based access, integrating RESTful APIs, optimizing performance.",
    achievements: ["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Team Leadership"],
  },
  {
    role: "Front End Developer",
    company: "Travelxp India Private Limited, Mumbai",
    period: "Aug 2022 – March 2025",
    description: "Developed interactive UIs for web and Android TV apps using React.js, Next.js, React Native. Integrated APIs, optimized performance, built reusable components, cross-browser testing.",
    achievements: ["React.js", "Next.js", "React Native", "OTT Platforms", "Jira", "Performance Optimization"],
  },
  {
    role: "Graduate Apprentice Trainee",
    company: "Power Grid India Limited, Hyderabad",
    period: "2021 – 2022",
    description: "Contributed to operational projects, stakeholder meetings, gained foundational knowledge in substation construction, estimation, and costing.",
    achievements: ["Project Coordination", "Estimation", "Team Collaboration"],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bheemudu Guguloth
        </h1>
        <p className="text-xl md:text-2xl mt-6 text-gray-600">Senior Software Developer | 3.5+ Years Experience</p>
        <p className="text-lg mt-2 text-gray-500">React.js • Next.js • React Native • Node.js • MongoDB</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">View My Work</Link>
          <Link href="/resume" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">Download Resume</Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white shadow rounded-lg"><h3 className="text-3xl font-bold text-blue-600"><Counter value={3.5} /></h3><p className="text-gray-600">Years Experience</p></div>
          <div className="p-4 bg-white shadow rounded-lg"><h3 className="text-3xl font-bold text-blue-600"><Counter value={15} /></h3><p className="text-gray-600">Projects Delivered</p></div>
          <div className="p-4 bg-white shadow rounded-lg"><h3 className="text-3xl font-bold text-blue-600">5+</h3><p className="text-gray-600">Tech Stacks</p></div>
          <div className="p-4 bg-white shadow rounded-lg"><h3 className="text-3xl font-bold text-blue-600">100%</h3><p className="text-gray-600">Client Satisfaction</p></div>
        </div>
      </div>

      {/* Experience Timeline (styled like reference code) */}
      <div className="relative w-full py-12">

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg md:text-4xl font-bold flex items-center gap-3 text-gray-900 relative">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-white" />  <span className="text-blue-600 dark:text-white">Work Experience</span>

            {/* Gradient Line under text */}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-blue-400 via-blue-300 to-gray-400"></span>
          </h2>
        </div>
        <div className="relative w-[85%] mx-auto">
          {/* Vertical line */}
          <div className="absolute hidden sm:block left-4 md:left-1/2 top-0 h-full w-0.5 bg-blue-300 transform -translate-x-1/2"></div>
          {workExperience.map((item, index) => (
            <div key={index} className={`mb-12 relative flex items-stretch ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute hidden sm:block left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 border-4 border-white z-10"></div>
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} flex`}>
                <GlowCard className="w-full">
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-extrabold text-gray-900">{item.role}</h3>
                    <p className="text-blue-600 font-medium">{item.company}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.period}</p>
                    <p className="mt-3 text-gray-700">{item.description}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {item.achievements.map((ach, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{ach}</span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </div>
              <div className="hidden md:flex md:w-1/2 px-10">
                <div className="p-6 text-gray-900 dark:text-white w-[70%] text-center">
                  <div className="flex flex-col items-center">
                    {/* Horizontal gradient line with text positioned on it */}
                    <div className="relative w-full h-0.5 bg-gradient-to-r from-white via-blue-400 to-gray-700 rounded-full">
                      {/* 2021 positioned on the left side of the line */}
                      <div className="absolute -top-3.5 left-0 text-3xl font-bold transform -translate-y-1">
                        {item.period.split(' – ')[0]}
                      </div>

                      {/* Present positioned on the right side of the line */}
                      <div className="absolute -bottom-7.5 right-0 text-sm font-semibold opacity-75 transform -translate-y-1">
                        {item.period.split(' – ')[1]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}