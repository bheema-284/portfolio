"use client";
import { useState, useEffect } from "react";

export default function GlowCard({ children, className = "", fixedHeight = false }) {
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
        <div
            className={`relative cursor-pointer ${fixedHeight ? 'h-full' : ''} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`absolute bg-yellow-100 -inset-2 rounded-2xl pointer-events-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ background: `radial-gradient(circle at center, ${colors.primary} 0%, ${colors.secondary} 30%, transparent 70%)`, filter: 'blur(12px)', transition: 'all 0.25s ease-out' }}
            />
            <div
                className={`absolute bg-yellow-100 -inset-3 rounded-2xl pointer-events-none ${isHovered ? 'opacity-80 scale-100' : 'opacity-0 scale-95'}`}
                style={{ background: `radial-gradient(circle at center, ${colors.secondary} 0%, rgba(255,255,255,0.1) 40%, transparent 80%)`, filter: 'blur(16px)', transition: 'all 0.35s ease-out' }}
            />
            <div
                className={`absolute -inset-1 rounded-2xl pointer-events-none border-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ borderColor: colors.border, filter: 'blur(1px)', transition: 'all 0.25s ease-out' }}
            />
            <div className={`relative bg-white text-gray-900 rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10 ${fixedHeight ? 'h-full flex flex-col' : ''}`}>
                {children}
            </div>
        </div>
    );
}