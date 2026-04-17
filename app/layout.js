'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import RootContext from "./components/config/rootcontext";
import { useState } from "react";
import Toast from "./components/toast";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <RootContext.Provider value={{ rootContext, setRootContext }}>
          <main>{children}</main>
          {rootContext?.toast && <Toast />}
        </RootContext.Provider>
      </body>
    </html>
  );
}
