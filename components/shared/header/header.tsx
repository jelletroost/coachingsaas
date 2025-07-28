"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useState } from "react";
import Logo from "../logo";
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
   {
      label: "Admin Dashboard",
      href: "/admin/overview",
   },
];

export default function Header() {
   const user = useAuthStore((state) => state.user);
   const isAuthenticated = user?.aud === "authenticated" ? true : false;
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
                        user={user}
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
