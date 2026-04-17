'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootContext from "./components/config/rootcontext";
import { useState } from "react";
import Toast from "./components/toast";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [rootContext, setRootContext] = useState({
    toast: { show: false, dismiss: true, type: '', title: '', message: '' }
  });
  return (
    <html lang="en">
      <Head>
        <title>Bheemudu Guguloth | MERN Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Bheemudu Guguloth - Full Stack Developer with 4+ years experience in MERN, React Native, OTT & Real Estate platforms."
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <RootContext.Provider value={{ rootContext, setRootContext }}>
          <main>{children}</main>
          {rootContext?.toast && <Toast />}
        </RootContext.Provider>
      </body>
    </html>
  );
}
