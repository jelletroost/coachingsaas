import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import HowWork from "@/components/home/HowWrok";
import Pricing from "@/components/home/Pricing";

export default function HomePage() {
   return (
      <div className="min-h-screen bg-background">
         <Hero />
         <HowWork />
         <Pricing />
         <CTA />
      </div>
   );
}
