"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { assignCoachToPatient } from "@/services/patients_services";
import { Loader2, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { User } from "./types";

interface AssignCoachModalProps {
   patient: User | null;
   coaches: User[];
   isOpen: boolean;
   onClose: () => void;
   onSuccess: () => void;
}

export function AssignCoachModal({
   patient,
   coaches,
   isOpen,
   onClose,
   onSuccess,
}: AssignCoachModalProps) {
   const [selectedCoachId, setSelectedCoachId] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);

   const handleAssignCoach = async () => {
      if (!patient || !selectedCoachId) {
         toast.error("Please select a coach");
         return;
      }

      setIsLoading(true);
      try {
         await assignCoachToPatient(patient.id, selectedCoachId);
         toast.success(`Coach assigned to ${patient.name} successfully`);
         onSuccess();
         onClose();
         setSelectedCoachId("");
      } catch (error) {
         toast.error("Failed to assign coach. Please try again.");
         console.error("Error assigning coach:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleClose = () => {
      if (!isLoading) {
         setSelectedCoachId("");
         onClose();
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Assign Coach to Patient
               </DialogTitle>
               <DialogDescription>
                  Select a coach to assign to {patient?.name}. This will help
                  provide personalized guidance and support.
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium">Patient</label>
                  <div className="p-3 bg-muted rounded-md">
                     <div className="font-medium">{patient?.name}</div>
                     <div className="text-sm text-muted-foreground">
                        {patient?.email}
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium">Select Coach</label>
                  <Select
                     value={selectedCoachId}
                     onValueChange={setSelectedCoachId}
                     disabled={isLoading}>
                     <SelectTrigger>
                        <SelectValue placeholder="Choose a coach..." />
                     </SelectTrigger>
                     <SelectContent>
                        {coaches.map((coach) => (
                           <SelectItem key={coach.id} value={coach.id}>
                              <div className="flex flex-col">
                                 <span className="font-medium">
                                    {coach.name}
                                 </span>
                                 <span className="text-xs text-muted-foreground">
                                    {coach.email}
                                 </span>
                                 {coach.specializations && (
                                    <span className="text-xs text-muted-foreground">
                                       {coach.specializations.join(", ")}
                                    </span>
                                 )}
                              </div>
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <DialogFooter>
               <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}>
                  Cancel
               </Button>
               <Button
                  onClick={handleAssignCoach}
                  disabled={!selectedCoachId || isLoading}>
                  {isLoading ? (
                     <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Assigning...
                     </>
                  ) : (
                     <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Assign Coach
                     </>
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
} 