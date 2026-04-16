export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p>© {new Date().getFullYear()} Bheemudu Guguloth. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Senior Software Developer | MERN | React Native</p>
            </div>
        </footer>
    );
}