import CTA from "@/components/home/CTA";
import Hero from "@/components/home/hero";
import HowWork from "@/components/home/howWrok";
import Pricing from "@/components/home/pricing";
import Services from "@/components/home/services";

export default function HomePage() {
   return (
      <div className="min-h-screen bg-background">
         <Hero />
         <HowWork />
         <Pricing />
         <Services />
         <CTA />
      </div>
   );
}
