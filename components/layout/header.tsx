"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

// Icons
const MenuIcon = () => (
   <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M4 6h16M4 12h16M4 18h16"
      />
   </svg>
);

const CloseIcon = () => (
   <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M6 18L18 6M6 6l12 12"
      />
   </svg>
);

const Logo = () => (
   <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
         <span className="text-primary-foreground font-bold text-sm">HC</span>
      </div>
      <span className="font-bold text-xl text-foreground">HealthCoach Pro</span>
   </div>
);

export default function Header() {
   const isAuthenticated = true;
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
   };

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
               {/* Logo */}
               <Link
                  href="/"
                  className="flex items-center"
                  onClick={closeMobileMenu}>
                  <Logo />
               </Link>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex items-center space-x-6">
                  <Link
                     href="/"
                     className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                     Home
                  </Link>
                  <Link
                     href="/#services"
                     className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                     Services
                  </Link>
                  <Link
                     href="/#pricing"
                     className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                     Pricing
                  </Link>
                  <Link
                     href="/#faq"
                     className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                     FAQ
                  </Link>
               </nav>

               {/* Desktop Auth Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  {isAuthenticated ? (
                     <Button variant="outline" size="sm">
                        Sign Out
                     </Button>
                  ) : (
                     <>
                        <Link href="/signin">
                           <Button variant="ghost" size="sm">
                              Sign In
                           </Button>
                        </Link>
                        <Link href="/signup">
                           <Button size="sm">Get Started</Button>
                        </Link>
                     </>
                  )}
               </div>

               {/* Mobile Menu Button */}
               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu">
                  {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
               </Button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
               <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                     <Link
                        href="/"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={closeMobileMenu}>
                        Home
                     </Link>
                     <Link
                        href="/#services"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={closeMobileMenu}>
                        Services
                     </Link>
                     <Link
                        href="/#pricing"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={closeMobileMenu}>
                        Pricing
                     </Link>
                     <Link
                        href="/#faq"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        onClick={closeMobileMenu}>
                        FAQ
                     </Link>
                     <div className="pt-4 border-t space-y-2">
                        <Link href="/signin" onClick={closeMobileMenu}>
                           <Button variant="ghost" className="w-full" size="sm">
                              Sign In
                           </Button>
                        </Link>
                        <Link href="/signup" onClick={closeMobileMenu}>
                           <Button className="w-full" size="sm">
                              Get Started
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </header>
   );
}
