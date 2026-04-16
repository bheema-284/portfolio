"use client";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Using FormSubmit.co (free, no backend needed)
        const form = e.target;
        const data = new FormData(form);
        const response = await fetch("https://formsubmit.co/ajax/bheemudug@gmail.com", {
            method: "POST",
            body: data
        });
        if (response.ok) {
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600 dark:text-white">Contact Me</h1>
            <div className="bg-white shadow-lg rounded-lg p-8 text-blue-600 dark:text-white">
                {submitted && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        Thank you! I'll get back to you soon.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full text-gray-900 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-8 border-t pt-6 text-center text-gray-800">
                    <p className="text-gray-600">Or reach me directly:</p>
                    <p className="mt-2">📞 +91-9000133416 , +91-8309819073</p>
                    <p>✉️ bheemudug@gmail.com</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="https://github.com/bheema-284" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">GitHub</a>
                        <a href="https://linkedin.com/in/bheemudu-guguloth-290089202" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    );
}