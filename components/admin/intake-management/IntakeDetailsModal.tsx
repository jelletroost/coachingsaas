/* eslint-disable no-unused-vars */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useState } from "react";
import { type IntakeRecord } from "./mockData";

interface IntakeDetailsModalProps {
   intake: IntakeRecord;
   isOpen: boolean;
   onClose: () => void;
   onUpdate: (intake: IntakeRecord, updates: Partial<IntakeRecord>) => void;
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

export function IntakeDetailsModal({
   intake,
   isOpen,
   onClose,
   onUpdate,
   coaches,
}: IntakeDetailsModalProps) {
   const [editing, setEditing] = useState(false);
   const [formData, setFormData] = useState({
      assignedCoach: intake.assignedCoach || "",
      followUpActions: intake.followUpActions || [],
      recommendations: intake.recommendations || [],
      notes: intake.notes || "",
   });

   const handleSave = () => {
      onUpdate(intake, formData);
      setEditing(false);
   };

   const handleCancel = () => {
      setFormData({
         assignedCoach: intake.assignedCoach || "",
         followUpActions: intake.followUpActions || [],
         recommendations: intake.recommendations || [],
         notes: intake.notes || "",
      });
      setEditing(false);
   };

   const addFollowUpAction = () => {
      const action = prompt("Enter follow-up action:");
      if (action) {
         setFormData((prev) => ({
            ...prev,
            followUpActions: [...prev.followUpActions, action],
         }));
      }
   };

   const removeFollowUpAction = (index: number) => {
      setFormData((prev) => ({
         ...prev,
         followUpActions: prev.followUpActions.filter((_, i) => i !== index),
      }));
   };

   const addRecommendation = () => {
      const recommendation = prompt("Enter recommendation:");
      if (recommendation) {
         setFormData((prev) => ({
            ...prev,
            recommendations: [...prev.recommendations, recommendation],
         }));
      }
   };

   const removeRecommendation = (index: number) => {
      setFormData((prev) => ({
         ...prev,
         recommendations: prev.recommendations.filter((_, i) => i !== index),
      }));
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  Intake Details - {intake.id}
                  {getStatusBadge(intake.status)}
                  {getPriorityBadge(intake.priority)}
               </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Patient Information */}
               <Card>
                  <CardHeader>
                     <CardTitle>Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm">{intake.patientName}</p>
                     </div>
                     <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm">{intake.patientEmail}</p>
                     </div>
                     <div>
                        <Label className="text-sm font-medium">
                           Patient ID
                        </Label>
                        <p className="text-sm font-mono">{intake.patientId}</p>
                     </div>
                     <div>
                        <Label className="text-sm font-medium">
                           Questionnaire Type
                        </Label>
                        <p className="text-sm capitalize">
                           {intake.questionnaireType.replace("_", " ")}
                        </p>
                     </div>
                  </CardContent>
               </Card>

               {/* Timeline Information */}
               <Card>
                  <CardHeader>
                     <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <Label className="text-sm font-medium">Submitted</Label>
                        <p className="text-sm">
                           {format(
                              new Date(intake.submittedDate),
                              "PPP 'at' p"
                           )}
                        </p>
                     </div>
                     <div>
                        <Label className="text-sm font-medium">
                           Last Updated
                        </Label>
                        <p className="text-sm">
                           {format(new Date(intake.lastUpdated), "PPP 'at' p")}
                        </p>
                     </div>
                  </CardContent>
               </Card>

               {/* Assignment & Actions */}
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center justify-between">
                        Assignment & Actions
                        {!editing && (
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditing(true)}>
                              Edit
                           </Button>
                        )}
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <Label className="text-sm font-medium">
                           Assigned Coach
                        </Label>
                        {editing ? (
                           <Select
                              value={formData.assignedCoach}
                              onValueChange={(value) =>
                                 setFormData((prev) => ({
                                    ...prev,
                                    assignedCoach: value,
                                 }))
                              }>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select coach" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="">Unassigned</SelectItem>
                                 {coaches.map((coach) => (
                                    <SelectItem key={coach} value={coach}>
                                       {coach}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        ) : (
                           <p className="text-sm">
                              {intake.assignedCoach || "Unassigned"}
                           </p>
                        )}
                     </div>

                     <div>
                        <Label className="text-sm font-medium">
                           Follow-up Actions
                        </Label>
                        {editing ? (
                           <div className="space-y-2">
                              {formData.followUpActions.map((action, index) => (
                                 <div
                                    key={index}
                                    className="flex items-center gap-2">
                                    <Input value={action} readOnly />
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() =>
                                          removeFollowUpAction(index)
                                       }>
                                       Remove
                                    </Button>
                                 </div>
                              ))}
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={addFollowUpAction}>
                                 Add Action
                              </Button>
                           </div>
                        ) : (
                           <div className="space-y-1">
                              {intake.followUpActions?.map((action, index) => (
                                 <p key={index} className="text-sm">
                                    • {action}
                                 </p>
                              )) || (
                                 <p className="text-sm text-muted-foreground">
                                    No actions assigned
                                 </p>
                              )}
                           </div>
                        )}
                     </div>
                  </CardContent>
               </Card>

               {/* Recommendations & Notes */}
               <Card>
                  <CardHeader>
                     <CardTitle>Recommendations & Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <Label className="text-sm font-medium">
                           Recommendations
                        </Label>
                        {editing ? (
                           <div className="space-y-2">
                              {formData.recommendations.map((rec, index) => (
                                 <div
                                    key={index}
                                    className="flex items-center gap-2">
                                    <Input value={rec} readOnly />
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() =>
                                          removeRecommendation(index)
                                       }>
                                       Remove
                                    </Button>
                                 </div>
                              ))}
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={addRecommendation}>
                                 Add Recommendation
                              </Button>
                           </div>
                        ) : (
                           <div className="space-y-1">
                              {intake.recommendations?.map((rec, index) => (
                                 <p key={index} className="text-sm">
                                    • {rec}
                                 </p>
                              )) || (
                                 <p className="text-sm text-muted-foreground">
                                    No recommendations
                                 </p>
                              )}
                           </div>
                        )}
                     </div>

                     <div>
                        <Label className="text-sm font-medium">Notes</Label>
                        {editing ? (
                           <Textarea
                              value={formData.notes}
                              onChange={(e) =>
                                 setFormData((prev) => ({
                                    ...prev,
                                    notes: e.target.value,
                                 }))
                              }
                              placeholder="Add notes about this intake..."
                           />
                        ) : (
                           <p className="text-sm">
                              {intake.notes || "No notes"}
                           </p>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>

            {editing && (
               <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={handleCancel}>
                     Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
}
