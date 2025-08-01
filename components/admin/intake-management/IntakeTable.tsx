"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
   CheckCircle,
   Eye,
   MoreHorizontal,
   UserCheck,
   XCircle,
} from "lucide-react";
import { type IntakeRecord } from "./mockData";

interface IntakeTableProps {
   intakes: IntakeRecord[];
   onViewDetails: (intake: IntakeRecord) => void;
   onApproveIntake: (intake: IntakeRecord) => void;
   onRejectIntake: (intake: IntakeRecord) => void;
   onAssignCoach: (intake: IntakeRecord, coach: string) => void;
   coaches: string[];
}

const getStatusBadge = (status: IntakeRecord["status"]) => {
   const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      under_review: "bg-blue-100 text-blue-800",
   };

   const labels = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      under_review: "Under Review",
   };

   return <Badge className={variants[status]}>{labels[status]}</Badge>;
};

const getPriorityBadge = (priority: IntakeRecord["priority"]) => {
   const variants = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
   };

   return (
      <Badge className={variants[priority]}>
         {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
   );
};

const getQuestionnaireTypeBadge = (type: IntakeRecord["questionnaireType"]) => {
   const variants = {
      initial: "bg-purple-100 text-purple-800",
      follow_up: "bg-indigo-100 text-indigo-800",
      assessment: "bg-teal-100 text-teal-800",
   };

   const labels = {
      initial: "Initial",
      follow_up: "Follow-up",
      assessment: "Assessment",
   };

   return <Badge className={variants[type]}>{labels[type]}</Badge>;
};

export function IntakeTable({
   intakes,
   onViewDetails,
   onApproveIntake,
   onRejectIntake,
}: // onAssignCoach,
// coaches,
IntakeTableProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Intake Records ({intakes.length})</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="border-b">
                        <th className="text-left p-2 font-medium">ID</th>
                        <th className="text-left p-2 font-medium">Patient</th>
                        <th className="text-left p-2 font-medium">Type</th>
                        <th className="text-left p-2 font-medium">Status</th>
                        <th className="text-left p-2 font-medium">Priority</th>
                        <th className="text-left p-2 font-medium">Submitted</th>
                        <th className="text-left p-2 font-medium">Coach</th>
                        <th className="text-left p-2 font-medium">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {intakes.map((intake) => (
                        <tr
                           key={intake.id}
                           className="border-b hover:bg-gray-50">
                           <td className="p-2 font-mono text-sm">
                              {intake.id}
                           </td>
                           <td className="p-2">
                              <div>
                                 <div className="font-medium">
                                    {intake.patientName}
                                 </div>
                                 <div className="text-sm text-muted-foreground">
                                    {intake.patientEmail}
                                 </div>
                              </div>
                           </td>
                           <td className="p-2">
                              {getQuestionnaireTypeBadge(
                                 intake.questionnaireType
                              )}
                           </td>
                           <td className="p-2">
                              {getStatusBadge(intake.status)}
                           </td>
                           <td className="p-2">
                              {getPriorityBadge(intake.priority)}
                           </td>
                           <td className="p-2 text-sm">
                              {format(
                                 new Date(intake.submittedDate),
                                 "MMM dd, yyyy"
                              )}
                           </td>
                           <td className="p-2">
                              {intake.assignedCoach ? (
                                 <span className="text-sm">
                                    {intake.assignedCoach}
                                 </span>
                              ) : (
                                 <span className="text-sm text-muted-foreground">
                                    Unassigned
                                 </span>
                              )}
                           </td>
                           <td className="p-2">
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                       <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                       onClick={() => onViewDetails(intake)}>
                                       <Eye className="h-4 w-4 mr-2" />
                                       View Details
                                    </DropdownMenuItem>

                                    {intake.status === "pending" && (
                                       <>
                                          <DropdownMenuItem
                                             onClick={() =>
                                                onApproveIntake(intake)
                                             }>
                                             <CheckCircle className="h-4 w-4 mr-2" />
                                             Approve
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                             onClick={() =>
                                                onRejectIntake(intake)
                                             }>
                                             <XCircle className="h-4 w-4 mr-2" />
                                             Reject
                                          </DropdownMenuItem>
                                       </>
                                    )}

                                    <DropdownMenuItem>
                                       <UserCheck className="h-4 w-4 mr-2" />
                                       Assign Coach
                                    </DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               {intakes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                     No intake records found matching your filters.
                  </div>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
