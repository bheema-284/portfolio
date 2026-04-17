// app/components/ui/FloatingInput.js
'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import {
    ChevronDown,
    Eye,
    EyeOff,
    AlertCircle,
    CalendarDays,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// Utility function to generate color configuration from color class
const generateColorConfig = (colorClass, hasError = false) => {
    if (hasError) {
        return {
            border: 'border-red-500',
            text: 'text-red-600',
            bg: 'bg-red-50',
            hoverBg: 'bg-red-100',
            focusBg: 'bg-red-50',
            ring: 'ring-red-500/20',
            labelFocus: 'text-red-600',
            labelNormal: 'text-gray-400',
            textColor: 'text-red-900',
            iconColor: 'text-red-500',
            glow: 'shadow-red-200/50'
        };
    }

    if (!colorClass) {
        return {
            border: 'border-blue-500',
            text: 'text-blue-600',
            bg: 'bg-blue-100',
            hoverBg: 'bg-blue-200',
            focusBg: 'bg-blue-100',
            ring: 'ring-blue-500/20',
            labelFocus: 'text-blue-600',
            labelNormal: 'text-gray-400',
            textColor: 'text-gray-900',
            iconColor: 'text-blue-500',
            glow: 'shadow-blue-200/50'
        };
    }

    const match = colorClass.match(/bg-(\w+)-(\d+)/);
    if (!match) {
        const simpleMatch = colorClass.match(/(\w+)-(\d+)/);
        if (simpleMatch) {
            const colorName = simpleMatch[1];

            return {
                border: `border-${colorName}-500`,
                text: `text-${colorName}-600`,
                bg: `bg-${colorName}-100`,
                hoverBg: `bg-${colorName}-200`,
                focusBg: `bg-${colorName}-100`,
                ring: `ring-${colorName}-500/20`,
                labelFocus: `text-${colorName}-600`,
                labelNormal: 'text-gray-400',
                textColor: 'text-gray-900',
                iconColor: `text-${colorName}-500`,
                glow: `shadow-${colorName}-200/50`
            };
        }

        if (colorClass.match(/^\w+$/)) {
            return {
                border: `border-${colorClass}-500`,
                text: `text-${colorClass}-600`,
                bg: `bg-${colorClass}-100`,
                hoverBg: `bg-${colorClass}-200`,
                focusBg: `bg-${colorClass}-100`,
                ring: `ring-${colorClass}-500/20`,
                labelFocus: `text-${colorClass}-600`,
                labelNormal: 'text-gray-400',
                textColor: 'text-gray-900',
                iconColor: `text-${colorClass}-500`,
                glow: `shadow-${colorClass}-200/50`
            };
        }

        return {
            border: 'border-blue-500',
            text: 'text-blue-600',
            bg: 'bg-blue-100',
            hoverBg: 'bg-blue-200',
            focusBg: 'bg-blue-100',
            ring: 'ring-blue-500/20',
            labelFocus: 'text-blue-600',
            labelNormal: 'text-gray-400',
            textColor: 'text-gray-900',
            iconColor: 'text-blue-500',
            glow: 'shadow-blue-200/50'
        };
    }

    const colorName = match[1];
    const shade = match[2];

    const borderShade = parseInt(shade) > 300 ? '600' : '500';
    const textShade = parseInt(shade) > 300 ? '700' : '600';

    return {
        border: `border-${colorName}-${borderShade}`,
        text: `text-${colorName}-${textShade}`,
        bg: `bg-${colorName}-${shade}`,
        hoverBg: `bg-${colorName}-${Math.min(parseInt(shade) + 100, 900)}`,
        focusBg: `bg-${colorName}-${shade}`,
        ring: `ring-${colorName}-${borderShade}/20`,
        labelFocus: `text-${colorName}-${textShade}`,
        labelNormal: 'text-gray-400',
        textColor: 'text-gray-900',
        iconColor: `text-${colorName}-${borderShade}`,
        glow: `shadow-${colorName}-${borderShade}/30`
    };
};

