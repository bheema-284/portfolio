import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ title, description, tech, link, github, image }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
            {image && (
                <div className="relative h-48 w-full bg-gray-200">
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>
            )}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tech.map((t) => (
                        <span key={t} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t}</span>
                    ))}
                </div>
                <div className="flex gap-4">
                    {link && <Link href={link} target="_blank" className="text-blue-600 hover:underline text-sm">Live Demo →</Link>}
                    {github && <Link href={github} target="_blank" className="text-gray-700 hover:underline text-sm">GitHub</Link>}
                </div>
            </div>
        </div>
    );
}