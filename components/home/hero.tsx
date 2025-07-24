import { Button } from "@/components/ui/button";
import heroImage from "@/public/female-doctor-hospital.jpg";
import { ArrowRight, CheckCircle, Play, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
   { number: "10K+", label: "Active Users" },
   { number: "95%", label: "Success Rate" },
   { number: "24/7", label: "Support Available" },
];

export default function Hero() {
   return (
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
         <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Content */}
               <div className="text-center lg:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                     <Star className="w-4 h-4" />
                     Trusted by 10,000+ healthcare professionals
                  </div>

                  {/* Main Headline */}
                  <h1 className="mb-6 text-4xl font-bold tracking-tight leading-tight text-foreground sm:text-5xl lg:text-6xl">
                     Transform Your Health with{" "}
                     <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Personalized Coaching
                     </span>
                  </h1>

                  {/* Subheading */}
                  <p className="mb-8 text-lg text-muted-foreground sm:text-xl max-w-2xl lg:max-w-none">
                     Get personalized health coaching, automated medication
                     management, and continuous support from certified
                     professionals. Your journey to better health starts here.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                     {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                           <div className="text-2xl font-bold text-primary">
                              {stat.number}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {stat.label}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                     <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                        <Link href="/signup">
                           Start Your Journey
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                     <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-2 hover:bg-primary/5">
                        <Link href="#how-it-works">
                           <Play className="mr-2 h-4 w-4" />
                           See How It Works
                        </Link>
                     </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                     <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Free 14-day trial
                     </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        No credit card required
                     </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Cancel anytime
                     </div>
                  </div>
               </div>

               {/* Image Section */}
               <div className="relative">
                  {/* Main Image */}
                  <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                     <Image
                        src={heroImage}
                        alt="Healthcare professional providing personalized coaching"
                        width={1000}
                        height={1000}
                        priority
                        className="object-cover"
                     />

                     {/* Overlay with stats */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                     {/* Floating stats card */}
                     <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-6 h-6 text-primary" />
                           </div>
                           <div>
                              <div className="text-lg font-bold text-foreground">
                                 95%
                              </div>
                              <div className="text-sm text-muted-foreground">
                                 Success Rate
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Floating elements for visual interest */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"></div>

                  {/* Testimonial card */}
                  <div className="absolute -bottom-8 -right-8 bg-white rounded-lg p-4 shadow-lg max-w-xs">
                     <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                           <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                           />
                        ))}
                     </div>
                     <p className="text-sm text-muted-foreground mb-2">
                        &ldquo;This platform completely transformed my health
                        journey. The personalized coaching made all the
                        difference.&rdquo;
                     </p>
                     <div className="text-xs font-medium text-foreground">
                        - Sarah M., Patient
                     </div>
                  </div>
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
