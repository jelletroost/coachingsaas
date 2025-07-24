"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
   {
      id: "coaching",
      question: "How does the health coaching work?",
      answer:
         "Our health coaching combines personalized one-on-one sessions with certified health professionals, continuous monitoring, and automated medication management. Your coach creates a custom plan based on your health goals, lifestyle, and medical history, then provides ongoing support and adjustments as needed.",
   },
   {
      id: "qualifications",
      question: "What qualifications do your health coaches have?",
      answer:
         "All our health coaches are certified healthcare professionals with backgrounds in nursing, nutrition, exercise science, or related fields. They undergo rigorous training on our platform and maintain continuing education requirements. Many have specialized certifications in areas like diabetes management, cardiac rehabilitation, or weight management.",
   },
   {
      id: "security",
      question: "How secure is my health information?",
      answer:
         "We take security very seriously. Our platform is HIPAA-compliant and uses enterprise-grade encryption to protect your data. We implement strict access controls, regular security audits, and follow industry best practices for healthcare data protection. Your information is never shared without your explicit consent.",
   },
   {
      id: "family",
      question: "Can I manage multiple family members on one account?",
      answer:
         "Yes! Our family plan allows you to manage multiple family members from a single account. Each person gets their own profile with personalized coaching and medication management, while you can coordinate care and view family health insights through a shared dashboard.",
   },
   {
      id: "medication",
      question: "How does the medication management system work?",
      answer:
         "Our medication management system tracks your prescriptions, sends timely reminders, monitors for drug interactions, and can coordinate with your pharmacy for automatic refills. It integrates with your healthcare providers to ensure accurate medication lists and provides detailed adherence reports.",
   },
   {
      id: "billing",
      question: "What if I need to cancel or change my plan?",
      answer:
         "You can change or cancel your plan at any time with no penalties. Changes take effect immediately, and you'll only be charged for the time you've used. Our customer support team is available 24/7 to help with any account changes or questions.",
   },
];

export default function FAQ() {
   const [openId, setOpenId] = useState<string | null>(null);

   const toggleFAQ = (id: string) => {
      setOpenId(openId === id ? null : id);
   };

   return (
      <section
         id="faq"
         className="py-20 lg:py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
         <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                  Frequently Asked{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                     Questions
                  </span>
               </h2>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Find answers to common questions about our health coaching and
                  medication management platform. Can&apos;t find what
                  you&apos;re looking for? Contact our support team.
               </p>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                     {faqs.slice(0, 3).map((faq) => (
                        <Card
                           key={faq.id}
                           className={`border-2 transition-all duration-300 ${
                              openId === faq.id
                                 ? "border-primary shadow-lg"
                                 : "border-border hover:border-primary/50"
                           }`}>
                           <CardContent className="p-0">
                              <Button
                                 variant="ghost"
                                 className="w-full p-6 text-left hover:bg-transparent focus:bg-transparent"
                                 onClick={() => toggleFAQ(faq.id)}>
                                 <div className="flex items-start justify-between w-full">
                                    <div className="flex items-start gap-4">
                                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                          <HelpCircle className="w-4 h-4 text-primary" />
                                       </div>
                                       <div className="flex-1">
                                          <h3 className="text-lg font-semibold text-foreground text-left">
                                             {faq.question}
                                          </h3>
                                       </div>
                                    </div>
                                    <ChevronDown
                                       className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                                          openId === faq.id ? "rotate-180" : ""
                                       }`}
                                    />
                                 </div>
                              </Button>

                              <div
                                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openId === faq.id
                                       ? "max-h-96 opacity-100"
                                       : "max-h-0 opacity-0"
                                 }`}>
                                 <div className="px-6 pb-6 ml-12">
                                    <div className="border-l-2 border-primary/20 pl-4">
                                       <p className="text-muted-foreground leading-relaxed">
                                          {faq.answer}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
                  <div className="flex-1 space-y-4">
                     {faqs.slice(3).map((faq) => (
                        <Card
                           key={faq.id}
                           className={`border-2 transition-all duration-300 ${
                              openId === faq.id
                                 ? "border-primary shadow-lg"
                                 : "border-border hover:border-primary/50"
                           }`}>
                           <CardContent className="p-0">
                              <Button
                                 variant="ghost"
                                 className="w-full p-6 text-left hover:bg-transparent focus:bg-transparent"
                                 onClick={() => toggleFAQ(faq.id)}>
                                 <div className="flex items-start justify-between w-full">
                                    <div className="flex items-start gap-4">
                                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                          <HelpCircle className="w-4 h-4 text-primary" />
                                       </div>
                                       <div className="flex-1">
                                          <h3 className="text-lg font-semibold text-foreground text-left">
                                             {faq.question}
                                          </h3>
                                       </div>
                                    </div>
                                    <ChevronDown
                                       className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                                          openId === faq.id ? "rotate-180" : ""
                                       }`}
                                    />
                                 </div>
                              </Button>

                              <div
                                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openId === faq.id
                                       ? "max-h-96 opacity-100"
                                       : "max-h-0 opacity-0"
                                 }`}>
                                 <div className="px-6 pb-6 ml-12">
                                    <div className="border-l-2 border-primary/20 pl-4">
                                       <p className="text-muted-foreground leading-relaxed">
                                          {faq.answer}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
