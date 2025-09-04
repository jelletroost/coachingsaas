import { AuthProvider } from "@/lib/providers/authProvider";
import { QueryProvider } from "@/lib/providers/queryProviders";
import supabaseServerClient from "@/lib/supabase/supabaseServer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
   title: "Aevita - Digital Health & Medication Platform",
   description:
      "A comprehensive digital health platform connecting patients with coaches for personalized lifestyle and medication guidance. Coming soon!",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const supabase = await supabaseServerClient();
   const { data } = await supabase.auth.getUser();
   const serverUser = data?.user;
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <QueryProvider>
               <AuthProvider serverUser={serverUser}>{children}</AuthProvider>
               <Toaster position="top-center" />
            </QueryProvider>
         </body>
      </html>
   );
}
