import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MobileMenu({
   isMobileMenuOpen,
   closeMobileMenu,
   navigation,
   isAuthenticated,
   handleSignOut,
}: {
   isMobileMenuOpen: boolean;
   closeMobileMenu: () => void;
   navigation: {
      label: string;
      href: string;
   }[];
   isAuthenticated: boolean;
   handleSignOut: () => void;
}) {
   return (
      <div>
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
                           <Link href="/auth/signin" onClick={closeMobileMenu}>
                              <Button
                                 variant="ghost"
                                 className="w-full cursor-pointer"
                                 size="sm">
                                 Sign In
                              </Button>
                           </Link>
                           <Link href="/auth/signup" onClick={closeMobileMenu}>
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
   );
}
