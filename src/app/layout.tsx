import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
        <meta name="description" content="A simple todo list app" />
      </head>
      <body className="bg-[#1A1A1A] text-white h-screen flex flex-col items-center">
        {/* Header Bar */}
        <div className="bg-[#0D0D0D] w-full h-[20vh] fixed top-0 left-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE] flex items-center gap-2">
            🚀 Todo App
          </h1>
        </div>

        {/* Main Content (Children) */}
        <main className="flex flex-col items-center justify-center w-full h-[80vh] mt-[20vh] ">
          {children}
        </main>
      </body>
    </html>
  );
}
