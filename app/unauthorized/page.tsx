"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Home, LogIn, ShieldX, UserPlus } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
   return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            <Card className="border-2 border-destructive/20 shadow-lg">
               <CardHeader className="text-center space-y-4 pb-6">
                  <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                     <ShieldX className="w-8 h-8 text-destructive" />
                  </div>
                  <div className="space-y-2">
                     <CardTitle className="text-2xl font-bold text-destructive">
                        Access Denied
                     </CardTitle>
                     <CardDescription className="text-base">
                        You don&apos;t have permission to access this page.
                        Please sign in with the appropriate credentials.
                     </CardDescription>
                  </div>
               </CardHeader>

               <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground text-center">
                     <p>Choose an option below to continue:</p>
                  </div>

                  <div className="space-y-3">
                     <Button asChild className="w-full" size="lg">
                        <Link href="/signin">
                           <LogIn className="w-4 h-4 mr-2" />
                           Sign In
                        </Link>
                     </Button>

                     <Button
                        asChild
                        variant="outline"
                        className="w-full"
                        size="lg">
                        <Link href="/signup">
                           <UserPlus className="w-4 h-4 mr-2" />
                           Create Account
                        </Link>
                     </Button>

                     <Button
                        asChild
                        variant="ghost"
                        className="w-full"
                        size="lg">
                        <Link href="/">
                           <Home className="w-4 h-4 mr-2" />
                           Go to Home
                        </Link>
                     </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                     <p className="text-xs text-muted-foreground text-center">
                        Need help? Contact our support team for assistance.
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
