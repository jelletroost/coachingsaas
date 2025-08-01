import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
   AlertCircle,
   CheckCircle,
   FileText,
   Phone,
   User,
   XCircle,
} from "lucide-react";
import { useState } from "react";
import { type IntakeForm } from "./mockData";

interface IntakeDetailsModalProps {
   intake: IntakeForm;
   isOpen: boolean;
   onClose: () => void;
   onApprove: () => void;
   onReject: () => void;
   onRequireFollowup: () => void;
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

const quickInfo = [
   {
      label: "Intake ID",
      value: "INT-001",
   },
   {
      label: "Submitted",
      value: "2024-01-20",
   },
   {
      label: "Type",
      value: "Initial",
   },
];

export function IntakeDetailsModal({
   intake,
   isOpen,
   onClose,
   onApprove,
   onReject,
   onRequireFollowup,
}: IntakeDetailsModalProps) {
   const [reviewNotes, setReviewNotes] = useState(intake.reviewNotes || "");

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                     <AvatarFallback className="text-lg">
                        {intake.patientName
                           .split(" ")
                           .map((n) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <h2 className="text-xl font-semibold">
                        {intake.patientName}
                     </h2>
                     <p className="text-sm text-muted-foreground">
                        {intake.patientEmail}
                     </p>
                     <div className="flex items-center space-x-2 mt-1">
                        <Badge
                           variant="secondary"
                           className={getStatusColor(intake.status)}>
                           {intake.status.replace("_", " ")}
                        </Badge>
                        <Badge
                           variant="outline"
                           className={getPriorityColor(intake.priority)}>
                           {intake.priority} Priority
                        </Badge>
                     </div>
                  </div>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
               {/* Quick Info */}
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickInfo.map((info) => (
                     <Card key={info.label}>
                        <CardContent className="p-4">
                           <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium">
                                 {info.label}
                              </span>
                           </div>
                           <div className="text-lg font-bold mt-1">
                              {info.value}
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>

               <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                     <TabsTrigger value="overview">Overview</TabsTrigger>
                     <TabsTrigger value="submitted-data">
                        Submitted Data
                     </TabsTrigger>
                     <TabsTrigger value="goals">Goals</TabsTrigger>
                     <TabsTrigger value="review">Review</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Patient Information
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Patient ID
                                 </label>
                                 <p className="mt-1">{intake.patientId}</p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Assigned Coach
                                 </label>
                                 <p className="mt-1">
                                    {intake.assignedCoach || "Not assigned"}
                                 </p>
                              </div>
                           </div>

                           <Separator />

                           <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                 Emergency Contact
                              </label>
                              <div className="mt-2 p-3 border rounded-lg">
                                 <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">
                                       {intake.emergencyContact.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                       ({intake.emergencyContact.relationship})
                                    </span>
                                 </div>
                                 <div className="flex items-center space-x-2 mt-1">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span>{intake.emergencyContact.phone}</span>
                                 </div>
                              </div>
                           </div>

                           {intake.insuranceInfo && (
                              <>
                                 <Separator />
                                 <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                       Insurance Information
                                    </label>
                                    <div className="mt-2 p-3 border rounded-lg">
                                       <p>
                                          <strong>Provider:</strong>{" "}
                                          {intake.insuranceInfo.provider}
                                       </p>
                                       <p>
                                          <strong>Policy:</strong>{" "}
                                          {intake.insuranceInfo.policyNumber}
                                       </p>
                                       {intake.insuranceInfo.groupNumber && (
                                          <p>
                                             <strong>Group:</strong>{" "}
                                             {intake.insuranceInfo.groupNumber}
                                          </p>
                                       )}
                                    </div>
                                 </div>
                              </>
                           )}
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="submitted-data" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Submitted Data
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Exercise
                                 </label>
                                 <p className="mt-1">
                                    {intake.lifestyleFactors.exercise}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Diet
                                 </label>
                                 <p className="mt-1">
                                    {intake.lifestyleFactors.diet}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Sleep
                                 </label>
                                 <p className="mt-1">
                                    {intake.lifestyleFactors.sleep}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Stress Level
                                 </label>
                                 <p className="mt-1">
                                    {intake.lifestyleFactors.stress}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Smoking
                                 </label>
                                 <p className="mt-1">
                                    {intake.lifestyleFactors.smoking}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Alcohol
                                 </label>
                                 <p className="mt-1">
                                    {intake.lifestyleFactors.alcohol}
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="goals" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Health Goals
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-3">
                              {intake.goals.map((goal, index) => (
                                 <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="flex-1">{goal}</span>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="review" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Review & Actions
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                 Review Notes
                              </label>
                              <Textarea
                                 placeholder="Add your review notes here..."
                                 value={reviewNotes}
                                 onChange={(e) =>
                                    setReviewNotes(e.target.value)
                                 }
                                 className="mt-2"
                                 rows={4}
                              />
                           </div>

                           {intake.status === "pending" && (
                              <div className="flex space-x-2">
                                 <Button onClick={onApprove} className="flex-1">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                 </Button>
                                 <Button
                                    variant="outline"
                                    onClick={onRequireFollowup}
                                    className="flex-1">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    Require Follow-up
                                 </Button>
                                 <Button
                                    variant="destructive"
                                    onClick={onReject}
                                    className="flex-1">
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                 </Button>
                              </div>
                           )}

                           {intake.followUpActions &&
                              intake.followUpActions.length > 0 && (
                                 <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                       Follow-up Actions
                                    </label>
                                    <div className="mt-2 space-y-1">
                                       {intake.followUpActions.map(
                                          (action, index) => (
                                             <div
                                                key={index}
                                                className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>{action}</span>
                                             </div>
                                          )
                                       )}
                                    </div>
                                 </div>
                              )}

                           {intake.recommendations &&
                              intake.recommendations.length > 0 && (
                                 <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                       Recommendations
                                    </label>
                                    <div className="mt-2 space-y-1">
                                       {intake.recommendations.map(
                                          (recommendation, index) => (
                                             <div
                                                key={index}
                                                className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>{recommendation}</span>
                                             </div>
                                          )
                                       )}
                                    </div>
                                 </div>
                              )}
                        </CardContent>
                     </Card>
                  </TabsContent>
               </Tabs>

               {/* Action Buttons */}
               <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>
                     Close
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
