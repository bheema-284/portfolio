"use client";
import { Mail } from "lucide-react";
import { Github, LinkedIn } from "./socialicons";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-navy-900 to-navy-800 shadow-lg text-white py-8 z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left side - Copyright */}
                    <div className="text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} Bheemudu Guguloth. All Rights Reserved.</p>
                        <p className="mt-1 text-sm text-gray-400">MERN Stack Developer | React & Next.js Specialist</p>
                    </div>

                    {/* Right side - Social links */}
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/bheema-284"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-brand-green transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/bheemudu-guguloth-290089202"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-brand-green transition-colors duration-200"
                            aria-label="LinkedIn"
                        >
                            <LinkedIn size={20} />
                        </a>
                        <a
                            href="mailto:bheemudug@gmail.com"
                            className="text-gray-300 hover:text-brand-green transition-colors duration-200"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}