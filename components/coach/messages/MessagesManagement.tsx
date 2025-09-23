"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeMeetings } from "@/hooks/useRealtimeMeetings";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { useAuth } from "@/lib/providers/authProvider";
import {
   checkEnvironmentVariables,
   testDatabaseConnection,
   testRealtimeConnection,
} from "@/lib/supabase/realtimeTest";
import {
   getMemberRooms,
   getMessages,
   sendMessage,
   updateMeeting,
} from "@/services/message.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import { Conversation, Message } from "./mockData";

export default function MessagesManagement() {
   const { user } = useAuth();
   const [selectedConversationId, setSelectedConversationId] = useState<
      string | undefined
   >();
   const [messages, setMessages] = useState<Message[]>([]);
   const [debugInfo, setDebugInfo] = useState<any>(null);

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

   // Fetch messages for selected conversation
   const {
      data: messagesData,
      refetch: refetchMessages,
      isPending: isMessagesPending,
   } = useQuery({
      queryKey: ["messages", selectedConversationId],
      queryFn: () => getMessages(selectedConversation?.room_id || ""),
      enabled: !!selectedConversation?.room_id,
      staleTime: 2 * 60 * 1000, // 2 minutes
   });

   // Realtime messages for selected conversation
   const {
      messages: realtimeMessages,
      connectionStatus: messagesConnectionStatus,
      addMessage: addRealtimeMessage,
   } = useRealtimeMessages({
      roomId: selectedConversation?.room_id,
      enabled: !!selectedConversation?.room_id,
   });

   // Realtime meetings for selected conversation
   const { updateMeeting: updateRealtimeMeeting } = useRealtimeMeetings({
      roomId: selectedConversation?.room_id,
      enabled: !!selectedConversation?.room_id,
   });

   // Merge fetched messages with realtime messages
   const allMessages = useMemo(() => {
      const fetchedMessages = messagesData?.data || [];
      const combined = [...fetchedMessages, ...realtimeMessages];

      // Remove duplicates and sort by timestamp
      const uniqueMessages = combined.reduce(
         (acc: Message[], message: Message) => {
            const exists = acc.some((msg: Message) => msg.id === message.id);
            if (!exists) acc.push(message);
            return acc;
         },
         [] as Message[]
      );

      return uniqueMessages.sort(
         (a: Message, b: Message) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
   }, [messagesData?.data, realtimeMessages]);

   // Load messages from combined data
   useEffect(() => {
      setMessages(allMessages);
   }, [allMessages]);

   // Send message mutation
   const { mutate: sendMessageMutation, isPending: isSendMessagePending } =
      useMutation({
         mutationFn: (newMessage: Message) =>
            sendMessage(
               newMessage.room_id!,
               newMessage.sender_id,
               newMessage.content
            ),
         onSuccess: () => {
            refetchMessages();
            refetchConversations();
         },
         onError: (error, newMessage) => {
            console.error("Failed to send message:", error);
            // Mark the message as failed
            setMessages((prev) =>
               prev.map((msg) =>
                  msg.id === newMessage.id ? { ...msg, is_error: true } : msg
               )
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
         id: `temp_${Date.now()}`, // Temporary ID for optimistic update
         conversationId: selectedConversationId,
         room_id: selectedConversation.room_id,
         sender_id: user.id,
         senderType: "coach",
         content,
         timestamp: new Date().toISOString(),
         isRead: false,
         is_error: false,
      };

      // Add message to local state immediately (optimistic update)
      addRealtimeMessage(newMessage);

      // Send message via API - realtime will handle the actual message
      sendMessageMutation(newMessage);
   };

   const handleTyping = (isTyping: boolean) => {
      // Handle typing indicator logic here
      console.log("Typing:", isTyping);
   };

   const testConnection = async () => {
      console.log("Testing connections...");

      // Check environment variables first
      const envCheck = checkEnvironmentVariables();

      const [realtimeResult, dbResult] = await Promise.all([
         testRealtimeConnection(),
         testDatabaseConnection(),
      ]);

      setDebugInfo({
         environment: envCheck,
         realtime: realtimeResult,
         database: dbResult,
         timestamp: new Date().toISOString(),
      });

      console.log("Connection test results:", {
         envCheck,
         realtimeResult,
         dbResult,
      });
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

         // Also update realtime meeting
         updateRealtimeMeeting(meetingId, {
            status: "confirmed",
            meeting_link: meetingLink,
            updated_at: new Date().toISOString(),
         });

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

         // Also update realtime meeting
         updateRealtimeMeeting(meetingId, {
            status: "cancelled",
            updated_at: new Date().toISOString(),
         });

         console.log("Meeting rejected successfully:", meetingId);
      } catch (error) {
         console.error("Failed to reject meeting:", error);
         // You could add a toast notification here
      }
   };

   // Calculate unread conversations from API data
   const totalUnread = conversations.filter(
      (conv: Conversation) => conv.last_read_message_id === null
   ).length;

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
               <div className="flex items-center space-x-2">
                  {totalUnread > 0 && (
                     <Badge variant="destructive">{totalUnread} unread</Badge>
                  )}
                  {/* Realtime Connection Status */}
                  <div className="flex items-center space-x-1">
                     <div
                        className={`w-2 h-2 rounded-full ${
                           messagesConnectionStatus === "CONNECTED"
                              ? "bg-green-500"
                              : messagesConnectionStatus === "CONNECTING"
                              ? "bg-yellow-500"
                              : messagesConnectionStatus === "ERROR"
                              ? "bg-red-500"
                              : "bg-gray-400"
                        }`}
                     />
                     <span className="text-xs text-gray-500">
                        {messagesConnectionStatus === "CONNECTED"
                           ? process.env.NODE_ENV === "development"
                              ? "Local Mode"
                              : "Live"
                           : messagesConnectionStatus === "CONNECTING"
                           ? "Connecting..."
                           : messagesConnectionStatus === "ERROR"
                           ? "Fallback Mode"
                           : "Disconnected"}
                     </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={testConnection}>
                     Test Connection
                  </Button>
                  <Button variant="outline" size="sm">
                     New Message
                  </Button>
               </div>
            </div>
         </div>

         {/* Debug Info */}
         {debugInfo && (
            <Card className="mb-4 p-4 bg-gray-50">
               <h3 className="text-sm font-medium mb-2">
                  Connection Debug Info
               </h3>
               <div className="space-y-2 text-xs">
                  <div>
                     <strong>Environment:</strong>{" "}
                     {debugInfo.environment.success
                        ? "✅ Configured"
                        : "❌ Missing"}
                     {debugInfo.environment.error && (
                        <span className="text-red-600 ml-2">
                           {debugInfo.environment.error}
                        </span>
                     )}
                  </div>
                  <div>
                     <strong>Realtime:</strong>{" "}
                     {debugInfo.realtime.success ? "✅ Connected" : "❌ Failed"}
                     {debugInfo.realtime.details?.mode === "local-fallback" && (
                        <span className="text-blue-600 ml-2">(Local Mode)</span>
                     )}
                     {debugInfo.realtime.error && (
                        <span className="text-red-600 ml-2">
                           {debugInfo.realtime.error}
                        </span>
                     )}
                  </div>
                  <div>
                     <strong>Database:</strong>{" "}
                     {debugInfo.database.success ? "✅ Connected" : "❌ Failed"}
                     {debugInfo.database.error && (
                        <span className="text-red-600 ml-2">
                           {debugInfo.database.error}
                        </span>
                     )}
                  </div>
                  <div className="text-gray-500">
                     Tested at: {debugInfo.timestamp}
                  </div>
               </div>
            </Card>
         )}

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
