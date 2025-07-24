"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
   {
      name: "Sarah Johnson",
      role: "Patient",
      age: 45,
      condition: "Diabetes Management",
      avatar: "SJ",
      rating: 5,
      testimonial:
         "This platform completely transformed my health journey. My coach helped me develop a sustainable routine, and the medication reminders are a lifesaver. I've never felt more in control of my health.",
      improvement: "A1C reduced from 8.2 to 6.1 in 6 months",
      duration: "6 months",
      category: "success",
   },
   {
      name: "Michael Chen",
      role: "Patient",
      age: 52,
      condition: "Hypertension",
      avatar: "MC",
      rating: 5,
      testimonial:
         "The personalized coaching sessions and medication management have been incredible. My blood pressure is now consistently in the normal range, and I feel more energetic than ever.",
      improvement: "Blood pressure stabilized at 120/80",
      duration: "4 months",
      category: "success",
   },
   {
      name: "Dr. Emily Rodriguez",
      role: "Healthcare Coach",
      age: 38,
      condition: "Platform User",
      avatar: "ER",
      rating: 5,
      testimonial:
         "As a health coach, this platform has revolutionized how I work with patients. The analytics and tracking features help me provide more targeted, effective care. My patients are seeing better results.",
      improvement: "Patient engagement increased by 85%",
      duration: "1 year",
      category: "coach",
   },
   {
      name: "David Thompson",
      role: "Patient",
      age: 61,
      condition: "Multiple Medications",
      avatar: "DT",
      rating: 5,
      testimonial:
         "Managing multiple medications was overwhelming until I found this platform. The automated refills and interaction alerts give me peace of mind. My family can also track my progress.",
      improvement: "Medication adherence improved to 98%",
      duration: "8 months",
      category: "success",
   },
   {
      name: "Lisa Park",
      role: "Patient",
      age: 34,
      condition: "Weight Management",
      avatar: "LP",
      rating: 5,
      testimonial:
         "The combination of coaching and medication management helped me achieve my health goals sustainably. My coach understood my lifestyle and created a plan that actually works for me.",
      improvement: "Lost 25 pounds and maintained for 1 year",
      duration: "1 year",
      category: "success",
   },
   {
      name: "Robert Williams",
      role: "Family Caregiver",
      age: 48,
      condition: "Managing Family Health",
      avatar: "RW",
      rating: 5,
      testimonial:
         "Managing my elderly parents' medications and appointments was a full-time job. This platform streamlined everything and gave us all peace of mind. The family coordination features are invaluable.",
      improvement: "Reduced medication errors by 90%",
      duration: "10 months",
      category: "family",
   },
];

export default function Testimonials() {
   return (
      <section
         id="testimonials"
         className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
         <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                  Success Stories &{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                     Testimonials
                  </span>
               </h2>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Real stories from real people who have transformed their
                  health with our platform. See how personalized coaching and
                  medication management can change lives.
               </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative">
               {/* Custom Navigation Buttons */}
               <div className="hidden lg:block">
                  <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                     <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                     <ChevronRight className="w-6 h-6" />
                  </button>
               </div>

               <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                     640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                     },
                     1024: {
                        slidesPerView: 3,
                        spaceBetween: 32,
                     },
                  }}
                  navigation={{
                     nextEl: ".swiper-button-next-custom",
                     prevEl: ".swiper-button-prev-custom",
                  }}
                  pagination={{
                     clickable: true,
                     el: ".swiper-pagination-custom",
                  }}
                  autoplay={{
                     delay: 5000,
                     disableOnInteraction: false,
                  }}
                  loop={true}
                  className="testimonials-swiper">
                  {testimonials.map((testimonial, index) => (
                     <SwiperSlide key={index}>
                        <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                           <CardContent className="p-6">
                              {/* Quote Icon */}
                              <div className="flex justify-between items-start mb-4">
                                 <Quote className="w-8 h-8 text-primary/30" />
                                 <div className="flex">
                                    {[...Array(testimonial.rating)].map(
                                       (_, i) => (
                                          <Star
                                             key={i}
                                             className="w-4 h-4 text-yellow-400 fill-current"
                                          />
                                       )
                                    )}
                                 </div>
                              </div>

                              {/* Testimonial Text */}
                              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                                 &ldquo;{testimonial.testimonial}&rdquo;
                              </blockquote>

                              {/* Improvement Highlight */}
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                                 <div className="text-sm font-semibold text-green-800 mb-1">
                                    Key Improvement:
                                 </div>
                                 <div className="text-sm text-green-700">
                                    {testimonial.improvement}
                                 </div>
                              </div>

                              {/* Customer Info */}
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                       <span className="text-sm font-semibold text-primary">
                                          {testimonial.avatar}
                                       </span>
                                    </div>
                                    <div>
                                       <div className="font-semibold text-foreground">
                                          {testimonial.name}
                                       </div>
                                       <div className="text-sm text-muted-foreground">
                                          {testimonial.role} • {testimonial.age}{" "}
                                          years old
                                       </div>
                                       <div className="text-xs text-muted-foreground">
                                          {testimonial.condition}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-sm font-medium text-foreground">
                                       {testimonial.duration}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                       on platform
                                    </div>
                                 </div>
                              </div>

                              {/* Category Badge */}
                              <div className="mt-4">
                                 <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                       testimonial.category === "success"
                                          ? "bg-green-100 text-green-800"
                                          : testimonial.category === "coach"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-purple-100 text-purple-800"
                                    }`}>
                                    {testimonial.category === "success"
                                       ? "Health Success"
                                       : testimonial.category === "coach"
                                       ? "Coach Experience"
                                       : "Family Care"}
                                 </span>
                              </div>
                           </CardContent>
                        </Card>
                     </SwiperSlide>
                  ))}
               </Swiper>

               {/* Custom Pagination */}
               <div className="swiper-pagination-custom flex justify-center mt-8"></div>
            </div>
         </div>

         <style
            dangerouslySetInnerHTML={{
               __html: `
               .testimonials-swiper .swiper-slide {
                  height: auto;
               }
                  .swiper-button-prev-custom:hover,
                  .swiper-button-next-custom:hover {
                     transform: none !important;
                  }
               
               .swiper-pagination-custom .swiper-pagination-bullet {
                  width: 12px;
                  height: 12px;
                  background: #e5e7eb;
                  opacity: 1;
                  margin: 0 4px;
               }
               
               .swiper-pagination-custom .swiper-pagination-bullet-active {
                  background: #2563eb;
                  transform: scale(1.2);
               }
               
               .swiper-button-prev-custom,
               .swiper-button-next-custom {
                  transition: all 0.3s ease;
               }
               
               .swiper-button-prev-custom:hover,
               .swiper-button-next-custom:hover {
                  transform: translateY(-50%) scale(1.1);
               }
            `,
            }}
         />
      </section>
   );
}
