"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/providers/authProvider";
import {
   getMemberRooms,
   getMessages,
   sendMessage,
   updateMeeting,
} from "@/services/message.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import { Conversation, Message } from "./mockData";

export default function MessagesManagement() {
   const { user } = useAuth();
   const [selectedConversationId, setSelectedConversationId] = useState<
      string | undefined
   >();
   const [messages, setMessages] = useState<Message[]>([]);

   // Fetch conversations using useQuery
   const {
      data: conversationsData,
      isLoading: conversationsLoading,
      error: conversationsError,
      refetch: refetchConversations,
   } = useQuery({
      queryKey: ["memberRooms"],
      queryFn: getMemberRooms,
      staleTime: 5 * 60 * 1000, // 5 minutes
   });

   const conversations = conversationsData?.data || [];

   // Get selected conversation
   const selectedConversation = selectedConversationId
      ? conversations.find(
           (conv: Conversation) => conv.id === selectedConversationId
        )
      : undefined;

   // Fetch messages for selected conversation with polling
   const {
      data: messagesData,
      refetch: refetchMessages,
      isPending: isMessagesPending,
   } = useQuery({
      queryKey: ["messages", selectedConversationId],
      queryFn: () => getMessages(selectedConversation?.room_id || ""),
      enabled: !!selectedConversation?.room_id,
      staleTime: 0, // Always consider data stale
      refetchInterval: 3000, // Poll every 3 seconds
      refetchIntervalInBackground: true, // Continue polling when tab is not active
   });

   // Load messages from API data
   useEffect(() => {
      if (messagesData?.data) {
         setMessages(messagesData.data);
      } else {
         setMessages([]);
      }
   }, [messagesData]);

   // Send message mutation with optimistic updates
   const { mutate: sendMessageMutation, isPending: isSendMessagePending } =
      useMutation({
         mutationFn: (newMessage: Message) =>
            sendMessage(
               newMessage.room_id!,
               newMessage.sender_id,
               newMessage.content
            ),
         onMutate: async (newMessage) => {
            // Cancel any outgoing refetches
            await refetchMessages();

            // Optimistically update the UI
            const optimisticMessage = {
               ...newMessage,
               id: `temp_${Date.now()}`,
               timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, optimisticMessage]);
         },
         onSuccess: () => {
            // Refetch messages to get the real message from server
            refetchMessages();
            refetchConversations();
         },
         onError: (error, newMessage) => {
            console.error("Failed to send message:", error);
            // Remove the optimistic message on error
            setMessages((prev) =>
               prev.filter((msg) => msg.id !== `temp_${Date.now()}`)
            );
         },
      });

   const handleSelectConversation = (conversationId: string) => {
      setSelectedConversationId(conversationId);
      // Note: In a real implementation, you would call an API to mark messages as read
      // For now, we'll just update the local state or trigger a refetch
   };

   const handleSendMessage = (content: string) => {
      if (
         !selectedConversationId ||
         !selectedConversation?.room_id ||
         !user?.id
      )
         return;

      const newMessage: Message = {
         conversationId: selectedConversationId,
         room_id: selectedConversation.room_id,
         sender_id: user.id,
         senderType: "coach",
         content,
         timestamp: new Date().toISOString(),
         isRead: false,
         is_error: false,
      };

      // Send message via API (optimistic update handled in mutation)
      sendMessageMutation(newMessage);
   };

   const handleTyping = (isTyping: boolean) => {
      // Handle typing indicator logic here
      console.log("Typing:", isTyping);
   };

   const handleAcceptMeeting = async (
      meetingId: string,
      meetingLink?: string
   ) => {
      try {
         // Call API to accept the meeting
         await updateMeeting(meetingId, "confirmed", meetingLink);

         // Update the meeting status to confirmed
         setMessages((prev) =>
            prev.map((msg) =>
               msg.meeting_id?.id === meetingId && msg.meeting_id
                  ? {
                       ...msg,
                       meeting_id: {
                          ...msg.meeting_id,
                          status: "confirmed",
                          meeting_link:
                             meetingLink || msg.meeting_id.meeting_link,
                       },
                    }
                  : msg
            )
         );

         console.log("Meeting accepted successfully:", meetingId);
      } catch (error) {
         console.error("Failed to accept meeting:", error);
         // You could add a toast notification here
      }
   };

   const handleRejectMeeting = async (meetingId: string) => {
      try {
         // Call API to reject the meeting
         await updateMeeting(meetingId, "cancelled");

         // Update the meeting status to cancelled
         setMessages((prev) =>
            prev.map((msg) =>
               msg.meeting_id?.id === meetingId && msg.meeting_id
                  ? {
                       ...msg,
                       meeting_id: { ...msg.meeting_id, status: "cancelled" },
                    }
                  : msg
            )
         );

         console.log("Meeting rejected successfully:", meetingId);
      } catch (error) {
         console.error("Failed to reject meeting:", error);
         // You could add a toast notification here
      }
   };

   // Show loading state
   if (conversationsLoading) {
      return (
         <div className="h-full flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
               <p className="text-gray-600">Loading conversations...</p>
            </div>
         </div>
      );
   }

   // Show error state
   if (conversationsError) {
      return (
         <div className="h-full flex items-center justify-center">
            <div className="text-center">
               <p className="text-red-600 mb-4">Failed to load conversations</p>
               <Button onClick={() => refetchConversations()} variant="outline">
                  Try Again
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="h-full">
         <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                  <p className="text-gray-600">
                     Communicate with your patients
                  </p>
               </div>
            </div>
         </div>

         {/* Messages Interface */}
         <Card className="h-[calc(100vh-200px)]">
            <CardContent className="p-0 h-full">
               <div className="flex h-full">
                  {/* Message List */}
                  <div className="w-1/3 border-r border-gray-200">
                     <MessageList
                        conversations={conversations}
                        selectedConversationId={selectedConversationId}
                        onSelectConversation={handleSelectConversation}
                     />
                  </div>

                  {/* Chat Window */}
                  <div className="flex-1">
                     <ChatWindow
                        conversation={selectedConversation}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onTyping={handleTyping}
                        onAcceptMeeting={handleAcceptMeeting}
                        onRejectMeeting={handleRejectMeeting}
                        isMessagesPending={isMessagesPending}
                        isSendMessagePending={isSendMessagePending}
                        currentUserId={user?.id}
                     />
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
