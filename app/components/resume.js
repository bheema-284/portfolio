"use client";
import { useEffect } from "react";

export default function Resume() {
    useEffect(() => {
        // Trigger download when page loads
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Bheemudu_Guguloth_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return (
        <div className="text-center py-20 text-blue-600 dark:text-white">
            <h1 className="text-2xl font-semibold">Downloading your resume...</h1>
            <p className="mt-4">If download doesn't start, <a href="/resume.pdf" download className="text-blue-600 underline">click here</a>.</p>
        </div>
    );
}