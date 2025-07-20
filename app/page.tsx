export default function Home() {
   return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background via-card to-muted dark:from-background dark:via-card dark:to-muted">
         <div className="container mx-auto px-4 py-16">
            <div className="text-center">
               {/* Logo/Brand */}
               <div className="mb-8">
                  <h1 className="text-4xl md:text-6xl font-bold text-primary bg-clip-text">
                     HealthCoach Pro
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mt-2">
                     Digital Health & Medication Platform
                  </p>
               </div>

               {/* Coming Soon Message */}
               <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                     Coming Soon
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                     We&apos;re building a revolutionary digital health platform
                     that connects patients with qualified coaches for
                     personalized lifestyle guidance and medication management.
                  </p>
               </div>

               {/* Features Preview */}
               <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                     <div className="w-12 h-12 bg-[var(--brand-primary)]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg
                           className="w-6 h-6 text-[var(--brand-primary)]"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-lg font-semibold text-foreground mb-2">
                        Digital Screening
                     </h3>
                     <p className="text-muted-foreground">
                        Comprehensive health questionnaires reviewed by
                        qualified coaches and medical professionals.
                     </p>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                     <div className="w-12 h-12 bg-[var(--brand-accent)]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg
                           className="w-6 h-6 text-[var(--brand-accent)]"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-lg font-semibold text-foreground mb-2">
                        Coach Communication
                     </h3>
                     <p className="text-muted-foreground">
                        Direct messaging with qualified health coaches for
                        personalized guidance and support.
                     </p>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                     <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg
                           className="w-6 h-6 text-secondary-foreground"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                           />
                        </svg>
                     </div>
                     <h3 className="text-lg font-semibold text-foreground mb-2">
                        Medication Management
                     </h3>
                     <p className="text-muted-foreground">
                        Subscription-based medication delivery with real-time
                        tracking and automated refills.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
