import { Apple, Download, Play } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function AppDownload() {
   return (
      <section className="py-20 lg:py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/5">
         <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                  Download Our{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                     Mobile App
                  </span>
               </h2>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Get the full experience on your mobile device. Download our
                  app for iOS and Android to access all features on the go.
               </p>
            </div>

            {/* Download Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               {/* iOS Card */}
               <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-center">
                     <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                        <Apple className="w-9 h-9 text-primary-foreground" />
                     </div>
                     <h3 className="text-2xl font-bold text-foreground mb-2">
                        iOS App
                     </h3>
                     <p className="text-muted-foreground mb-8">
                        Available on the App Store
                     </p>

                     {/* QR Code */}
                     <div className="mb-8">
                        <div className="inline-block p-4 bg-muted rounded-2xl">
                           <div className="w-32 h-32 bg-white rounded-xl border-2 border-border flex items-center justify-center">
                              <QRCodeSVG
                                 value="https://apps.apple.com/app/coach-saas"
                                 size={120}
                                 level="M"
                                 includeMargin={false}
                                 className="rounded-lg"
                              />
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                           Scan to download for iOS
                        </p>
                     </div>

                     {/* Download Button */}
                     <button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 group">
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>Download for iOS</span>
                     </button>

                     <p className="text-xs text-muted-foreground mt-4">
                        iOS 12.0 or later required
                     </p>
                  </div>
               </div>

               {/* Android Card */}
               <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-center">
                     <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6">
                        <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                     </div>
                     <h3 className="text-2xl font-bold text-foreground mb-2">
                        Android App
                     </h3>
                     <p className="text-muted-foreground mb-8">
                        Get it on Google Play
                     </p>

                     {/* QR Code */}
                     <div className="mb-8">
                        <div className="inline-block p-4 bg-muted rounded-2xl">
                           <div className="w-32 h-32 bg-white rounded-xl border-2 border-border flex items-center justify-center">
                              <QRCodeSVG
                                 value="https://play.google.com/store/apps/details?id=com.coachsaas.app"
                                 size={120}
                                 level="M"
                                 includeMargin={false}
                                 className="rounded-lg"
                              />
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                           Scan to download for Android
                        </p>
                     </div>

                     {/* Download Button */}
                     <button className="w-full cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 group">
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>Download for Android</span>
                     </button>

                     <p className="text-xs text-muted-foreground mt-4">
                        Android 6.0 or later required
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
