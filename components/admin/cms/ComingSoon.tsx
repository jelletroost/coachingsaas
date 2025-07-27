"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
   Calendar,
   Edit,
   Globe,
   Search,
   Upload,
   Users,
   Zap,
} from "lucide-react";

export function ComingSoon() {
   return (
      <div className="space-y-8">
         <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-8 pb-8">
               <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                     <Zap className="h-6 w-6 text-yellow-600" />
                     <h2 className="text-2xl font-semibold text-gray-800">
                        Powerful Features Coming Soon
                     </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Edit className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">
                           Rich Text Editor
                        </span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Search className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">
                           Advanced Search
                        </span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Upload className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium">
                           Drag & Drop Upload
                        </span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <span className="text-sm font-medium">
                           Scheduled Publishing
                        </span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Users className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm font-medium">
                           Team Collaboration
                        </span>
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <Globe className="h-5 w-5 text-teal-600" />
                        <span className="text-sm font-medium">
                           SEO Optimization
                        </span>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
