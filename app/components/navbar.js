"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold">
                        <Image
                            src="/images/b.jpg"
                            alt="Bheem logo"
                            width={120}
                            height={40}
                            priority
                            className="object-contain h-10"
                        />
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="hover:text-blue-400">Home</Link>
                        <Link href="/about" className="hover:text-blue-400">About</Link>
                        <Link href="/skills" className="hover:text-blue-400">Skills</Link>
                        <Link href="/projects" className="hover:text-blue-400">Projects</Link>
                        <Link href="/contact" className="hover:text-blue-400">Contact</Link>
                        <Link href="/resume" className="hover:text-blue-400">Resume</Link>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link href="/" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/about" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>About</Link>
                        <Link href="/skills" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>Skills</Link>
                        <Link href="/projects" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>Projects</Link>
                        <Link href="/contact" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>Contact</Link>
                        <Link href="/resume" className="block hover:text-blue-400" onClick={() => setIsOpen(false)}>Resume</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}