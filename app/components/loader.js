"use client";
import React from "react";

const Loader = () => {
    return (
        <div className="fixed top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 z-50">
            <span className="absolute inline-flex items-center w-10 h-10 bg-red-500 border-4 rounded-full opacity-50 animate-ping"></span>
        </div>
    );
};

export default Loader;
