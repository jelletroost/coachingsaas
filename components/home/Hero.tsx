import { Button } from "@/components/ui/button";
import heroImage from "@/public/female-doctor-hospital.jpg";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
   return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/3 via-background via-60% to-secondary/5">
         <div className="container mx-auto px-4 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Content */}
               <div className="text-center lg:text-left">
                  {/* Main Headline */}
                  <h1 className="mb-6 text-4x font-bold tracking-tight leading-[5rem] text-foreground sm:text-5xl lg:text-6xl">
                     A Smarter Way to Manage Your{" "}
                     <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Medication & Health Journey
                     </span>
                  </h1>

                  {/* Subheadline */}
                  <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
                     Personalized programs, professional coaching, and automated
                     orders — all in one place.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                     <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/signup">
                           Get Started
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                     <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-2">
                        <Link href="#how-it-works">
                           <Play className="mr-2 h-4 w-4" />
                           See How It Works
                        </Link>
                     </Button>
                  </div>
               </div>

               {/* Image */}
               <div className="relative">
                  <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                     <Image
                        src={heroImage}
                        alt="Health management platform interface"
                        width={1000}
                        height={1000}
                        priority
                     />
                  </div>

                  {/* Floating elements for visual interest */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
               </div>
            </div>
         </div>

         {/* Background Pattern */}
         <div className="absolute inset-0 -z-10 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,78,78,0.1)_25%,rgba(0,78,78,0.1)_50%,transparent_50%,transparent_75%,rgba(0,78,78,0.1)_75%)] bg-[length:20px_20px]"></div>
         </div>
      </section>
   );
}
