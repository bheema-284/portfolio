// components/TechStackIcons.jsx

export const FrontendIcon = ({ size = 60, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
    >
        {/* Monitor / Screen */}
        <rect x="15" y="20" width="70" height="50" rx="6" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
        {/* Code brackets inside */}
        <text x="50" y="52" fontSize="22" fontWeight="bold" fill="#78350F" textAnchor="middle">&lt;/&gt;</text>
        {/* Stand */}
        <rect x="40" y="70" width="20" height="6" rx="2" fill="#F59E0B" />
        <path d="M48 76 L52 85 M52 76 L56 85" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export const BackendIcon = ({ size = 60, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
    >
        {/* Server box */}
        <rect x="20" y="25" width="60" height="50" rx="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
        {/* Server lines */}
        <line x1="35" y1="38" x2="65" y2="38" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="50" x2="55" y2="50" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="62" x2="65" y2="62" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        {/* Database symbol */}
        <ellipse cx="50" cy="18" rx="18" ry="6" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
    </svg>
);

export const MobileIcon = ({ size = 60, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
    >
        {/* Phone body */}
        <rect x="30" y="15" width="40" height="70" rx="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
        {/* Screen */}
        <rect x="37" y="25" width="26" height="40" rx="3" fill="#78350F" />
        {/* Home button */}
        <circle cx="50" cy="74" r="4" fill="#F59E0B" />
        {/* App icons on screen */}
        <rect x="40" y="30" width="8" height="8" rx="1.5" fill="#FDE68A" />
        <rect x="52" y="30" width="8" height="8" rx="1.5" fill="#FDE68A" />
        <rect x="40" y="42" width="8" height="8" rx="1.5" fill="#FDE68A" />
        <rect x="52" y="42" width="8" height="8" rx="1.5" fill="#FDE68A" />
    </svg>
);

export const ToolsIcon = ({ size = 60, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
    >
        {/* Wrench */}
        <path d="M35 70 L70 35" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
        <circle cx="32" cy="72" r="12" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
        <rect x="28" y="68" width="8" height="8" rx="1" fill="#78350F" />
        {/* Gear / settings symbol */}
        <circle cx="68" cy="32" r="10" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 3" />
        <circle cx="68" cy="32" r="4" fill="#78350F" />
    </svg>
);