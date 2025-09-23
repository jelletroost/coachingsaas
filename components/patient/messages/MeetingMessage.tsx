"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar, Clock, FileText, Phone, Video } from "lucide-react";
import { useState } from "react";
import { Message } from "./mockData";

interface MeetingMessageProps {
   message: Message;
   isOwnMessage: boolean;
}

const getStatusColor = (status: string) => {
   switch (status) {
      case "pending":
         return "bg-yellow-100 text-yellow-800";
      case "confirmed":
         return "bg-green-100 text-green-800";
      case "cancelled":
         return "bg-red-100 text-red-800";
      case "completed":
         return "bg-gray-100 text-gray-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

const getStatusText = (status: string) => {
   switch (status) {
      case "pending":
         return "Pending";
      case "confirmed":
         return "Confirmed";
      case "cancelled":
         return "Cancelled";
      case "completed":
         return "Completed";
      default:
         return "Unknown";
   }
};

export default function MeetingMessage({
   message,
   isOwnMessage,
}: MeetingMessageProps) {
   const [isDetailsOpen, setIsDetailsOpen] = useState(false);

   if (!message.meeting_id) return null;

   const { meeting_id } = message;
   const meetingDate = new Date(meeting_id.date);
   const isPastMeeting = meetingDate < new Date();

   const handleJoinMeeting = () => {
      if (meeting_id.type === "google-meet") {
         // In a real app, this would open the Google Meet link
         alert("Opening Google Meet...");
      } else {
         // For phone calls, this might initiate the call
         alert("Initiating phone call...");
      }
   };

   // const handleCancel = () => {
   //    // In a real app, this would cancel the meeting
   //    if (confirm("Are you sure you want to cancel this meeting?")) {
   //       alert("Meeting cancelled");
   //    }
   // };

   return (
      <>
         <div
            className={`rounded-lg p-4 border-2 border-dashed ${
               isOwnMessage
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
            }`}>
            <div className="flex items-start justify-between mb-3">
               <div className="flex items-center space-x-2">
                  {meeting_id.type === "phone" ? (
                     <Phone className="h-5 w-5 text-blue-600" />
                  ) : (
                     <Video className="h-5 w-5 text-green-600" />
                  )}
                  <span className="font-medium text-sm">
                     {meeting_id.type === "phone"
                        ? "Phone Call"
                        : "Google Meet"}
                  </span>
               </div>
               <Badge className={getStatusColor(meeting_id.status)}>
                  {getStatusText(meeting_id.status)}
               </Badge>
            </div>

            <div className="space-y-2 mb-3">
               <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{format(meetingDate, "EEEE, MMMM d, yyyy")}</span>
               </div>
               <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{meeting_id.time}</span>
                  <span className="text-gray-400">•</span>
                  <span>{meeting_id.duration} minutes</span>
               </div>
               {meeting_id.notes && (
                  <div className="flex items-start space-x-2 text-sm">
                     <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                     <span className="text-gray-600 line-clamp-2">
                        {meeting_id.notes}
                     </span>
                  </div>
               )}
            </div>

            <div className="flex space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDetailsOpen(true)}
                  className="text-xs">
                  View Details
               </Button>

               {meeting_id.status === "confirmed" && !isPastMeeting && (
                  <Button
                     variant="default"
                     size="sm"
                     onClick={handleJoinMeeting}
                     className="text-xs">
                     {meeting_id.type === "phone" ? "Call Now" : "Join Meeting"}
                  </Button>
               )}
            </div>
         </div>

         {/*Meeting Details Dialog */}
         <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-[500px]">
               <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                     {meeting_id.type === "phone" ? (
                        <Phone className="h-5 w-5 text-blue-600" />
                     ) : (
                        <Video className="h-5 w-5 text-green-600" />
                     )}
                     <span>Meeting Details</span>
                  </DialogTitle>
                  <DialogDescription>
                     Complete information about your scheduled meeting
                  </DialogDescription>
               </DialogHeader>

               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-gray-500">
                           Type
                        </label>
                        <p className="text-sm">
                           {meeting_id.type === "phone"
                              ? "Phone Call"
                              : "Google Meet"}
                        </p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-gray-500">
                           Status
                        </label>
                        <div className="mt-1">
                           <Badge className={getStatusColor(meeting_id.status)}>
                              {getStatusText(meeting_id.status)}
                           </Badge>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-gray-500">
                           Date
                        </label>
                        <p className="text-sm">
                           {format(meetingDate, "EEEE, MMMM d, yyyy")}
                        </p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-gray-500">
                           Time
                        </label>
                        <p className="text-sm">{meeting_id.time}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-gray-500">
                           Duration
                        </label>
                        <p className="text-sm">{meeting_id.duration} minutes</p>
                     </div>
                     <div>
                        {meeting_id.type === "google-meet" && (
                           <div>
                              <label className="text-sm font-medium text-gray-500">
                                 Meeting Link
                              </label>
                              <p className="text-sm text-blue-600 underline">
                                 {meeting_id.meeting_link ? (
                                    <a
                                       href={meeting_id.meeting_link}
                                       target="_blank"
                                       rel="noopener noreferrer">
                                       {meeting_id.meeting_link}
                                    </a>
                                 ) : (
                                    "Not provided yet"
                                 )}
                              </p>
                           </div>
                        )}
                     </div>
                  </div>

                  {meeting_id.notes && (
                     <div>
                        <label className="text-sm font-medium text-gray-500">
                           Notes
                        </label>
                        <p className="text-sm bg-gray-50 p-3 rounded-md mt-1">
                           {meeting_id.notes}
                        </p>
                     </div>
                  )}
               </div>

               <div className="flex justify-end space-x-2 pt-4">
                  <Button
                     variant="outline"
                     onClick={() => setIsDetailsOpen(false)}>
                     Close
                  </Button>
                  {meeting_id.status === "confirmed" && !isPastMeeting && (
                     <Button onClick={handleJoinMeeting}>
                        {meeting_id.type === "phone"
                           ? "Call Now"
                           : "Join Meeting"}
                     </Button>
                  )}
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
}
