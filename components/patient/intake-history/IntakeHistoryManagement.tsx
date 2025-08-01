"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   CheckCircle,
   Clock,
   Download,
   Eye,
   FileText,
   Search,
   User,
} from "lucide-react";
import { useState } from "react";
import { intakeHistoryData, intakeHistoryStatsData } from "./mockData";

export function IntakeHistoryManagement() {
   const [activeTab, setActiveTab] = useState("all");
   const [searchTerm, setSearchTerm] = useState("");

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
      });
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case "completed":
            return "bg-green-100 text-green-800";
         case "in_progress":
            return "bg-blue-100 text-blue-800";
         case "requires_followup":
            return "bg-yellow-100 text-yellow-800";
         case "pending":
            return "bg-gray-100 text-gray-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case "completed":
            return CheckCircle;
         case "in_progress":
            return Clock;
         case "requires_followup":
            return User;
         case "pending":
            return FileText;
         default:
            return FileText;
      }
   };

   const getQuestionnaireTypeLabel = (type: string) => {
      switch (type) {
         case "initial":
            return "Initial Assessment";
         case "follow_up":
            return "Follow-up";
         case "assessment":
            return "Progress Assessment";
         case "screening":
            return "Health Screening";
         default:
            return type;
      }
   };

   const filteredIntakes = intakeHistoryData.filter((intake) => {
      const matchesSearch =
         intake.intakeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
         intake.assignedCoach
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
         intake.healthConcerns.some((concern) =>
            concern.toLowerCase().includes(searchTerm.toLowerCase())
         );
      const matchesTab = activeTab === "all" || intake.status === activeTab;
      return matchesSearch && matchesTab;
   });

   return (
      <div className="space-y-6">
         {/* Intake History Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {intakeHistoryStatsData.map((stat, index) => (
               <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        {stat.title}
                     </CardTitle>
                     <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{stat.value}</div>
                     <p className="text-xs text-muted-foreground">
                        {stat.description}
                     </p>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Search and Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="Search intakes by number, coach, or health concerns..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                     />
                  </div>
                  <Button variant="outline">
                     <Download className="h-4 w-4 mr-2" />
                     Export History
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Intake History Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
               <TabsTrigger value="all">All Intakes</TabsTrigger>
               <TabsTrigger value="completed">Completed</TabsTrigger>
               <TabsTrigger value="in_progress">In Progress</TabsTrigger>
               <TabsTrigger value="requires_followup">Follow-ups</TabsTrigger>
               <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
               {filteredIntakes.length === 0 ? (
                  <Card>
                     <CardContent className="pt-6">
                        <div className="text-center py-8">
                           <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                           <h3 className="text-lg font-medium mb-2">
                              No intakes found
                           </h3>
                           <p className="text-muted-foreground">
                              {searchTerm
                                 ? "Try adjusting your search terms"
                                 : "You haven't submitted any intake forms yet"}
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               ) : (
                  <div className="space-y-4">
                     {filteredIntakes.map((intake) => {
                        const StatusIcon = getStatusIcon(intake.status);
                        return (
                           <Card key={intake.id}>
                              <CardContent className="pt-6">
                                 <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                       <div className="flex items-center justify-between mb-4">
                                          <div>
                                             <h3 className="font-medium">
                                                {intake.intakeNumber}
                                             </h3>
                                             <p className="text-sm text-muted-foreground">
                                                Submitted on{" "}
                                                {formatDate(
                                                   intake.submittedDate
                                                )}
                                             </p>
                                             <p className="text-sm text-muted-foreground">
                                                Type:{" "}
                                                {getQuestionnaireTypeLabel(
                                                   intake.questionnaireType
                                                )}
                                             </p>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             <Badge
                                                className={getStatusColor(
                                                   intake.status
                                                )}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {intake.status.replace(
                                                   "_",
                                                   " "
                                                )}
                                             </Badge>
                                             <Button
                                                variant="outline"
                                                size="sm">
                                                <Eye className="h-4 w-4" />
                                             </Button>
                                          </div>
                                       </div>

                                       <div className="space-y-4">
                                          {/* Coach Information */}
                                          <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-muted-foreground" />
                                             </div>
                                             <div>
                                                <p className="font-medium">
                                                   {intake.assignedCoach}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                   Assigned Coach
                                                </p>
                                             </div>
                                          </div>

                                          {/* Health Concerns */}
                                          <div className="space-y-2">
                                             <h4 className="text-sm font-medium">
                                                Health Concerns
                                             </h4>
                                             <div className="flex flex-wrap gap-2">
                                                {intake.healthConcerns.map(
                                                   (concern, index) => (
                                                      <Badge
                                                         key={index}
                                                         variant="secondary"
                                                         className="text-xs">
                                                         {concern}
                                                      </Badge>
                                                   )
                                                )}
                                             </div>
                                          </div>

                                          {/* Goals */}
                                          <div className="space-y-2">
                                             <h4 className="text-sm font-medium">
                                                Goals
                                             </h4>
                                             <div className="flex flex-wrap gap-2">
                                                {intake.goals.map(
                                                   (goal, index) => (
                                                      <Badge
                                                         key={index}
                                                         variant="outline"
                                                         className="text-xs">
                                                         {goal}
                                                      </Badge>
                                                   )
                                                )}
                                             </div>
                                          </div>

                                          {/* Recommendations */}
                                          {intake.recommendations.length >
                                             0 && (
                                             <div className="space-y-2">
                                                <h4 className="text-sm font-medium">
                                                   Recommendations
                                                </h4>
                                                <ul className="space-y-1">
                                                   {intake.recommendations.map(
                                                      (rec, index) => (
                                                         <li
                                                            key={index}
                                                            className="text-sm text-muted-foreground flex items-start">
                                                            <span className="text-green-500 mr-2">
                                                               •
                                                            </span>
                                                            {rec}
                                                         </li>
                                                      )
                                                   )}
                                                </ul>
                                             </div>
                                          )}

                                          {/* Notes */}
                                          {intake.notes && (
                                             <div className="space-y-2">
                                                <h4 className="text-sm font-medium">
                                                   Coach Notes
                                                </h4>
                                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                                   {intake.notes}
                                                </p>
                                             </div>
                                          )}
                                       </div>

                                       <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                          <div className="space-y-1">
                                             {intake.reviewDate && (
                                                <p className="text-sm text-muted-foreground">
                                                   Reviewed:{" "}
                                                   {formatDate(
                                                      intake.reviewDate
                                                   )}
                                                </p>
                                             )}
                                             {intake.completionDate && (
                                                <p className="text-sm text-muted-foreground">
                                                   Completed:{" "}
                                                   {formatDate(
                                                      intake.completionDate
                                                   )}
                                                </p>
                                             )}
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             <Button
                                                variant="outline"
                                                size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                             </Button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        );
                     })}
                  </div>
               )}
            </TabsContent>
         </Tabs>
      </div>
   );
}
