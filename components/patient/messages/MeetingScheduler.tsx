"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
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
import { Phone, Video } from "lucide-react";
import React, { useState } from "react";

interface MeetingSchedulerProps {
   isOpen: boolean;
   onClose: () => void;
   coachName: string;
   onSubmit: (meetingData: MeetingData) => void;
}

export interface MeetingData {
   roomId?: string;
   type: "phone" | "google-meet";
   date: Date;
   time: string;
   duration: string;
   notes?: string;
}

const timeSlots = [
   "09:00",
   "09:30",
   "10:00",
   "10:30",
   "11:00",
   "11:30",
   "12:00",
   "12:30",
   "13:00",
   "13:30",
   "14:00",
   "14:30",
   "15:00",
   "15:30",
   "16:00",
   "16:30",
   "17:00",
   "17:30",
   "18:00",
   "18:30",
   "19:00",
   "19:30",
   "20:00",
];

const durationOptions = [
   { value: "30", label: "30 minutes" },
   { value: "45", label: "45 minutes" },
   { value: "60", label: "1 hour" },
   { value: "90", label: "1.5 hours" },
   { value: "120", label: "2 hours" },
];

export default function MeetingScheduler({
   isOpen,
   onClose,
   coachName,
   onSubmit,
}: MeetingSchedulerProps) {
   const [step, setStep] = useState(1);
   const [meetingData, setMeetingData] = useState<MeetingData>({
      type: "phone",
      date: new Date(),
      time: "09:00",
      duration: "30",
      notes: "",
   });

   const handleTypeChange = (type: "phone" | "google-meet") => {
      setMeetingData((prev) => ({ ...prev, type }));
   };

   const handleDateSelect = (date: Date | undefined) => {
      if (date) {
         setMeetingData((prev) => ({ ...prev, date }));
      }
   };

   const handleTimeChange = (time: string) => {
      setMeetingData((prev) => ({ ...prev, time }));
   };

   const handleDurationChange = (duration: string) => {
      setMeetingData((prev) => ({ ...prev, duration }));
   };

   const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMeetingData((prev) => ({ ...prev, notes: e.target.value }));
   };

   const handleNext = () => {
      if (step < 3) {
         setStep(step + 1);
      }
   };

   const handleBack = () => {
      if (step > 1) {
         setStep(step - 1);
      }
   };

   const handleSubmit = () => {
      onSubmit(meetingData);
      onClose();
      // Reset form
      setStep(1);
      setMeetingData({
         type: "phone",
         date: new Date(),
         time: "09:00",
         duration: "30",
         notes: "",
      });
   };

   const isDateValid =
      meetingData.date &&
      meetingData.date >= new Date(new Date().setHours(0, 0, 0, 0));
   const canProceed =
      step === 1 ? true : step === 2 ? isDateValid && meetingData.time : true;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle>Schedule a Meeting with {coachName}</DialogTitle>
               <DialogDescription>
                  {step === 1 && "Choose your preferred meeting type"}
                  {step === 2 && "Select date and time for your meeting"}
                  {step === 3 && "Add any additional notes (optional)"}
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
               {/* Step 1: Meeting Type Selection */}
               {step === 1 && (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <Button
                           variant={
                              meetingData.type === "phone"
                                 ? "default"
                                 : "outline"
                           }
                           className="h-20 flex flex-col items-center space-y-2"
                           onClick={() => handleTypeChange("phone")}>
                           <Phone className="h-6 w-6" />
                           <span>Phone Call</span>
                        </Button>
                        <Button
                           variant={
                              meetingData.type === "google-meet"
                                 ? "default"
                                 : "outline"
                           }
                           className="h-20 flex flex-col items-center space-y-2"
                           onClick={() => handleTypeChange("google-meet")}>
                           <Video className="h-6 w-6" />
                           <span>Google Meet</span>
                        </Button>
                     </div>

                     <div className="text-sm text-muted-foreground">
                        {meetingData.type === "phone"
                           ? "We'll call you at your registered phone number"
                           : "You'll receive a Google Meet link via email"}
                     </div>
                  </div>
               )}

               {/* Step 2: Date and Time Selection */}
               {step === 2 && (
                  <div className="space-y-6">
                     <div>
                        <Label className="text-sm font-medium">
                           Select Date
                        </Label>
                        <Calendar
                           mode="single"
                           selected={meetingData.date}
                           onSelect={handleDateSelect}
                           disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                           }
                           className="rounded-md border mt-2"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <Label
                              htmlFor="time"
                              className="text-sm font-medium">
                              Time
                           </Label>
                           <Select
                              value={meetingData.time}
                              onValueChange={handleTimeChange}>
                              <SelectTrigger className="mt-1">
                                 <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                 {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                       {time}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>

                        <div>
                           <Label
                              htmlFor="duration"
                              className="text-sm font-medium">
                              Duration
                           </Label>
                           <Select
                              value={meetingData.duration}
                              onValueChange={handleDurationChange}>
                              <SelectTrigger className="mt-1">
                                 <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                 {durationOptions.map((option) => (
                                    <SelectItem
                                       key={option.value}
                                       value={option.value}>
                                       {option.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     {meetingData.date && meetingData.time && (
                        <div className="p-3 bg-muted rounded-md">
                           <div className="text-sm font-medium">
                              Meeting Summary:
                           </div>
                           <div className="text-sm text-muted-foreground mt-1">
                              {meetingData.type === "phone"
                                 ? "Phone Call"
                                 : "Google Meet"}{" "}
                              • {format(meetingData.date, "EEEE, MMMM d, yyyy")}{" "}
                              at {meetingData.time} •{" "}
                              {
                                 durationOptions.find(
                                    (opt) => opt.value === meetingData.duration
                                 )?.label
                              }
                           </div>
                        </div>
                     )}
                  </div>
               )}

               {/* Step 3: Additional Notes */}
               {step === 3 && (
                  <div className="space-y-4">
                     <div>
                        <Label htmlFor="notes" className="text-sm font-medium">
                           Additional Notes (Optional)
                        </Label>
                        <Textarea
                           id="notes"
                           placeholder="Any specific topics you'd like to discuss or questions you have..."
                           value={meetingData.notes}
                           onChange={handleNotesChange}
                           className="mt-1"
                           rows={4}
                        />
                     </div>

                     <div className="p-3 bg-muted rounded-md">
                        <div className="text-sm font-medium">
                           Final Meeting Details:
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                           <div>
                              Type:{" "}
                              {meetingData.type === "phone"
                                 ? "Phone Call"
                                 : "Google Meet"}
                           </div>
                           <div>
                              Date:{" "}
                              {format(meetingData.date, "EEEE, MMMM d, yyyy")}
                           </div>
                           <div>Time: {meetingData.time}</div>
                           <div>
                              Duration:{" "}
                              {
                                 durationOptions.find(
                                    (opt) => opt.value === meetingData.duration
                                 )?.label
                              }
                           </div>
                           {meetingData.notes && (
                              <div>Notes: {meetingData.notes}</div>
                           )}
                        </div>
                     </div>
                  </div>
               )}
            </div>

            <DialogFooter className="flex justify-between">
               <div className="flex space-x-2">
                  {step > 1 && (
                     <Button variant="outline" onClick={handleBack}>
                        Back
                     </Button>
                  )}
               </div>

               <div className="flex space-x-2">
                  <Button variant="outline" onClick={onClose}>
                     Cancel
                  </Button>
                  {step < 3 ? (
                     <Button onClick={handleNext} disabled={!canProceed}>
                        Next
                     </Button>
                  ) : (
                     <Button onClick={handleSubmit}>Schedule Meeting</Button>
                  )}
               </div>
            </DialogFooter>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
               {[1, 2, 3].map((stepNumber) => (
                  <div
                     key={stepNumber}
                     className={`w-2 h-2 rounded-full ${
                        stepNumber <= step ? "bg-primary" : "bg-muted"
                     }`}
                  />
               ))}
            </div>
         </DialogContent>
      </Dialog>
   );
}
