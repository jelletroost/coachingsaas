import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Check, Shield, Star, Users, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
   {
      name: "Basic",
      price: "$29",
      period: "per month",
      description: "Essential medication management for individuals",
      features: [
         "Medication reminders",
         "Basic health tracking",
         "Email support",
         "Mobile app access",
         "Medication history",
         "Basic reports",
      ],
      icon: Shield,
      popular: false,
      cta: "Get Started",
      href: "/signup?plan=basic",
   },
   {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Complete health coaching with medication management",
      features: [
         "Everything in Basic",
         "Personal health coach",
         "Weekly coaching sessions",
         "Custom health plans",
         "Priority support",
         "Advanced analytics",
         "Medication delivery",
         "Insurance coordination",
      ],
      icon: Users,
      popular: true,
      cta: "Start Free Trial",
      href: "/signup?plan=professional",
   },
   {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "Comprehensive care for families and groups",
      features: [
         "Everything in Professional",
         "Family member management",
         "Group coaching sessions",
         "Custom integrations",
         "Dedicated support manager",
         "Advanced reporting",
         "API access",
         "White-label options",
      ],
      icon: Zap,
      popular: false,
      cta: "Contact Sales",
      href: "/contact?plan=enterprise",
   },
];

export default function Pricing() {
   return (
      <section
         id="pricing"
         className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
         <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                  Simple, Transparent{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                     Pricing
                  </span>
               </h2>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Choose the perfect plan for your health journey. All plans
                  include a 14-day free trial and can be cancelled anytime.
               </p>
            </div>

            {/* Main Plans */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
               {plans.map((plan, index) => (
                  <Card
                     key={index}
                     className={`relative h-full border-2 transition-all duration-300 hover:shadow-lg ${
                        plan.popular
                           ? "border-primary shadow-lg scale-105"
                           : "border-border hover:border-primary/50"
                     }`}>
                     {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                           <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              Most Popular
                           </div>
                        </div>
                     )}

                     <CardHeader className="text-center pb-6">
                        <div className="flex justify-center mb-4">
                           <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                 plan.popular
                                    ? "bg-primary/10"
                                    : "bg-secondary/10"
                              }`}>
                              <plan.icon
                                 className={`w-6 h-6 ${
                                    plan.popular
                                       ? "text-primary"
                                       : "text-secondary"
                                 }`}
                              />
                           </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">
                           {plan.name}
                        </CardTitle>
                        <CardDescription className="text-base">
                           {plan.description}
                        </CardDescription>

                        <div className="mt-6">
                           <div className="flex items-baseline justify-center">
                              <span className="text-4xl font-bold text-foreground">
                                 {plan.price}
                              </span>
                              <span className="text-muted-foreground ml-1">
                                 {plan.period}
                              </span>
                           </div>
                        </div>
                     </CardHeader>

                     <CardContent className="space-y-6">
                        <ul className="space-y-3">
                           {plan.features.map((feature, featureIndex) => (
                              <li
                                 key={featureIndex}
                                 className="flex items-center text-sm">
                                 <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                 <span className="text-muted-foreground">
                                    {feature}
                                 </span>
                              </li>
                           ))}
                        </ul>

                        <Button
                           asChild
                           className={`w-full ${
                              plan.popular
                                 ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                 : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                           }`}>
                           <Link href={plan.href}>{plan.cta}</Link>
                        </Button>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
}
