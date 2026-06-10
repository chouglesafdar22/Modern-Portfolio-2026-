import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safdar Chougle | Full-Stack MERN Developer",
  description: "Explore the portfolio of Safdar Chougle, a Full-Stack MERN Developer building modern, scalable, and user-focused digital experiences with React, Next.js, TypeScript, Node.js, Express.js, and MongoDB.",
  keywords: [
    "Safdar Chougle",
    "Safdar Chougle Portfolio",
    "Full Stack Developer",
    "Full Stack MERN Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "Web Developer",
    "Software Developer",
    "Portfolio Website",
    "Developer Portfolio",
    "Indian Full Stack Developer",
    "Indian MERN Developer",
    "Indian Web Developer",
    "Maharashtra Full Stack Developer",
    "Maharashtra Full Stack Developer",
    "MERN Developer India",
    "React Next.js Developer",
    "Freelance Web Developer",
  ],
  authors: [
    {
      name: "Safdar Chougle"
    }
  ],
  creator: "Safdar Chougle",
  openGraph: {
    title: "Safdar Chougle | Full-Stack MERN Developer",
    description:
      "Explore the portfolio of Safdar Chougle, a Full-Stack MERN Developer building modern, scalable, and user-focused digital experiences.",
    url: "https://safdarchougle.vercel.app",
    siteName: "Safdar Chougle Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safdar Chougle | Full-Stack MERN Developer",
    description:
      "Explore the portfolio of Safdar Chougle, a Full-Stack MERN Developer building modern, scalable, and user-focused digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="google-site-verification" content="eImYShPfw7ql04GtBt9DpManV5qBTv3aU9n2r2kf5Ws" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
        <ScrollProgress />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
