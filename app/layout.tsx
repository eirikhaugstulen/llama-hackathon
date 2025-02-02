import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import Providers from "@/lib/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Health Data AI Dashboard",
    description: "Health data analytics and visualization platform",
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
                <Providers>
                    <SidebarProvider defaultOpen>
                        {children}
                    </SidebarProvider>
                </Providers>
            </body>
        </html>
    );
}
