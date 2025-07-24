"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Play, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function AppDownload() {
   return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
               <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-8 lg:p-12">
                     <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Content Side */}
                        <div className="space-y-6">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                 <Smartphone className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-primary">
                                 Mobile App
                              </span>
                           </div>

                           <div>
                              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                                 Download Our App
                              </h2>
                              <p className="text-muted-foreground leading-relaxed">
                                 Get instant access to your health coach,
                                 medication reminders, and progress tracking on
                                 your mobile device.
                              </p>
                           </div>

                           {/* Download Buttons */}
                           <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                 asChild
                                 size="lg"
                                 className="bg-black hover:bg-black/90 text-white">
                                 <a
                                    href="#"
                                    className="flex items-center gap-2">
                                    <Apple className="w-4 h-4" />
                                    <span>App Store</span>
                                 </a>
                              </Button>

                              <Button asChild size="lg" variant="outline">
                                 <a
                                    href="#"
                                    className="flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    <span>Google Play</span>
                                 </a>
                              </Button>
                           </div>

                           {/* Trust Indicators */}
                           <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>⭐ 4.9/5</span>
                              <span>•</span>
                              <span>10K+ downloads</span>
                              <span>•</span>
                              <span>Free</span>
                           </div>
                        </div>

                        {/* QR Code Side */}
                        <div className="flex justify-center lg:justify-end">
                           <div className="text-center space-y-4">
                              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                                 <QRCodeSVG
                                    value="https://apps.apple.com/app/coach-saas"
                                    size={160}
                                    level="M"
                                    includeMargin={true}
                                 />
                              </div>
                              <div className="space-y-2">
                                 <p className="text-sm font-medium text-foreground">
                                    Scan to download
                                 </p>
                                 <p className="text-xs text-muted-foreground">
                                    Works on iOS and Android
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>
   );
}