export default function FloatingInput({
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    disabled = false,
    options = [],
    multiline = false,
    rows = 3,
    color = 'bg-blue-100',
    labelBgColor = 'bg-white',
    error = false,
    errorMessage = "",
    onFocus,
    onBlur,
    placeholder = "",
    icon: IconComponent = null,
    showBubble = true,
    bubbleColor = 'blue',
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(dayjs().year());
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
    const [showYearSelector, setShowYearSelector] = useState(false);
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [containerWidth, setContainerWidth] = useState('100%');
    const [bubbles, setBubbles] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    const containerRef = useRef(null);
    const hiddenDateInputRef = useRef(null);
    const dateButtonRef = useRef(null);
    const customDatePickerRef = useRef(null);
    const monthButtonRef = useRef(null);
    const yearButtonRef = useRef(null);
    const monthSelectorRef = useRef(null);
    const yearSelectorRef = useRef(null);

    // Check if value exists and is not empty
    const hasValue = value !== undefined && value !== null && value.toString().trim() !== '';

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Initialize selected year and month from value if it exists
    useEffect(() => {
        if (value && type === 'date') {
            try {
                const date = dayjs(value);
                if (date.isValid()) {
                    setSelectedYear(date.year());
                    setSelectedMonth(date.month());
                }
            } catch (e) {
                console.error('Error parsing date:', e);
            }
        }
    }, [value, type]);

    // Initialize bubbles
    useEffect(() => {
        if (showBubble && !disabled) {
            const newBubbles = Array.from({ length: 3 }).map((_, i) => ({
                id: i,
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                size: Math.random() * 8 + 4,
                duration: Math.random() * 10 + 15
            }));
            setBubbles(newBubbles);
        }
    }, [showBubble, disabled]);


    // Format date for display using dayjs
    const formatDisplayDate = (dateValue) => {
        if (!dateValue) return '';
        try {
            // Parse the date value
            let date;
            if (typeof dateValue === 'string') {
                // Check if it's ISO format or other
                if (dateValue.includes('T')) {
                    date = dayjs(dateValue);
                } else {
                    // Assume YYYY-MM-DD format (HTML date input format)
                    date = dayjs(dateValue, 'YYYY-MM-DD');
                }
            } else if (dateValue instanceof Date) {
                date = dayjs(dateValue);
            } else {
                date = dayjs(dateValue);
            }

            if (!date.isValid()) return dateValue;

            // Format based on locale or device
            if (isMobile) {
                return date.format('DD/MM/YYYY'); // Mobile friendly format
            }
            return date.format('DD MMM YYYY'); // Desktop format
        } catch (e) {
            console.error('Error formatting date:', e);
            return dateValue;
        }
    };

    // For date type, we'll show formatted date or placeholder
    const displayValue = type === 'date' && hasValue ? formatDisplayDate(value) : value;

    // Generate dynamic color configuration
    const currentColor = generateColorConfig(color, error);

    // Only show error if field is required AND has error
    const shouldShowError = error && required;

    // Update container width when component mounts or resizes
    useEffect(() => {
        const updateContainerWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setContainerWidth(`${width}px`);
            }
        };

        updateContainerWidth();
        window.addEventListener('resize', updateContainerWidth);

        return () => {
            window.removeEventListener('resize', updateContainerWidth);
        };
    }, []);

    // Handle click outside for all dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the main container
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsFocused(false);
                setShowCustomDatePicker(false);
                setShowYearSelector(false);
                setShowMonthSelector(false);
                return;
            }

            // Handle click outside for month selector
            if (showMonthSelector &&
                monthSelectorRef.current &&
                !monthSelectorRef.current.contains(event.target) &&
                monthButtonRef.current &&
                !monthButtonRef.current.contains(event.target)) {
                setShowMonthSelector(false);
            }

            // Handle click outside for year selector
            if (showYearSelector &&
                yearSelectorRef.current &&
                !yearSelectorRef.current.contains(event.target) &&
                yearButtonRef.current &&
                !yearButtonRef.current.contains(event.target)) {
                setShowYearSelector(false);
            }

            // Handle click outside for date picker
            if (showCustomDatePicker &&
                customDatePickerRef.current &&
                !customDatePickerRef.current.contains(event.target) &&
                dateButtonRef.current &&
                !dateButtonRef.current.contains(event.target) &&
                !event.target.closest('.calendar-icon')) {
                setShowCustomDatePicker(false);
                setShowMonthSelector(false);
                setShowYearSelector(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        // Add touch event for mobile
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showCustomDatePicker, showMonthSelector, showYearSelector]);

    // Handle focus
    const handleFocus = (e) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    // Handle blur
    const handleBlur = (e) => {
        setTimeout(() => {
            const activeElement = document.activeElement;
            const containerElement = containerRef.current;

            if (containerElement && !containerElement.contains(activeElement)) {
                setIsFocused(false);
                // Don't close date picker on blur, let click outside handle it
            }
        }, 10);

        if (onBlur) onBlur(e);
    };

    // Handle date input change
    const handleDateChange = (e) => {
        if (onChange) onChange(e);
        setShowCustomDatePicker(false);
        setIsFocused(false);
    };

    // Handle custom date selection
    const handleCustomDateSelect = (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        if (onChange) {
            onChange({
                target: {
                    value: formattedDate
                }
            });
        }
        setShowCustomDatePicker(false);
        setIsFocused(false);
        setShowMonthSelector(false);
        setShowYearSelector(false);
    };

    // Handle click on the date display area
    const handleDateClick = (e) => {
        if (disabled) return;

        // Prevent the native date picker from opening
        e.preventDefault();

        setIsFocused(true);
        setShowCustomDatePicker(true);
        setShowYearSelector(false);
        setShowMonthSelector(false);

        // Focus on the hidden input for accessibility
        if (hiddenDateInputRef.current) {
            hiddenDateInputRef.current.focus();
        }
    };

    // Handle calendar icon click
    const handleCalendarIconClick = (e) => {
        if (disabled) return;

        e.preventDefault();
        e.stopPropagation();

        setIsFocused(true);
        setShowCustomDatePicker(!showCustomDatePicker);
        setShowYearSelector(false);
        setShowMonthSelector(false);

        // Focus on the hidden input for accessibility
        if (hiddenDateInputRef.current) {
            hiddenDateInputRef.current.focus();
        }
    };

    // Handle year click
    const handleYearClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowYearSelector(!showYearSelector);
        setShowMonthSelector(false);
    };

    // Handle month click
    const handleMonthClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMonthSelector(!showMonthSelector);
        setShowYearSelector(false);
    };

    // Handle year selection
    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setShowYearSelector(false);

        // Update date if a date is already selected
        if (hasValue && value) {
            try {
                const currentDate = dayjs(value);
                if (currentDate.isValid()) {
                    const newDate = currentDate.year(year);
                    handleCustomDateSelect(newDate);
                }
            } catch (e) {
                console.error('Error updating year:', e);
            }
        }
    };

    // Handle month selection
    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        setShowMonthSelector(false);

        // Update date if a date is already selected
        if (hasValue && value) {
            try {
                const currentDate = dayjs(value);
                if (currentDate.isValid()) {
                    const newDate = currentDate.month(month);
                    handleCustomDateSelect(newDate);
                }
            } catch (e) {
                console.error('Error updating month:', e);
            }
        }
    };

    // Navigate to previous month
    const goToPreviousMonth = () => {
        const prevMonth = dayjs().year(selectedYear).month(selectedMonth).subtract(1, 'month');
        setSelectedYear(prevMonth.year());
        setSelectedMonth(prevMonth.month());
    };

    // Navigate to next month
    const goToNextMonth = () => {
        const nextMonth = dayjs().year(selectedYear).month(selectedMonth).add(1, 'month');
        setSelectedYear(nextMonth.year());
        setSelectedMonth(nextMonth.month());
    };

    // Generate years for selection with selected year always in range
    const generateYears = () => {
        const currentYear = dayjs().year();
        const years = [];

        // Ensure selectedYear is within range
        const minYear = Math.min(currentYear - 100, selectedYear - 50);
        const maxYear = Math.max(currentYear + 20, selectedYear + 50);

        // Generate years from minYear to maxYear
        for (let i = minYear; i <= maxYear; i++) {
            years.push(i);
        }

        return years;
    };

    // Generate months for selection
    const generateMonths = () => {
        return [
            { value: 0, label: 'January' },
            { value: 1, label: 'February' },
            { value: 2, label: 'March' },
            { value: 3, label: 'April' },
            { value: 4, label: 'May' },
            { value: 5, label: 'June' },
            { value: 6, label: 'July' },
            { value: 7, label: 'August' },
            { value: 8, label: 'September' },
            { value: 9, label: 'October' },
            { value: 10, label: 'November' },
            { value: 11, label: 'December' }
        ];
    };

    // Generate calendar grid for selected month and year
    const generateCalendarGrid = () => {
        const firstDayOfMonth = dayjs().year(selectedYear).month(selectedMonth).date(1);
        const startDay = firstDayOfMonth.day(); // 0 = Sunday, 1 = Monday, etc.

        // Get total days in current month
        const daysInMonth = dayjs().year(selectedYear).month(selectedMonth).daysInMonth();

        // Get days from previous month to show
        const prevMonthDays = dayjs().year(selectedYear).month(selectedMonth).subtract(1, 'month').daysInMonth();

        const days = [];

        // Base button classes with consistent padding
        const baseButtonClasses = `p-2 sm:p-2.5 md:p-3 text-sm sm:text-base rounded-lg transition-all touch-manipulation w-full flex items-center justify-center`;

        // Previous month's trailing days
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            days.push(
                <button
                    key={`prev-${day}`}
                    type="button"
                    className={`${baseButtonClasses} text-gray-400 hover:bg-gray-50 hover:text-gray-600`}
                    onClick={() => {
                        const date = dayjs().year(selectedYear).month(selectedMonth - 1).date(day);
                        handleCustomDateSelect(date);
                    }}
                >
                    {day}
                </button>
            );
        }

        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === dayjs().date() &&
                selectedMonth === dayjs().month() &&
                selectedYear === dayjs().year();

            const isSelected = hasValue && value ?
                dayjs(value).date() === day &&
                dayjs(value).month() === selectedMonth &&
                dayjs(value).year() === selectedYear : false;

            // Determine button classes based on state
            let buttonClasses = baseButtonClasses;

            if (isSelected) {
                buttonClasses += ` ${currentColor.bg} ${currentColor.text} font-medium shadow-lg ring-2 ring-offset-2 ${currentColor.ring}`;
            } else if (isToday) {
                buttonClasses += ` bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-medium shadow-sm`;
            } else {
                buttonClasses += ` text-gray-700 hover:bg-gray-50 hover:shadow-sm`;
            }

            days.push(
                <motion.button
                    key={`current-${day}`}
                    type="button"
                    onClick={() => {
                        const date = dayjs().year(selectedYear).month(selectedMonth).date(day);
                        handleCustomDateSelect(date);
                    }}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                    className={buttonClasses}
                >
                    {day}
                </motion.button>
            );
        }

        // Next month's leading days (to complete the grid)
        const totalCells = 42; // 6 rows * 7 columns
        const nextMonthDays = totalCells - days.length;

        for (let day = 1; day <= nextMonthDays; day++) {
            days.push(
                <button
                    key={`next-${day}`}
                    type="button"
                    className={`${baseButtonClasses} text-gray-400 hover:bg-gray-50 hover:text-gray-600`}
                    onClick={() => {
                        const date = dayjs().year(selectedYear).month(selectedMonth + 1).date(day);
                        handleCustomDateSelect(date);
                    }}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    // Common label styles for all input types
    const getLabelStyles = () => {
        const baseStyles = `absolute left-0 transition-all duration-200 pointer-events-none rounded-xl ${labelBgColor} px-1 z-10`;
        const floatingStyles = `top-0 text-xs font-medium -translate-y-1/2`;
        const normalStyles = 'top-1/2 -translate-y-1/2 text-base';

        let classes = baseStyles;

        if (isFocused || hasValue) {
            classes += ` ${floatingStyles}`;
            if (IconComponent) {
                classes += ` left-10`;
            } else {
                classes += ` left-3`;
            }
        } else {
            classes += ` ${normalStyles}`;
            if (IconComponent) {
                classes += ` left-10`;
            } else {
                classes += ` left-3`;
            }
        }

        if (shouldShowError) {
            classes += ` text-red-600`;
        } else if (isFocused) {
            classes += ` ${currentColor.labelFocus}`;
        } else if (hasValue) {
            classes += ' text-gray-800';
        } else {
            classes += ' text-gray-400';
        }

        return classes;
    };

    // Common container styles for all input types
    const getContainerStyles = () => {
        const baseStyles = `relative border-2 rounded-xl transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

        let borderStyles;
        let shadowStyles = '';

        if (shouldShowError) {
            borderStyles = 'border-red-500';
            shadowStyles = isFocused ? 'shadow-lg shadow-red-200/50' : '';
        } else if (isFocused) {
            borderStyles = currentColor.border;
            shadowStyles = `shadow-lg ${currentColor.glow}`;
        } else if (isHovered && !disabled) {
            borderStyles = 'border-gray-400';
            shadowStyles = 'shadow-md shadow-gray-200/30';
        } else if (hasValue) {
            borderStyles = 'border-gray-600';
        } else {
            borderStyles = 'border-gray-200';
        }

        const ringStyles = isFocused ? `${currentColor.ring}` : '';
        return `${baseStyles} ${borderStyles} ${shadowStyles} ${ringStyles} backdrop-blur-sm`;
    };

    // Common input styles for all input types
    const getInputStyles = () => {
        const textColor = shouldShowError ? 'text-red-700' : (hasValue ? 'text-gray-800' : 'text-gray-600');
        return `w-full bg-transparent outline-none rounded-xl ${textColor} placeholder-transparent`;
    };

    // Get background color based on state
    const getBackgroundColor = () => {
        if (shouldShowError) return 'bg-red-50/80';
        if (isFocused || hasValue) return currentColor.focusBg + '/80';
        if (isHovered && !isFocused && !disabled) return currentColor.hoverBg + '/60';
        return currentColor.bg + '/60';
    };

    // Get icon wrapper styles
    const getIconWrapperStyles = () => {
        const baseStyles = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20';
        let iconStyles = '';

        if (shouldShowError) {
            iconStyles = 'text-red-500';
        } else if (isFocused) {
            iconStyles = `${currentColor.iconColor}`;
        } else if (hasValue) {
            iconStyles = 'text-gray-700';
        } else {
            iconStyles = 'text-gray-400';
        }
        return `${baseStyles} ${iconStyles}`;
    };


    const getIconAnimation = () => {
        return {
            rotate: isFocused ? 5 : 0,
            scale: isFocused ? 1.1 : (isHovered ? 1.05 : 1),
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 200
            }
        };
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Animated Bubbles */}
            {showBubble && !disabled && bubbles.length > 0 && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                    {bubbles.map(bubble => (
                        <motion.div
                            key={bubble.id}
                            className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-teal-200/20"
                            style={{
                                left: `${bubble.x}%`,
                                top: `${bubble.y}%`,
                                width: bubble.size,
                                height: bubble.size
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: bubble.duration,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            )}

            {multiline ? (
                <div
                    className={getContainerStyles()}
                    onMouseEnter={() => !disabled && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {IconComponent && (
                        <div className={getIconWrapperStyles()}>
                            <motion.div animate={getIconAnimation()}>
                                <IconComponent className="h-5 w-5" />
                            </motion.div>
                        </div>
                    )}
                    <textarea
                        value={value}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        rows={rows}
                        className={`${getInputStyles()} py-4 resize-none ${getBackgroundColor()} ${IconComponent ? 'pl-10' : 'pl-4'} ${shouldShowError ? 'pr-10' : 'pr-4'}`}
                        placeholder={label}
                        disabled={disabled}
                        {...props}
                    />
                    <label className={getLabelStyles()}>
                        {label} {required && '*'}
                    </label>
                    {shouldShowError && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-20">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                    )}
                </div>
            ) : type === 'select' ? (
                <Listbox value={value} onChange={onChange}>
                    {({ open }) => (
                        <div className="relative">
                            <Listbox.Button
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onMouseEnter={() => !disabled && setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`${getContainerStyles()} w-full text-left ${getBackgroundColor()} ${IconComponent ? 'pl-10' : 'pl-4'} pr-10`}
                                disabled={disabled}
                            >
                                {IconComponent && (
                                    <div className={getIconWrapperStyles()}>
                                        <motion.div animate={getIconAnimation()}>
                                            <IconComponent className="h-5 w-5" />
                                        </motion.div>
                                    </div>
                                )}
                                <span className={`block truncate py-4 ${hasValue ? 'text-gray-800' : 'text-transparent'} ${IconComponent ? 'pl-0' : ''}`}>
                                    {hasValue ? options.find(o => o.value === value)?.label : "select value"}
                                </span>
                                <span
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                                >
                                    <ChevronDown
                                        className={`w-4 h-4 ${shouldShowError ? 'text-red-500' : (open ? currentColor.text : (hasValue ? 'text-gray-800' : 'text-gray-400'))}`}
                                    />
                                </span>
                                <label className={getLabelStyles()}>
                                    {label} {required && '*'}
                                </label>
                                {shouldShowError && (
                                    <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none z-20">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </Listbox.Button>

                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white/95 backdrop-blur-lg shadow-xl z-50 border border-gray-200"
                                    style={{ width: containerWidth }}
                                >
                                    {options.map(option => (
                                        <Listbox.Option
                                            key={option.value}
                                            value={option.value}
                                            className={({ active, selected }) =>
                                                `cursor-pointer px-4 py-3 transition-all duration-200 relative overflow-hidden
                                                ${active ? `${currentColor.bg}/20 ${currentColor.text}` : "text-gray-900"}
                                                ${selected ? `${currentColor.text} font-medium` : "font-normal"}
                                                ${IconComponent ? 'pl-10' : ''}`
                                            }
                                        >
                                            {({ active, selected }) => (
                                                <>
                                                    {active && (
                                                        <motion.div
                                                            layoutId="activeOption"
                                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                            initial={{ x: '-100%' }}
                                                            animate={{ x: '100%' }}
                                                            transition={{ duration: 0.5 }}
                                                        />
                                                    )}
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        {selected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="w-2 h-2 rounded-full bg-current"
                                                            />
                                                        )}
                                                        {option.label}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    )}
                </Listbox>
            ) : type === 'date' ? (
                <>
                    <div
                        className={getContainerStyles()}
                        onMouseEnter={() => !disabled && setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleDateClick}
                    >
                        {IconComponent && (
                            <div className={getIconWrapperStyles()}>
                                <motion.div animate={getIconAnimation()}>
                                    <IconComponent className="h-5 w-5" />
                                </motion.div>
                            </div>
                        )}

                        {/* Clickable display area */}
                        <div
                            ref={dateButtonRef}
                            className={`${getInputStyles()} py-4 ${getBackgroundColor()} ${IconComponent ? 'pl-10' : 'pl-4'} ${shouldShowError ? 'pr-10' : 'pr-4'} cursor-pointer select-none touch-manipulation`}
                            tabIndex={disabled ? -1 : 0}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            {hasValue ? (
                                <span className="text-gray-900">{displayValue}</span>
                            ) : (
                                <span className="text-gray-400 text-sm">
                                    {placeholder || label}
                                </span>
                            )}
                        </div>

                        {/* Calendar icon - Made clickable but prevents native picker */}
                        <div
                            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer z-20 calendar-icon touch-manipulation"
                            onClick={handleCalendarIconClick}
                        >
                            <span
                                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${showCustomDatePicker ? "rotate-180" : ""}`}
                            >
                                <ChevronDown
                                    className={`w-4 h-4 ${shouldShowError ? 'text-red-500' : (showCustomDatePicker ? currentColor.text : (hasValue ? 'text-gray-800' : 'text-gray-400'))}`}
                                />
                            </span>
                        </div>

                        {/* Error icon */}
                        {shouldShowError && (
                            <div className="absolute inset-y-0 right-10 pr-4 flex items-center pointer-events-none z-20">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                        )}

                        {/* Floating label */}
                        <label className={getLabelStyles()}>
                            {label} {required && <span className={shouldShowError ? "text-red-500" : ""}>*</span>}
                        </label>

                        {/* Hidden native date input - positioned off-screen for accessibility */}
                        <input
                            ref={hiddenDateInputRef}
                            type="date"
                            value={value || ''}
                            onChange={handleDateChange}
                            className="absolute opacity-0 w-0 h-0"
                            disabled={disabled}
                            style={{ fontSize: '16px' }}
                            aria-hidden="true"
                            {...props}
                        />
                    </div>

                    {/* Custom Date Picker Dropdown */}
                    <AnimatePresence>
                        {showCustomDatePicker && (
                            <motion.div
                                ref={customDatePickerRef}
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ type: "spring", damping: 20 }}
                                className={`absolute mt-1 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl z-50 border border-gray-200 p-3 sm:p-4 ${isMobile ? 'fixed inset-x-4 top-1/2 -translate-y-1/2 w-auto' : ''
                                    }`}
                                style={{
                                    width: isMobile ? 'auto' : containerWidth,
                                    minWidth: isMobile ? '120px' : '300px',
                                    maxHeight: isMobile ? '90vh' : 'auto',
                                    overflowY: isMobile ? 'auto' : 'visible'
                                }}
                            >
                                <div className="mb-4">
                                    {/* Month and Year Header */}
                                    <div className="flex items-center justify-between mb-4 relative">
                                        <motion.button
                                            whileHover={!isMobile ? { scale: 1.1 } : {}}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={goToPreviousMonth}
                                            className="p-3 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors touch-manipulation"
                                            type="button"
                                        >
                                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                        </motion.button>

                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            {/* Month Selector - Shows selected month */}
                                            <div className="relative">
                                                <motion.button
                                                    ref={monthButtonRef}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleMonthClick}
                                                    className={`font-semibold justify-between px-3 sm:px-4 py-2 bg-gray-100 rounded-lg transition-all flex items-center gap-1 ${hasValue ? currentColor.text : 'text-gray-600'
                                                        } hover:bg-gray-200 touch-manipulation`}
                                                    type="button"
                                                    style={{
                                                        minWidth: isMobile ? '120px' : '150px',
                                                        maxHeight: isMobile ? '200px' : '300px',
                                                        overflowY: 'auto'
                                                    }}
                                                >
                                                    <span className="text-sm sm:text-base">
                                                        {dayjs().month(selectedMonth).format(isMobile ? 'MMM' : 'MMMM')}
                                                    </span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showMonthSelector ? 'rotate-180' : ''}`} />
                                                </motion.button>

                                                {/* Month Selector Dropdown */}
                                                <AnimatePresence>
                                                    {showMonthSelector && (
                                                        <motion.div
                                                            ref={monthSelectorRef}
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            className="absolute hide-scrollbar top-full left-0 mt-1 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl z-[60] border border-gray-200 overflow-hidden"
                                                            style={{
                                                                minWidth: isMobile ? '120px' : '150px',
                                                                maxHeight: isMobile ? '200px' : '300px',
                                                                overflowY: 'auto'
                                                            }}
                                                        >
                                                            <div className="divide-y divide-gray-100">
                                                                {generateMonths().map((month, index) => {
                                                                    const isSelectedMonth = month.value === selectedMonth;
                                                                    const isFirst = index === 0;
                                                                    const isLast = index === generateMonths().length - 1;

                                                                    return (
                                                                        <motion.button
                                                                            key={month.value}
                                                                            ref={isSelectedMonth ? (el) => {
                                                                                if (el && showMonthSelector) {
                                                                                    setTimeout(() => {
                                                                                        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
                                                                                    }, 100);
                                                                                }
                                                                            } : null}
                                                                            onClick={() => handleMonthSelect(month.value)}
                                                                            className={`w-full text-left px-3 py-2 sm:py-3 text-sm transition-all touch-manipulation ${isSelectedMonth
                                                                                ? `${currentColor.bg} ${currentColor.text} font-medium`
                                                                                : 'text-gray-800 hover:bg-gray-100'
                                                                                } ${isFirst ? 'rounded-t-none' : ''} ${isLast ? 'rounded-b-none' : ''}`}
                                                                            type="button"
                                                                        >
                                                                            {isMobile ? month.label.substring(0, 3) : month.label}
                                                                        </motion.button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Year Selector - Shows selected year */}
                                            <div className="relative">
                                                <motion.button
                                                    ref={yearButtonRef}
                                                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleYearClick}
                                                    className={`font-semibold justify-between px-3 sm:px-4 py-2 bg-gray-100 rounded-lg transition-all flex items-center gap-1 ${hasValue ? currentColor.text : 'text-gray-600'
                                                        } hover:bg-gray-200 touch-manipulation`}
                                                    type="button"
                                                    style={{
                                                        minWidth: isMobile ? '100px' : '120px',
                                                        maxHeight: isMobile ? '200px' : '300px',
                                                        overflowY: 'auto'
                                                    }}
                                                >
                                                    <span className="text-sm sm:text-base">{selectedYear}</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showYearSelector ? 'rotate-180' : ''}`} />
                                                </motion.button>

                                                {/* Year Selector Dropdown */}
                                                <AnimatePresence>
                                                    {showYearSelector && (
                                                        <motion.div
                                                            ref={yearSelectorRef}
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            className="absolute hide-scrollbar top-full left-0 mt-1 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl z-[60] border border-gray-200 overflow-hidden"
                                                            style={{
                                                                minWidth: isMobile ? '100px' : '120px',
                                                                maxHeight: isMobile ? '200px' : '300px',
                                                                overflowY: 'auto'
                                                            }}
                                                        >
                                                            <div className="divide-y divide-gray-100">
                                                                {generateYears().map((year, index) => {
                                                                    const isSelectedYear = year === selectedYear;
                                                                    const isFirst = index === 0;
                                                                    const isLast = index === generateYears().length - 1;
                                                                    return (
                                                                        <motion.button
                                                                            key={year}
                                                                            ref={isSelectedYear ? (el) => {
                                                                                if (el && showYearSelector) {
                                                                                    setTimeout(() => {
                                                                                        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
                                                                                    }, 100);
                                                                                }
                                                                            } : null}
                                                                            onClick={() => handleYearSelect(year)}
                                                                            className={`w-full text-left px-3 py-2 sm:py-3 text-sm transition-all touch-manipulation ${isSelectedYear
                                                                                ? `${currentColor.bg} ${currentColor.text} font-medium`
                                                                                : 'text-gray-800 hover:bg-gray-100'
                                                                                } ${isFirst ? 'rounded-t-none' : ''} ${isLast ? 'rounded-b-none' : ''}`}
                                                                            type="button"
                                                                        >
                                                                            {year}
                                                                        </motion.button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={!isMobile ? { scale: 1.1 } : {}}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={goToNextMonth}
                                            className="p-3 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors touch-manipulation"
                                            type="button"
                                        >
                                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                        </motion.button>
                                    </div>

                                    {/* Day headers */}
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                            <div key={day} className="text-center">
                                                <span className="text-xs sm:text-sm font-medium text-gray-500">
                                                    {isMobile ? day.substring(0, 1) : day}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {generateCalendarGrid()}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between gap-2">
                                        <motion.button
                                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                const today = dayjs();
                                                setSelectedYear(today.year());
                                                setSelectedMonth(today.month());
                                                handleCustomDateSelect(today);
                                            }}
                                            className={`flex-1 px-3 sm:px-4 py-2 text-sm rounded-lg ${currentColor.bg} ${currentColor.text} hover:opacity-90 transition-opacity font-medium shadow-sm touch-manipulation`}
                                            type="button"
                                        >
                                            Today
                                        </motion.button>
                                        <motion.button
                                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowCustomDatePicker(false)}
                                            className="flex-1 px-3 sm:px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                                            type="button"
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div
                    className={getContainerStyles()}
                    onMouseEnter={() => !disabled && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {IconComponent && (
                        <div className={getIconWrapperStyles()}>
                            <motion.div animate={getIconAnimation()}>
                                <IconComponent className="h-5 w-5" />
                            </motion.div>
                        </div>
                    )}
                    <input
                        type={type === "password" ? showPassword ? "text" : "password" : type}
                        value={value}
                        onChange={onChange}
                        onFocus={handleFocus}
                        maxLength={type === 'tel' ? 10 : undefined}
                        onBlur={handleBlur}
                        className={`${getInputStyles()} py-4 ${getBackgroundColor()} ${IconComponent ? 'pl-10' : 'pl-4'} ${shouldShowError ? 'pr-10' : ''} ${type === 'password' ? 'pr-12' : ''}`}
                        placeholder={placeholder || label}
                        disabled={disabled}
                        {...props}
                    />
                    {shouldShowError && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-20">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                    )}
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 ${shouldShowError ? 'right-8' : 'right-0'} pr-4 flex items-center z-20 touch-manipulation`}
                            tabIndex={-1}
                            onFocus={(e) => {
                                e.preventDefault();
                                const input = e.target.closest('.relative').querySelector('input');
                                if (input) {
                                    input.focus();
                                }
                            }}
                        >
                            <motion.div
                                whileHover={!isMobile ? { scale: 1.1 } : {}}
                                whileTap={{ scale: 0.9 }}
                            >
                                {showPassword ? (
                                    <EyeOff className={`h-5 w-5 ${hasValue ? 'text-gray-800' : 'text-gray-400'} hover:text-gray-600`} />
                                ) : (
                                    <Eye className={`h-5 w-5 ${hasValue ? 'text-gray-800' : 'text-gray-400'} hover:text-gray-600`} />
                                )}
                            </motion.div>
                        </button>
                    )}
                    <label className={getLabelStyles()}>
                        {label} {required && <span className={shouldShowError ? "text-red-500" : ""}>*</span>}
                    </label>
                </div>
            )}

            {/* Error message display - Only for required fields */}
            {shouldShowError && errorMessage && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 px-1 flex items-center gap-1"
                >
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                </motion.p>
            )}
        </div>
    );
}