import { QueryProvider } from "@/lib/providers/queryProviders";
import { currentUserSSR } from "@/lib/supabase/supabaseServer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthProvider";
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

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const userData: any | null = await currentUserSSR();
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <QueryProvider>
               <AuthProvider user={userData}>{children}</AuthProvider>
               <Toaster position="top-center" />
            </QueryProvider>
         </body>
      </html>
   );
}
