"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
   Calendar,
   Check,
   Clock,
   FileText,
   Phone,
   Video,
   X,
} from "lucide-react";
import { useState } from "react";
import { Message } from "./mockData";

interface MeetingMessageProps {
   message: Message;
   isOwnMessage: boolean;
   onAcceptMeeting?: (messageId: string, meetingLink?: string) => void;
   onRejectMeeting?: (messageId: string) => void;
   isCoachView?: boolean; // New prop to identify if this is coach's view
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
   onAcceptMeeting,
   onRejectMeeting,
   isCoachView = false,
}: MeetingMessageProps) {
   const [isDetailsOpen, setIsDetailsOpen] = useState(false);
   const [isMeetingLinkDialogOpen, setIsMeetingLinkDialogOpen] =
      useState(false);
   const [meetingLink, setMeetingLink] = useState("");

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

   const handleAccept = () => {
      if (meeting_id.type === "google-meet") {
         // For Google Meet, show dialog to enter meeting link
         setIsMeetingLinkDialogOpen(true);
      } else {
         // For phone calls, accept directly
         if (onAcceptMeeting && message.meeting_id?.id) {
            onAcceptMeeting(message.meeting_id.id);
         }
      }
   };

   const handleAcceptWithLink = () => {
      if (meetingLink.trim() && message.meeting_id?.id) {
         if (onAcceptMeeting) {
            onAcceptMeeting(message.meeting_id.id, meetingLink.trim());
         }
         setIsMeetingLinkDialogOpen(false);
         setMeetingLink("");
      }
   };

   const handleCancelLinkDialog = () => {
      setIsMeetingLinkDialogOpen(false);
      setMeetingLink("");
   };

   const handleReject = () => {
      if (onRejectMeeting && message.meeting_id?.id) {
         onRejectMeeting(message.meeting_id.id);
      }
   };

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

               {/* Coach-specific buttons for pending meetings from patients */}
               {isCoachView &&
                  !isOwnMessage &&
                  meeting_id.status === "pending" && (
                     <>
                        <Button
                           variant="default"
                           size="sm"
                           onClick={handleAccept}
                           className="text-xs bg-green-600 hover:bg-green-700">
                           <Check className="h-3 w-3 mr-1" />
                           Accept
                        </Button>
                        <Button
                           variant="destructive"
                           size="sm"
                           onClick={handleReject}
                           className="text-xs">
                           <X className="h-3 w-3 mr-1" />
                           Reject
                        </Button>
                     </>
                  )}

               {/* Join meeting button for confirmed meetings */}
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
                     Complete information about the scheduled meeting
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

                  {/* Coach-specific action buttons for pending meetings from patients */}
                  {isCoachView &&
                     !isOwnMessage &&
                     meeting_id.status === "pending" && (
                        <>
                           <Button variant="destructive" onClick={handleReject}>
                              Reject
                           </Button>
                           <Button
                              onClick={handleAccept}
                              className="bg-green-600 hover:bg-green-700">
                              Accept
                           </Button>
                        </>
                     )}

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

         {/* Meeting Link Dialog for Google Meet */}
         <Dialog
            open={isMeetingLinkDialogOpen}
            onOpenChange={setIsMeetingLinkDialogOpen}>
            <DialogContent className="sm:max-w-[400px]">
               <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                     <Video className="h-5 w-5 text-green-600" />
                     <span>Accept Google Meet</span>
                  </DialogTitle>
                  <DialogDescription>
                     Please provide the Google Meet link for this meeting
                  </DialogDescription>
               </DialogHeader>

               <div className="space-y-4">
                  <div>
                     <Label
                        htmlFor="meeting-link"
                        className="text-sm font-medium">
                        Google Meet Link
                     </Label>
                     <Input
                        id="meeting-link"
                        type="url"
                        placeholder="https://meet.google.com/abc-defg-hij"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        className="mt-1"
                     />
                     <p className="text-xs text-gray-500 mt-1">
                        Enter the Google Meet link that will be shared with the
                        patient
                     </p>
                  </div>
               </div>

               <DialogFooter>
                  <Button variant="outline" onClick={handleCancelLinkDialog}>
                     Cancel
                  </Button>
                  <Button
                     onClick={handleAcceptWithLink}
                     disabled={!meetingLink.trim()}
                     className="bg-green-600 hover:bg-green-700">
                     Accept Meeting
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
