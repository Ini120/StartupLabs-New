import type { Metadata } from "next";
import { Syne, Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Founders Pulse",
  description: "Startup portfolio admin dashboard for Founders Pulse",
=======
  title: "StartupLabs",
  description: "Manage your startups, track milestones, and connect with mentors",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
>>>>>>> d3af74e (save local changes)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${dmMono.variable} h-full antialiased`}
    >
<<<<<<< HEAD
      <body className="min-h-full bg-bg text-slate-900 font-space">{children}</body>
=======
      <head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
>>>>>>> d3af74e (save local changes)
    </html>
  );
}
