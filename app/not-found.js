'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function NotFoundPage() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
            <div className="max-w-md mx-auto text-center">
                {/* Error Icon */}
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                    <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    404 - Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-2">
                    Oops! The page <strong>{pathname}</strong> doesn’t exist.
                </p>

                <p className="text-sm text-gray-500 mb-8">
                    It looks like you’ve followed a broken link or entered an invalid URL.
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 font-medium hover:bg-gray-100 transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
