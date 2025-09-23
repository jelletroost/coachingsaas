"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
   createMeeting,
   createRoom,
   getMessages,
   sendMessage,
} from "@/services/message.service";
import { getPatientProfile } from "@/services/patients_services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import { MeetingData } from "./MeetingScheduler";
import { Conversation, Message } from "./mockData";

export default function MessagesManagement() {
   // Patient is assigned to only one coach - Dr. Sarah Chen

   const [assignedConversation] = useState<Conversation>({
      id: "122",
      coachId: "122",
      coachName: "Dr. Sarah Chen",
      coachAvatar: "/avatars/sarah-chen.jpg",
      coachSpecialty: "Cardiovascular Health",
      lastMessage:
         "That's excellent! How many days have you been able to exercise this week?",
      lastMessageTime: "2024-01-20T10:10:00Z",
      unreadCount: 0,
      status: "active",
      lastActivity: "2024-01-20T10:30:00Z",
      coachStatus: "online",
   });

   const [messages, setMessages] = useState<Message[]>([]);

   const { data: patientProfile } = useQuery({
      queryKey: ["patientProfile"],
      queryFn: getPatientProfile,
   });

   // Create or get room
   const { data: room } = useQuery({
      queryKey: ["room"],
      queryFn: () =>
         createRoom(patientProfile?.assigned_coach_id, patientProfile?.user_id),
      enabled: !!patientProfile?.assigned_coach_id && !!patientProfile?.user_id,
   });

   // Get messages
   const {
      data: messagesData,
      refetch: refetchMessages,
      isPending: isMessagesPending,
   } = useQuery({
      queryKey: ["messagesData"],
      queryFn: () => getMessages(room?.data?.room_id),
      enabled: !!room?.data?.room_id,
   });

   // Load messages for the assigned coach
   useEffect(() => {
      setMessages(messagesData?.data);
   }, [messagesData]);

   // Send message mutation
   const {
      mutate: sendMessageMutation,
      isError: isSendMessageError,
      isPending: isSendMessagePending,
   } = useMutation({
      mutationFn: (newMessage: Message) =>
         sendMessage(
            newMessage.room_id,
            newMessage.sender_id,
            newMessage.content
         ),
      onSuccess: () => {
         refetchMessages();
      },
   });

   const handleSendMessage = (content: string) => {
      const newMessage: Message = {
         room_id: room?.data?.room_id,
         sender_id: patientProfile?.id,
         content,
      };

      sendMessageMutation(newMessage);

      // Add message to messages list
      newMessage.is_error = isSendMessageError;
      setMessages((prev) => [...prev, newMessage]);
   };

   const { mutate: createMeetingMutation, isError: isCreateMeetingError } =
      useMutation({
         mutationFn: (meetingData: Message) =>
            createMeeting(
               meetingData.sender_id,
               meetingData.meeting_id?.type || "phone",
               meetingData.meeting_id?.date || new Date(),
               meetingData.meeting_id?.time || "09:00",
               meetingData.meeting_id?.duration || 30,
               meetingData.meeting_id?.notes || "",
               meetingData.room_id
            ),
         onSuccess: () => {
            refetchMessages();
         },
      });

   const handleAddMeetingMessage = (meetingData: MeetingData) => {
      const newMeetingMessage: Message = {
         room_id: room?.data?.room_id,
         sender_id: patientProfile?.id,
         content: `Meeting scheduled: ${
            meetingData.type === "phone" ? "Phone Call" : "Google Meet"
         } on ${meetingData.date.toDateString()} at ${meetingData.time}`,
         meeting_id: {
            senderId: patientProfile?.id,
            type: meetingData.type,
            date: meetingData.date,
            time: meetingData.time,
            duration: parseInt(meetingData.duration),
            notes: meetingData.notes || "",
            status: "pending",
         },
      };
      createMeetingMutation(newMeetingMessage);

      // Add meeting message to messages list
      newMeetingMessage.is_error = isCreateMeetingError;
      setMessages((prev) => [...prev, newMeetingMessage]);
   };

   return (
      <div className="h-full">
         {/* Messages Interface */}
         <Card className="h-[calc(100vh-200px)]">
            <CardContent className="p-0 h-full">
               <div className="flex h-full">
                  {/* Chat Window - Direct chat with assigned coach */}
                  <div className="flex-1">
                     <ChatWindow
                        patientProfile={patientProfile}
                        conversation={assignedConversation}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onAddMeetingMessage={handleAddMeetingMessage}
                        isMessagesPending={isMessagesPending}
                        isSendMessagePending={isSendMessagePending}
                     />
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
