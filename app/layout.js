import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  title: "Bheemudu Guguloth | MERN Stack Developer",
  description: "Portfolio of Bheemudu Guguloth - Full Stack Developer with 3.5+ years experience in MERN, React Native, OTT & Real Estate platforms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 text-gray-800 ${inter.className}`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}