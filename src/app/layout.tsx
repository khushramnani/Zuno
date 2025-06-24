import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ConvexClientProvider } from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zuno – AI-Powered Web App Builder for Developers & Creators",
  description: "Zuno is a lightning-fast AI web app builder that lets you design, code, and deploy full-stack applications instantly. Built for developers, makers, and startups.",
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    "AI web app builder",
    "Zuno",
    "bolt.new alternative",
    "Next.js AI builder",
    "web app generator",
    "AI coding platform",
    "low-code development",
    "full-stack app builder",
    "developer tools",
    "code generation with AI"
  ],
  authors: [{ name: "Khush Ramnani", url: "https://www.linkedin.com/in/khushramnani/" }],
  creator: "Zuno",
  metadataBase: new URL("https://zuno-flax.vercel.app"),
  openGraph: {
    title: "Zuno – AI-Powered Web App Builder for Developers & Creators",
    description:
      "Design, generate, and deploy complete web apps with Zuno's intelligent builder. Perfect for developers who want speed, control, and flexibility.",
    url: "https://zuno-flax.vercel.app",
    siteName: "Zuno",
    images: [
      {
        url: "https://zuno-flax.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Zuno - AI Web App Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://zuno-flax.vercel.app",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
      <Provider>
        {children}
      </Provider>
      </ConvexClientProvider>
      </body>
    </html>
    
  );
}
