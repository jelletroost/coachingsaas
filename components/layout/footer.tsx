import { Button } from "@/components/ui/button";
import {
   Award,
   Facebook,
   Heart,
   Instagram,
   Linkedin,
   Shield,
   Twitter,
   Users,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
   const footerLinks = {
      product: [
         { label: "Features", href: "#features" },
         { label: "Pricing", href: "#pricing" },
         { label: "Mobile App", href: "#app" },
         { label: "How It Works", href: "#how-it-works" },
      ],
      company: [
         { label: "About Us", href: "/about" },
         { label: "Careers", href: "/careers" },
         { label: "Press", href: "/press" },
         { label: "Partners", href: "/partners" },
      ],
      support: [
         { label: "Help Center", href: "/help" },
         { label: "Contact Us", href: "/contact" },
         { label: "Privacy Policy", href: "/privacy" },
         { label: "Terms of Service", href: "/terms" },
      ],
      resources: [
         { label: "Blog", href: "/blog" },
         { label: "Health Tips", href: "/tips" },
         { label: "Research", href: "/research" },
         { label: "Community", href: "/community" },
      ],
   };

   const socialLinks = [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Twitter, href: "#", label: "Twitter" },
      { icon: Instagram, href: "#", label: "Instagram" },
      { icon: Linkedin, href: "#", label: "LinkedIn" },
   ];

   const trustIndicators = [
      { icon: Shield, label: "HIPAA Compliant" },
      { icon: Users, label: "10K+ Users" },
      { icon: Award, label: "Certified Coaches" },
   ];

   return (
      <footer className="bg-gray-900 text-white border-t border-gray-800">
         {/* Main Footer Content */}
         <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
               {/* Brand Section */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold text-primary">
                        HealthCoach Pro
                     </h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                     Transform your health journey with personalized coaching,
                     automated medication management, and continuous support
                     from certified healthcare professionals.
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-4">
                     {trustIndicators.map((indicator, index) => (
                        <div
                           key={index}
                           className="flex items-center gap-2 text-sm text-gray-400">
                           <indicator.icon className="w-4 h-4 text-primary" />
                           <span>{indicator.label}</span>
                        </div>
                     ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                     {socialLinks.map((social, index) => (
                        <Button
                           key={index}
                           asChild
                           variant="outline"
                           size="icon"
                           className="w-9 h-9 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                           <a href={social.href} aria-label={social.label}>
                              <social.icon className="w-4 h-4" />
                           </a>
                        </Button>
                     ))}
                  </div>
               </div>

               {/* Product Links */}
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Product</h4>
                  <ul className="space-y-2">
                     {footerLinks.product.map((link, index) => (
                        <li key={index}>
                           <Link
                              href={link.href}
                              className="text-sm text-gray-300 hover:text-white transition-colors">
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Company Links */}
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Company</h4>
                  <ul className="space-y-2">
                     {footerLinks.company.map((link, index) => (
                        <li key={index}>
                           <Link
                              href={link.href}
                              className="text-sm text-gray-300 hover:text-white transition-colors">
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Support Links */}
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Support</h4>
                  <ul className="space-y-2">
                     {footerLinks.support.map((link, index) => (
                        <li key={index}>
                           <Link
                              href={link.href}
                              className="text-sm text-gray-300 hover:text-white transition-colors">
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Resources Links */}
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Resources</h4>
                  <ul className="space-y-2">
                     {footerLinks.resources.map((link, index) => (
                        <li key={index}>
                           <Link
                              href={link.href}
                              className="text-sm text-gray-300 hover:text-white transition-colors">
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
}
