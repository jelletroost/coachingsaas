import AppDownload from "@/components/home/appDownload";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/faq";
import Hero from "@/components/home/hero";
import HowWork from "@/components/home/howWork";
import Pricing from "@/components/home/pricing";
import Services from "@/components/home/services";
import Testimonial from "@/components/home/testimonial";

export default function HomePage() {
   return (
      <div className="min-h-screen bg-background">
         <Hero />
         <HowWork />
         <Pricing />
         <Services />
         <Testimonial />
         <FAQ />
         <AppDownload />
         <CTA />
      </div>
   );
}
