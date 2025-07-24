import { Card, CardContent } from "@/components/ui/card";
import {
   Calendar,
   CheckCircle,
   ClipboardList,
   MessageSquare,
   Package,
   TrendingUp,
   UserPlus,
} from "lucide-react";

const steps = [
   {
      icon: UserPlus,
      title: "Sign Up & Assessment",
      description:
         "Create your account and complete a comprehensive health assessment to understand your needs and goals.",
      features: [
         "Personalized health profile",
         "Goal setting",
         "Medical history review",
      ],
   },
   {
      icon: ClipboardList,
      title: "Get Your Custom Plan",
      description:
         "Receive a tailored health and medication management plan designed specifically for your unique situation.",
      features: [
         "Customized medication schedule",
         "Lifestyle recommendations",
         "Progress tracking",
      ],
   },
   {
      icon: MessageSquare,
      title: "Connect with Your Coach",
      description:
         "Get matched with a certified health coach who will guide you through your journey and provide ongoing support.",
      features: [
         "One-on-one coaching sessions",
         "24/7 chat support",
         "Regular check-ins",
      ],
   },
   {
      icon: Calendar,
      title: "Track & Monitor",
      description:
         "Use our intuitive platform to track your medication adherence, health metrics, and overall progress.",
      features: [
         "Medication reminders",
         "Health data tracking",
         "Progress reports",
      ],
   },
   {
      icon: Package,
      title: "Automated Refills",
      description:
         "Never run out of medication again with our automated prescription refill and delivery system.",
      features: [
         "Automatic refill scheduling",
         "Home delivery",
         "Insurance coordination",
      ],
   },
   {
      icon: TrendingUp,
      title: "Achieve Your Goals",
      description:
         "See real improvements in your health outcomes with continuous support and data-driven insights.",
      features: [
         "Health improvements",
         "Goal achievement",
         "Long-term success",
      ],
   },
];

export default function HowWork() {
   return (
      <section
         id="how-it-works"
         className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
         <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                  How It{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                     Works
                  </span>
               </h2>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Your journey to better health starts here. Follow these simple
                  steps to get personalized care, professional coaching, and
                  automated medication management.
               </p>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
               {steps.map((step, index) => (
                  <div key={index}>
                     <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                        <CardContent className="p-6">
                           {/* Step Number */}
                           <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                 <step.icon className="w-6 h-6 text-primary" />
                              </div>
                              <span className="text-2xl font-bold text-muted-foreground/50">
                                 {String(index + 1).padStart(2, "0")}
                              </span>
                           </div>

                           {/* Content */}
                           <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {step.title}
                           </h3>
                           <p className="text-muted-foreground mb-4 leading-relaxed">
                              {step.description}
                           </p>

                           {/* Features List */}
                           <ul className="space-y-2">
                              {step.features.map((feature, featureIndex) => (
                                 <li
                                    key={featureIndex}
                                    className="flex items-center text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                    {feature}
                                 </li>
                              ))}
                           </ul>
                        </CardContent>
                     </Card>
                  </div>
               ))}
            </div>
         </div>

         {/* Background Pattern */}
         <div className="absolute inset-0 -z-10 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,78,78,0.1)_25%,rgba(0,78,78,0.1)_50%,transparent_50%,transparent_75%,rgba(0,78,78,0.1)_75%)] bg-[length:20px_20px]"></div>
         </div>
      </section>
   );
}
