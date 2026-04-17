"use client";
import React, { useState, useEffect, useRef, createRef, useContext } from "react";
import { User, Mail, BarChart3, Plane, Award, Target, Lightbulb, FolderGit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from "next/image";
import Loader from "./components/loader";
import RootContext from "./components/config/rootcontext";
import Counter from "./components/counter";
import { BackendIcon, FrontendIcon, MobileIcon, ToolsIcon } from "./components/techstackIcons";
import { Facebook, Instagram, LinkedIn } from "./components/socialicons";
import Footer from "./components/footer";
import { pageData } from "./components/data";
import FloatingInput from "./components/ui/floatinginput";

const GlowCard = ({ children, className = "", fixedHeight = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const glowColors = {
    light: { primary: 'rgba(0, 0, 0, 0.1)', secondary: 'rgba(0, 0, 0, 0.05)', border: 'rgba(0, 0, 0, 0.2)' },
    dark: { primary: 'rgba(255, 255, 255, 0.6)', secondary: 'rgba(255, 255, 255, 0.4)', border: 'rgba(255, 255, 255, 0.3)' }
  };
  const colors = isDarkTheme ? glowColors.dark : glowColors.light;

  return (
    <div className={`relative cursor-pointer ${fixedHeight ? 'h-full' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`absolute bg-green-100 -inset-2 rounded-2xl pointer-events-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        style={{ background: `radial-gradient(circle at center, ${colors.primary} 0%, ${colors.secondary} 30%, transparent 70%)`, filter: 'blur(12px)', transition: 'all 0.25s ease-out' }} />
      <div className={`absolute bg-green-100 -inset-3 rounded-2xl pointer-events-none ${isHovered ? 'opacity-80 scale-100' : 'opacity-0 scale-95'}`}
        style={{ background: `radial-gradient(circle at center, ${colors.secondary} 0%, rgba(255,255,255,0.1) 40%, transparent 80%)`, filter: 'blur(16px)', transition: 'all 0.35s ease-out' }} />
      <div className={`absolute -inset-1 rounded-2xl pointer-events-none border-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ borderColor: colors.border, filter: 'blur(1px)', transition: 'all 0.25s ease-out' }} />
      <div className={`relative text-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden z-10 ${fixedHeight ? 'h-full flex flex-col' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default function Home() {
  const [serviceCall, setServiceCall] = useState(false);

  // --- Tab Bar State & Refs (identical to project details page) ---
  const [activeTab, setActiveTab] = useState("about");
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isManualNav = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const tabsContainerRef = useRef(null);
  const activeTabRef = useRef(null);
  const tabRefs = useRef({});

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "companies", label: "Companies" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education & Credentials" },
    { id: "contact", label: "Let's Connect" },
  ];

  // Helper: Get icon for section tile (fallback to Lightbulb)
  const getSectionIcon = (id) => {
    const icons = {
      about: <User size={28} />,
      skills: <Target size={28} />,
      experience: <Plane size={28} />,
      companies: <FolderGit2 size={28} />,
      projects: <BarChart3 size={28} />,
      education: <Award size={28} />,
      contact: <Mail size={28} />
    };
    return icons[id] || <Lightbulb size={28} />;
  };

  // Get section title from pageData (if available) or fallback to label
  const getSectionTitle = (section) => {
    if (pageData.sectionTitles && pageData.sectionTitles[section.id]) {
      return pageData.sectionTitles[section.id];
    }
    return section.label;
  };

  const sectionRefs = useRef({});
  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section.id] = sectionRefs.current[section.id] || createRef();
    });
  }, []);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to section with offset (header + tabs)
  const handleTabClick = (sectionId, fromHash = false) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    setIsScrolling(true);
    isManualNav.current = true;
    setActiveTab(sectionId);
    if (!fromHash) {
      window.history.pushState(null, null, `#${sectionId}`);
    }

    setTimeout(() => {
      const element = sectionRefs.current[sectionId]?.current;
      if (element) {
        const headerOffset = 136; // 80px (fixed header) + 56px (sticky tabs)
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        setTimeout(() => {
          setIsScrolling(false);
          isManualNav.current = false;
        }, 1000);
      } else {
        setIsScrolling(false);
        isManualNav.current = false;
      }
    }, 100);
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (isManualNav.current || isScrolling) return;
      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY + 136;
        let currentSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
          const element = sectionRefs.current[section.id]?.current;
          if (element) {
            const { offsetTop, offsetHeight } = element;
            const elementMiddle = offsetTop + (offsetHeight / 2);
            const distanceToMiddle = Math.abs(scrollPosition - elementMiddle);
            const isInViewport = (
              (offsetTop <= scrollPosition + viewportHeight - 50) &&
              (offsetTop + offsetHeight >= scrollPosition + 50)
            );
            if (isInViewport && distanceToMiddle < minDistance) {
              minDistance = distanceToMiddle;
              currentSection = section.id;
            }
          }
        });

        if (currentSection && currentSection !== activeTab) {
          setActiveTab(currentSection);
          window.history.replaceState(null, null, `#${currentSection}`);
          setTimeout(() => {
            if (tabRefs.current[currentSection]) {
              const tab = tabRefs.current[currentSection];
              setActiveIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
            }
          }, 50);
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeTab, isScrolling]);

  // Update indicator when activeTab changes
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tab = tabRefs.current[activeTab];
      setActiveIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
    }
  }, [activeTab]);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current && isMobile) {
      const container = tabsContainerRef.current;
      const activeTabElement = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      const isTabVisible = (tabRect.left >= containerRect.left && tabRect.right <= containerRect.right);
      if (!isTabVisible) {
        const scrollLeft = container.scrollLeft;
        const tabLeft = tabRect.left - containerRect.left;
        const tabRight = tabRect.right - containerRect.left;
        const containerWidth = containerRect.width;
        let targetScroll = scrollLeft;
        if (tabLeft < 0) targetScroll = scrollLeft + tabLeft - 16;
        else if (tabRight > containerWidth) targetScroll = scrollLeft + (tabRight - containerWidth) + 16;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setTimeout(() => {
          if (tabRefs.current[activeTab]) {
            const tab = tabRefs.current[activeTab];
            setActiveIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
          }
        }, 400);
      }
    }
  }, [activeTab, isMobile]);

  // Handle initial hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.find(s => s.id === hash)) {
      setTimeout(() => handleTabClick(hash, true), 500);
    }
  }, []);

  // Scroll to section from header nav
  const scrollToSection = (id) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      const headerOffset = 136;
      const elementPosition = sectionElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      if (sections.find(s => s.id === id)) {
        setActiveTab(id);
        window.history.pushState(null, null, `#${id}`);
        setTimeout(() => {
          if (tabRefs.current[id]) {
            const tab = tabRefs.current[id];
            setActiveIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
          }
        }, 50);
      }
    }
  };

  // -------------------- Render Functions for each section --------------------
  const renderAboutSection = () => (
    <div className="space-y-8 text-gray-800">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg leading-relaxed text-gray-600 mb-4">{pageData.about.description}</p>
          <p className="text-lg leading-relaxed text-gray-600 mb-4">{pageData.about.description1}</p>
          <p className="text-lg leading-relaxed text-gray-600 mb-4">{pageData.about.description2}</p>
          <ul className="space-y-3">
            {pageData.about.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-3 mt-0.5">•</span>
                <span className="text-gray-800 leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full h-[30rem] sm:h-[500px] md:h-[700px] rounded-xl overflow-hidden">
          <img src={pageData.about.imageUrl} alt="Profile" className="w-full h-full object-cover transition-all duration-300 hover:scale-105" />
        </div>
      </div>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto">
      {pageData.skills.points.map((point, index) => (
        <GlowCard key={index} className="h-full" fixedHeight={true}>
          <div className="text-center p-6 h-full flex flex-col backdrop-blur-sm">
            <div className="flex justify-center mb-4">{point.icon}</div>
            <h3 className="text-md md:text-lg lg:text-xl font-bold mb-3 break-words text-gray-900">{point.title}</h3>
            <p className="text-gray-800 break-words">{point.description}</p>
          </div>
        </GlowCard>
      ))}
    </div>
  );

  const renderExpSection = () => (
    <div className="relative w-[80%] mx-auto">
      <div className="absolute hidden sm:block left-4 md:left-1/2 top-0 h-full w-0.5 bg-green-700 transform -translate-x-1/2"></div>
      {pageData.experience.timeline.map((item, index) => (
        <div key={index} className={`mb-12 relative flex items-stretch ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className="absolute hidden sm:block left-4 md:left-1/2 top-4.5 w-4 h-4 rounded-full bg-green-500 transform -translate-x-1/2 border-4 border-gray-600 z-10"></div>
          <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} flex`}>
            <div className="p-6 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center text-center w-full h-full border border-gray-300 bg-white/70 hover:bg-green-50 transition-all duration-300">
              <h3 className="text-xl font-extrabold mt-1 text-gray-900 px-3 py-1 inline-block rounded-md bg-green-100">{item.role}</h3>
              <p className="text-gray-600 font-medium mt-1">{item.company} | {item.location}</p>
              <p className="mt-2 text-gray-800">{item.description}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {item.achievements.map((ach, i) => (
                  <span key={i} className="text-xs bg-green-800 text-green-200 px-2 py-1 rounded-full">{ach}</span>
                ))}
              </div>
              {item.award && (
                <div className="mt-3 p-2 bg-green-900/20 rounded-lg">
                  <span className="text-sm font-semibold text-green-600">🏆 {item.award}</span>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex md:w-1/2 px-10">
            <div className="p-6 text-green-600 w-[70%] text-center">
              <div className="flex flex-col items-center">
                <div className="relative w-full h-0.5 bg-gradient-to-r from-white via-green-400 to-blue-700 rounded-full">
                  <div className="absolute -top-3.5 left-0 text-3xl font-bold transform -translate-y-1">{item.period.split(' – ')[0]}</div>
                  <div className="absolute -bottom-8 right-0 text-sm font-semibold opacity-75 transform -translate-y-1">{item.period.split(' – ')[1] || 'Present'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompaniesSection = () => (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {pageData.companies.items.map((company, index) => {
        const IconComponent = [FrontendIcon, BackendIcon, MobileIcon, ToolsIcon][index];
        return (
          <GlowCard key={index} className="h-full" fixedHeight={true}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 mr-4 rounded-lg bg-gray-100 flex items-center justify-center">
                  <IconComponent size={50} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                  <p className="text-brand-green font-medium">{company.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{company.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Focus Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {company.focus.map((focus, i) => (
                    <span key={i} className="text-sm bg-emerald-50 text-brand-green px-3 py-1 rounded-full">{focus}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg mt-auto">
                <h4 className="font-semibold text-brand-green mb-1">Vision:</h4>
                <p className="text-gray-700 text-sm">{company.vision}</p>
              </div>
            </div>
          </GlowCard>
        );
      })}
    </div>
  );

  const renderProjectsSection = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pageData.projects.list.map((project, idx) => (
        <GlowCard key={idx} className="h-full flex flex-col">
          <div className="relative h-52 w-full bg-gray-200 overflow-hidden flex-shrink-0">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-300 text-gray-500">No preview</div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
            <p className="text-gray-600 mb-4 text-sm flex-grow line-clamp-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs bg-emerald-100 text-brand-green px-2 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Live Demo →</a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline text-sm">GitHub</a>
              )}
            </div>
          </div>
        </GlowCard>
      ))}
    </div>
  );

  const ContactSection = () => {
    const { setRootContext } = useContext(RootContext);
    const [contact, setContact] = useState({
      name: "",
      company_name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onValuesChange = (e, key) => {
      setContact(prev => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
    };

    const isFormValid =
      contact.name.trim() &&
      contact.email.trim() &&
      /\S+@\S+\.\S+/.test(contact.email) &&
      contact.subject.trim();

    const onSave = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setServiceCall(true)
      let newErrors = {};
      if (!contact.name.trim()) newErrors.name = "Name is required";
      if (!contact.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(contact.email))
        newErrors.email = "Invalid email address";
      if (!contact.subject.trim()) newErrors.subject = "Subject is required";
      if (!contact.message.trim()) newErrors.message = "Message is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await fetch(`/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });
        if (response.status) {
          setServiceCall(false)
        }
        if (response.status === 200) {
          setRootContext(prev => ({
            ...prev,
            toast: {
              show: true,
              dismiss: true,
              type: "success",
              title: "Success",
              message: "We Received Your Query Successfully!",
            },
          }));
          setContact({ name: "", company_name: "", email: "", subject: "", message: "" });
          setErrors({});
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Submission failed");
        }
      } catch (error) {
        console.error(error);
        setRootContext(prev => ({
          ...prev,
          toast: {
            show: true,
            dismiss: true,
            type: "error",
            title: "Error",
            message: error.message || "Something went wrong. Please try again.",
          },
        }));
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20" />
        </div>
        <div className="w-[85%] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            {/* Left column */}
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-gray-800 max-w-md leading-relaxed text-lg">{pageData.contact.address}</p>
              <div className="space-y-1">
                <p className="text-xl font-semibold text-gray-900">{pageData.contact.phone}</p>
                <a href={`mailto:${pageData.contact.email}`} className="text-green-600 hover:text-green-700 text-lg font-medium transition">
                  {pageData.contact.email}
                </a>
              </div>
              <div className="flex gap-4 pt-4">
                <a href={pageData.contact.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md">
                  <Facebook size={18} />
                </a>
                <a href={pageData.contact.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md">
                  <LinkedIn size={18} />
                </a>
                <a href={pageData.contact.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md">
                  <Instagram size={18} />
                </a>
                <a href={`mailto:${pageData.contact.email}`} className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md">
                  <Mail size={18} />
                </a>
              </div>
              <div className="mt-6 flex justify-left">
                <Image src="/images/logo.png" alt="Logo" width={180} height={180} className="object-contain w-52 sm:w-64 md:w-72" />
              </div>
            </div>

            {/* Right column - Form */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 rounded-3xl shadow-xl bg-white border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Any Opportunities?</h3>
              <form className="space-y-6" onSubmit={onSave}>
                <FloatingInput label="Name" value={contact.name} onChange={(e) => onValuesChange(e, "name")}
                  required error={!!errors.name} errorMessage={errors.name} color="bg-green-50" icon={User} />
                <FloatingInput label="Company Name" value={contact.company_name} onChange={(e) => onValuesChange(e, "company_name")}
                  color="bg-green-50" icon={User} />
                <FloatingInput label="Email" type="email" value={contact.email} onChange={(e) => onValuesChange(e, "email")}
                  required error={!!errors.email} errorMessage={errors.email} color="bg-green-50" icon={Mail} />
                <FloatingInput label="Subject" value={contact.subject} onChange={(e) => onValuesChange(e, "subject")}
                  required error={!!errors.subject} errorMessage={errors.subject} color="bg-green-50" icon={Target} />
                <FloatingInput label="Message" multiline rows={4} value={contact.message} onChange={(e) => onValuesChange(e, "message")}
                  required error={!!errors.message} errorMessage={errors.message} color="bg-green-50" icon={Mail} />
                <button type="submit" disabled={!isFormValid || isSubmitting}
                  className={`mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md w-full sm:w-auto ${isFormValid && !isSubmitting
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}>
                  {isSubmitting ? "Sending..." : "Submit now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Icons for stats
  const ExperienceIcon = ({ size = 60 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="20" y="35" width="60" height="40" rx="8" fill="#FDE68A" />
      <path d="M35 35 V28 Q35 22 40 22 H60 Q65 22 65 28 V35" fill="none" stroke="#78350F" strokeWidth="3" />
      <rect x="45" y="48" width="10" height="8" rx="2" fill="#78350F" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
    </svg>
  );
  const ProjectsIcon = ({ size = 60 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="15" y="35" width="70" height="45" rx="10" fill="#FDE68A" />
      <path d="M15 40 L35 25 L65 25 L85 40 Z" fill="#F59E0B" />
      <line x1="30" y1="50" x2="70" y2="50" stroke="#78350F" strokeWidth="3" />
      <line x1="30" y1="60" x2="60" y2="60" stroke="#78350F" strokeWidth="3" />
    </svg>
  );
  const ClientsIcon = ({ size = 60 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="40" r="20" fill="#FDE68A" />
      <path d="M25 75 C25 60 75 60 75 75" fill="#F59E0B" />
      <circle cx="42" cy="38" r="3" fill="#78350F" />
      <circle cx="58" cy="38" r="3" fill="#78350F" />
      <path d="M42 48 Q50 55 58 48" stroke="#78350F" strokeWidth="2.5" fill="none" />
    </svg>
  );
  const ReviewsIcon = ({ size = 60 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="20" y="25" width="60" height="40" rx="8" fill="#FDE68A" />
      <text x="50" y="50" fontSize="18" fontWeight="700" fill="#78350F" textAnchor="middle">&lt;/&gt;</text>
      <path d="M35 70 L50 80 L65 70" stroke="#F59E0B" strokeWidth="3" fill="none" />
      <circle cx="50" cy="88" r="4" fill="#F59E0B" />
    </svg>
  );

  const renderEducationSection = () => {
    return (
      <div className="py-5 relative overflow-hidden">
        <div className="w-[80%] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <GlowCard className="h-full" fixedHeight={true}>
              <div className="p-6 h-full flex flex-col backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Education</h3>
                <div className="space-y-4 flex-grow">
                  {pageData.education.items.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h4 className="font-semibold text-gray-900">{item.degree}</h4>
                      <p className="text-gray-800">{item.institution}</p>
                      <p className="text-sm text-gray-400">{item.period}</p>
                      <p className="text-green-500 font-medium mt-1">{item.achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
            <GlowCard className="h-full" fixedHeight={true}>
              <div className="p-6 h-full flex flex-col backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Awards & Recognition</h3>
                <ul className="space-y-3 flex-grow">
                  {pageData.education.awards.map((award, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">🏆</span>
                      <span className="text-gray-800">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-gray-800 font-sans bg-white m-0">
      {serviceCall && <Loader />}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-wrap gap-4 justify-center bg-gradient-to-br from-gray-200 to-gray-300 backdrop-blur-sm shadow-sm py-2 z-[99999] border-b border-gray-300">
        <div className="w-[80%] mx-auto flex justify-between items-center h-16">
          <div onClick={() => scrollToSection("/")} className="h-18 w-18 cursor-pointer">
            <Image src="/images/logo.png" alt="Bheemudu" width={150} height={150} className="h-full w-full object-cover scale-[140%]" />
          </div>
          <div
            ref={tabsContainerRef}
            className="relative flex overflow-x-auto scrollbar-hide px-2 gap-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseLeave={() => { }}
          >
            {/* Sliding Active Indicator (Yellow) */}
            <span
              className={`absolute bottom-green-600/70 h-full bg-green-600/70 rounded-full transition-all duration-500 ease-in-out z-30`}
              style={{
                width: activeIndicator.width,
                left: activeIndicator.left,
              }}
            ></span>

            {sections.map((section) => (
              <button
                key={section.id}
                ref={(el) => {
                  tabRefs.current[section.id] = el;
                  if (activeTab === section.id) {
                    activeTabRef.current = el;
                  }
                }}
                onClick={() => handleTabClick(section.id)}
                className={`px-4 py-1.5 cursor-pointer rounded-full whitespace-nowrap font-medium transition-all duration-300 flex-shrink-0 relative ${activeTab === section.id
                  ? "text-sm text-gray-700 border border-transparent z-30"
                  : "bg-gray-100 text-sm text-gray-700 border border-gray-200 z-10"
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="px-0">
        {/* Hero Section */}
        <section id="/" className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center">
          <div className="absolute inset-0 w-full h-full z-0 bg-cover bg-center" style={{ backgroundImage: `url(${pageData.hero.bgImage})`, opacity: 0.7 }} />
          <div className="absolute inset-0 w-[90%] md:w-[95%] h-[75%] md:h-[80%] mx-auto mt-16 md:mt-10 z-0">
            <Image src="/images/bg.png" alt="Background" fill className="object-contain md:object-cover" priority />
          </div>
          <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col-reverse md:flex-row items-center justify-between max-w-[1400px] mx-auto">
            <div className="flex-1 text-center md:text-left text-gray-50 drop-shadow-lg">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Welcome to <span className="text-green-500">{pageData.hero.name}</span></h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-4 md:mb-6 font-semibold">{pageData.hero.title}</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-50 leading-relaxed max-w-[600px] mx-auto md:mx-0">{pageData.hero.subtitle}</p>
            </div>
            <div className="flex justify-center md:justify-end flex-1">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem]">
                <Image src={pageData.hero.imageUrl} alt={pageData.hero.name} fill className="object-cover rounded-full mix-blend-overlay brightness-105 contrast-125 shadow-xs" priority />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#063A62]/70 via-[#063A62]/40 to-transparent mix-blend-multiply" />
                <div className="absolute -inset-1 rounded-full bg-[#063A62]/30 blur-xl opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="w-[80%] mx-auto py-8 relative z-10">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-lg md:text-3xl font-bold flex items-center gap-3 text-gray-900 relative">
              <Lightbulb className="w-8 h-8 text-green-600" /> {pageData.stats.title}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-green-400 via-green-300 to-gray-400"></span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {pageData.stats.items.map((stat, index) => {
              const IconComponent = [ExperienceIcon, ProjectsIcon, ClientsIcon, ReviewsIcon][index];
              return (
                <div key={index} className="text-center p-6 rounded-xl shadow-md">
                  <IconComponent size={60} className="mx-auto" />
                  <span className="text-3xl font-bold text-gray-900 block mt-2"><Counter value={stat.value} /></span>
                  <p className="mt-2 text-md text-green-500 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sections with Border Tile Headings */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={sectionRefs.current[section.id]}
            className="scroll-mt-36 py-12 relative overflow-hidden"
          >
            <div className="w-[80%] mx-auto">
              <div className="mb-10 relative">
                <div className="flex items-center justify-center">
                  {/* Left border */}
                  {activeTab === section.id ? (
                    <motion.div
                      initial={{ scaleX: 0, originX: 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: "easeIn", delay: 0.2 }}
                      className="h-0.5 bg-gradient-to-r from-transparent via-green-300 to-green-300 flex-1 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                    />
                  ) : (
                    <div className="h-0.5 bg-green-100/30 flex-1" />
                  )}

                  <div className={`flex gap-3 items-center text-3xl font-bold px-6 whitespace-nowrap relative ${activeTab === section.id
                    ? "text-gray-900"
                    : "text-gray-600"
                    }`}
                  >
                    <span className="text-green-600">
                      {getSectionIcon(section.id)}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-gray-800">
                      {getSectionTitle(section)}
                    </span>
                  </div>
                  {/* Right border */}
                  {activeTab === section.id ? (
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: "easeIn", delay: 0.2 }}
                      className="h-0.5 bg-gradient-to-r from-green-300 via-green-300 to-transparent flex-1 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                    />
                  ) : (
                    <div className="h-0.5 bg-green-100/30 flex-1" />
                  )}
                </div>
              </div>
              {/* Section Content */}
              <div className="animate-fadeIn pb-10">
                {section.id === "about" && renderAboutSection()}
                {section.id === "skills" && renderSkillsSection()}
                {section.id === "experience" && renderExpSection()}
                {section.id === "companies" && renderCompaniesSection()}
                {section.id === "projects" && renderProjectsSection()}
                {section.id === "education" && renderEducationSection()}
                {section.id === "contact" && <ContactSection />}
              </div>
            </div>
          </section>
        ))}
        <Footer />
      </main>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}