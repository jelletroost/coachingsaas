import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   AlertCircle,
   CheckCircle,
   Clock,
   FileText,
   User,
   XCircle,
} from "lucide-react";
import { type IntakeForm } from "./mockData";

interface IntakeTableProps {
   intakes: IntakeForm[];
   onViewDetails: (intake: IntakeForm) => void;
   onApprove: (intake: IntakeForm) => void;
   onReject: (intake: IntakeForm) => void;
   onRequireFollowup: (intake: IntakeForm) => void;
}

const getStatusColor = (status: IntakeForm["status"]) => {
   switch (status) {
      case "pending":
         return "bg-yellow-100 text-yellow-800";
      case "reviewed":
         return "bg-blue-100 text-blue-800";
      case "approved":
         return "bg-green-100 text-green-800";
      case "rejected":
         return "bg-red-100 text-red-800";
      case "requires_followup":
         return "bg-orange-100 text-orange-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

const getPriorityColor = (priority: IntakeForm["priority"]) => {
   switch (priority) {
      case "urgent":
         return "bg-red-100 text-red-800";
      case "high":
         return "bg-orange-100 text-orange-800";
      case "medium":
         return "bg-yellow-100 text-yellow-800";
      case "low":
         return "bg-green-100 text-green-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

const getStatusIcon = (status: IntakeForm["status"]) => {
   switch (status) {
      case "pending":
         return Clock;
      case "reviewed":
         return FileText;
      case "approved":
         return CheckCircle;
      case "rejected":
         return XCircle;
      case "requires_followup":
         return AlertCircle;
      default:
         return Clock;
   }
};

export function IntakeTable({ intakes, onViewDetails }: IntakeTableProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg font-semibold">
               Intake Forms ({intakes.length})
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {intakes.length === 0 ? (
                  <div className="text-center py-8">
                     <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                     <p className="text-muted-foreground">
                        No intake forms found matching your filters
                     </p>
                  </div>
               ) : (
                  intakes.map((intake) => {
                     const StatusIcon = getStatusIcon(intake.status);
                     return (
                        <div
                           key={intake.id}
                           className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                           {/* Avatar and Patient Info */}
                           <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <Avatar className="w-12 h-12">
                                 <AvatarFallback className="text-sm">
                                    {intake.patientName
                                       .split(" ")
                                       .map((n) => n[0])
                                       .join("")}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                 <h3 className="text-sm font-medium text-foreground truncate">
                                    {intake.patientName}
                                 </h3>
                                 <p className="text-xs text-muted-foreground truncate">
                                    {intake.patientEmail}
                                 </p>
                                 <p className="text-xs text-muted-foreground">
                                    ID: {intake.id}
                                 </p>
                              </div>
                           </div>

                           {/* Status */}
                           <div className="hidden sm:block">
                              <Badge
                                 variant="secondary"
                                 className={getStatusColor(intake.status)}>
                                 <StatusIcon className="w-3 h-3 mr-1" />
                                 {intake.status.replace("_", " ")}
                              </Badge>
                           </div>

                           {/* Priority */}
                           <div className="hidden md:block">
                              <Badge
                                 variant="outline"
                                 className={getPriorityColor(intake.priority)}>
                                 {intake.priority}
                              </Badge>
                           </div>

                           {/* Questionnaire Type */}
                           <div className="hidden lg:block">
                              <span className="text-xs text-muted-foreground capitalize">
                                 {intake.questionnaireType.replace("_", " ")}
                              </span>
                           </div>

                           {/* Submitted Date */}
                           <div className="hidden xl:block">
                              <span className="text-xs text-muted-foreground">
                                 {new Date(
                                    intake.submittedDate
                                 ).toLocaleDateString()}
                              </span>
                           </div>

                           {/* Health Concerns Count */}
                           <div className="hidden lg:block">
                              <div className="text-xs text-muted-foreground">
                                 <span className="font-medium">
                                    {intake.healthConcerns.length}
                                 </span>{" "}
                                 concerns
                              </div>
                           </div>

                           {/* Actions */}
                           <div className="flex items-center space-x-2">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => onViewDetails(intake)}>
                                 <User className="w-4 h-4 mr-1" />
                                 Review
                              </Button>
                           </div>
                        </div>
                     );
                  })
               )}
            </div>
         </CardContent>
      </Card>
   );
}
