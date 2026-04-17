// app/components/ui/ModernCheckbox.js
const COLOR_CLASSES = {
    blue: "bg-blue-500 border-blue-500",
    yellow: "bg-yellow-500 border-yellow-500",
    amber: "bg-amber-500 border-amber-500",
    orange: "bg-orange-500 border-orange-500",
    red: "bg-red-500 border-red-500",
    pink: "bg-pink-500 border-pink-500",
    rose: "bg-rose-500 border-rose-500",
    purple: "bg-purple-500 border-purple-500",
    violet: "bg-violet-500 border-violet-500",
    indigo: "bg-indigo-500 border-indigo-500",
    green: "bg-green-500 border-green-500",
    emerald: "bg-emerald-500 border-emerald-500",
    teal: "bg-teal-500 border-teal-500",
    cyan: "bg-cyan-500 border-cyan-500",
    sky: "bg-sky-500 border-sky-500",
    lime: "bg-lime-500 border-lime-500",
    stone: "bg-stone-500 border-stone-500",
    gray: "bg-gray-500 border-gray-500",
};

export default function ModernCheckbox({
    label,
    checked,
    onChange,
    disabled = false,
    color = "blue"
}) {
    const activeColor = COLOR_CLASSES[color] || COLOR_CLASSES.blue;

    return (
        <label
            className={`relative flex items-center gap-3 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
        >
            {/* Checkbox box */}
            <div
                className={`
                    w-5 h-5 rounded-lg border-2 flex items-center justify-center
                    transition-all duration-200
                    ${checked
                        ? activeColor
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }
                `}
            >
                {checked && (
                    <span className="text-white text-sm leading-none">✓</span>
                )}
            </div>

            {/* Label */}
            {label && (
                <span className="text-gray-700 hover:text-gray-900 transition-colors">
                    {label}
                </span>
            )}

            {/* Hidden input */}
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="absolute opacity-0 pointer-events-none"
            />
        </label>
    );
}
