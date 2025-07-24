"use client";

import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { UserProfile } from "@/lib/types/database";
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

const UserIcon = () => (
   <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
   </svg>
);

const ChevronDownIcon = () => (
   <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M19 9l-7 7-7-7"
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
      // Add your sign out logic here
      console.log("Signing out...");
      setIsUserDropdownOpen(false);
   };

   const UserDropdown = () => (
      <Popover open={isUserDropdownOpen} onOpenChange={setIsUserDropdownOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="ghost"
               className="flex cursor-pointer items-center gap-2 px-3 py-2 h-auto"
               size="sm">
               <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {mockUser.avatar_url ? (
                     <img
                        src={mockUser.avatar_url}
                        alt={`${mockUser.first_name} ${mockUser.last_name}`}
                        className="h-8 w-8 rounded-full object-cover"
                     />
                  ) : (
                     <UserIcon />
                  )}
               </div>
               <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">
                     {mockUser.first_name} {mockUser.last_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                     {mockUser.email}
                  </div>
               </div>
               <ChevronDownIcon />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-56 p-0" align="end">
            <div className="p-2">
               <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  Account
               </div>
               <Link
                  href="/dashboard"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  <svg
                     className="mr-2 h-4 w-4"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                     />
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                     />
                  </svg>
                  Dashboard
               </Link>
               <Link
                  href="/profile"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  <svg
                     className="mr-2 h-4 w-4"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                     />
                  </svg>
                  Profile
               </Link>
               <div className="border-t my-1" />
               <button
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-red-600 hover:text-red-700 cursor-pointer">
                  <svg
                     className="mr-2 h-4 w-4"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                     />
                  </svg>
                  Sign Out
               </button>
            </div>
         </PopoverContent>
      </Popover>
   );

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
                     <UserDropdown />
                  ) : (
                     <>
                        <Link href="/signin">
                           <Button
                              className="cursor-pointer"
                              variant="ghost"
                              size="sm">
                              Sign In
                           </Button>
                        </Link>
                        <Link href="/signup">
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

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
               <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                     {navigation.map((item) => (
                        <Link
                           key={item.href}
                           href={item.href}
                           className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                           onClick={closeMobileMenu}>
                           {item.label}
                        </Link>
                     ))}
                     <div className="pt-4 border-t space-y-2">
                        {isAuthenticated ? (
                           <>
                              <Link href="/dashboard" onClick={closeMobileMenu}>
                                 <Button
                                    variant="ghost"
                                    className="w-full cursor-pointer "
                                    size="sm">
                                    Dashboard
                                 </Button>
                              </Link>
                              <Link href="/profile" onClick={closeMobileMenu}>
                                 <Button
                                    variant="ghost"
                                    className="w-full cursor-pointer"
                                    size="sm">
                                    Profile
                                 </Button>
                              </Link>
                              <Button
                                 variant="ghost"
                                 className="w-full text-red-600 hover:text-red-700 cursor-pointer"
                                 size="sm"
                                 onClick={() => {
                                    handleSignOut();
                                    closeMobileMenu();
                                 }}>
                                 Sign Out
                              </Button>
                           </>
                        ) : (
                           <>
                              <Link href="/signin" onClick={closeMobileMenu}>
                                 <Button
                                    variant="ghost"
                                    className="w-full cursor-pointer"
                                    size="sm">
                                    Sign In
                                 </Button>
                              </Link>
                              <Link href="/signup" onClick={closeMobileMenu}>
                                 <Button
                                    className="w-full cursor-pointer"
                                    size="sm">
                                    Get Started
                                 </Button>
                              </Link>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </header>
   );
}
