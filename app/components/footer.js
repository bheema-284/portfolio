
export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-navy-900 to-navy-800 shadow-lg text-white py-8 z-20">
            <div className="px-6 text-center items-center justify-center">
                <p>&copy; {new Date().getFullYear()} Bheemudu Guguloth. All Rights Reserved.</p>
                <p className="mt-1 text-sm text-gray-400">MERN Stack Developer | React & Next.js Specialist</p>
            </div>
        </footer>
    );
}