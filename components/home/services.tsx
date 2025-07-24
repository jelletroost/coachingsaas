import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ArrowRight,
   Calendar,
   CheckCircle,
   Heart,
   Pill,
   Shield,
   TrendingUp,
   Users,
} from "lucide-react";
import Link from "next/link";

const services = [
   {
      icon: Heart,
      title: "Personal Health Coaching",
      description:
         "One-on-one coaching sessions with certified health professionals to create personalized wellness plans.",
      features: [
         "Customized health goals",
         "Weekly check-ins",
         "Progress tracking",
         "Lifestyle recommendations",
      ],
      color: "text-red-500",
      bgColor: "bg-red-50",
      href: "/services/coaching",
   },
   {
      icon: Pill,
      title: "Medication Management",
      description:
         "Comprehensive medication tracking, reminders, and automated refill services for optimal adherence.",
      features: [
         "Medication reminders",
         "Dosage tracking",
         "Refill automation",
         "Drug interaction alerts",
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      href: "/services/medication",
   },
   {
      icon: Users,
      title: "Family Care Coordination",
      description:
         "Manage multiple family members' health needs in one centralized platform with shared insights.",
      features: [
         "Family member profiles",
         "Shared health goals",
         "Coordinated care plans",
         "Family health dashboard",
      ],
      color: "text-green-500",
      bgColor: "bg-green-50",
      href: "/services/family",
   },
   {
      icon: Calendar,
      title: "Appointment Scheduling",
      description:
         "Seamless appointment booking with healthcare providers and automated follow-up reminders.",
      features: [
         "Provider directory",
         "Online booking",
         "Reminder notifications",
         "Video consultations",
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      href: "/services/appointments",
   },
   {
      icon: Shield,
      title: "Health Data Security",
      description:
         "HIPAA-compliant platform ensuring your health information is protected with enterprise-grade security.",
      features: [
         "HIPAA compliance",
         "Data encryption",
         "Secure access controls",
         "Privacy protection",
      ],
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      href: "/services/security",
   },
   {
      icon: TrendingUp,
      title: "Health Analytics & Reports",
      description:
         "Advanced analytics and detailed reports to track your health progress and identify trends.",
      features: [
         "Progress tracking",
         "Health insights",
         "Custom reports",
         "Trend analysis",
      ],
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      href: "/services/analytics",
   },
];

export default function Services() {
   return (
      <section
         id="services"
         className="py-20 lg:py-32 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
         <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                  Comprehensive{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                     Health Services
                  </span>
               </h2>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From personalized coaching to automated medication management,
                  we provide everything you need for a healthier, more organized
                  health journey.
               </p>
            </div>

            {/* Main Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
               {services.map((service, index) => (
                  <Card
                     key={index}
                     className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                     <CardHeader className="pb-4">
                        <div
                           className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                           <service.icon
                              className={`w-6 h-6 ${service.color}`}
                           />
                        </div>
                        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                           {service.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                           {service.description}
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-4">
                        <ul className="space-y-2">
                           {service.features.map((feature, featureIndex) => (
                              <li
                                 key={featureIndex}
                                 className="flex items-center text-sm">
                                 <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                 <span className="text-muted-foreground">
                                    {feature}
                                 </span>
                              </li>
                           ))}
                        </ul>

                        <Button
                           asChild
                           variant="outline"
                           className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                           <Link
                              href={service.href}
                              className="flex items-center justify-center">
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                           </Link>
                        </Button>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
}
