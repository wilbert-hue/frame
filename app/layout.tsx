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
  title: "Aluminium Frame Market — Project Tracking",
  description: "Project tracking database for the Global Aluminium Frame Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = `${geistSans.variable} ${geistMono.variable} antialiased`;
  return (
    <html lang="en">
      <body className={className}>
        {children}
      </body>
    </html>
  );
}
