import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
   return (
      <section className="py-20 lg:py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
         <div className="container mx-auto px-4">
            <div className="text-center">
               <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-primary-foreground">
                  <h3 className="text-2xl font-bold mb-4">
                     Ready to Start Your Health Journey?
                  </h3>
                  <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                     Join thousands of users who have transformed their health
                     with personalized coaching and automated medication
                     management.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button
                        asChild
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90">
                        <Link href="/signup">
                           Get Started Today
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                     <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-white text-primary hover:bg-white hover:text-primary">
                        <Link href="/signin">Sign In</Link>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
