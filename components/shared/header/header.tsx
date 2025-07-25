"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/types/database";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./mobileMenu";
import UserDropdown from "./userDropdown";

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

// Mock user data - replace with actual user data from your auth store
const mockUser: UserProfile = {
   id: "1",
   user_id: "user-1",
   role: "patient",
   first_name: "John",
   last_name: "Doe",
   email: "john.doe@example.com",
   account_status: "active",
   email_verified: true,
   created_at: "2024-01-01",
   updated_at: "2024-01-01",
};

const navigation = [
   {
      label: "Home",
      href: "/",
   },
   {
      label: "Services",
      href: "/#services",
   },
   {
      label: "Pricing",
      href: "/#pricing",
   },
   {
      label: "Testimonials",
      href: "/#testimonials",
   },
   {
      label: "FAQ",
      href: "/#faq",
   },
];

export default function Header() {
   const isAuthenticated = true;
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
   };

   const handleSignOut = () => {
      console.log("Signing out...");
      setIsUserDropdownOpen(false);
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
                  {navigation.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                     </Link>
                  ))}
               </nav>

               {/* Desktop Auth Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  {isAuthenticated ? (
                     <UserDropdown
                        isUserDropdownOpen={isUserDropdownOpen}
                        setIsUserDropdownOpen={setIsUserDropdownOpen}
                        mockUser={mockUser}
                        handleSignOut={handleSignOut}
                     />
                  ) : (
                     <>
                        <Link href="/auth/signin">
                           <Button
                              className="cursor-pointer"
                              variant="ghost"
                              size="sm">
                              Sign In
                           </Button>
                        </Link>
                        <Link href="/auth/signup">
                           <Button className="cursor-pointer" size="sm">
                              Get Started
                           </Button>
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

            <MobileMenu
               isMobileMenuOpen={isMobileMenuOpen}
               closeMobileMenu={closeMobileMenu}
               navigation={navigation}
               isAuthenticated={isAuthenticated}
               handleSignOut={handleSignOut}
            />
         </div>
      </header>
   );
}
