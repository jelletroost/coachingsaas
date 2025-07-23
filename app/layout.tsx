import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/providers/queryProviders";
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
   title: "HealthCoach Pro - Digital Health & Medication Platform",
   description:
      "A comprehensive digital health platform connecting patients with coaches for personalized lifestyle and medication guidance. Coming soon!",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
         </body>
      </html>
   );
}
