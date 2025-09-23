"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
   getMemberRooms,
   getMessages,
   sendMessage,
} from "@/services/message.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import { Conversation, Message } from "./mockData";

export default function MessagesManagement() {
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

   // Load messages from API data
   useEffect(() => {
      if (messagesData?.data) {
         setMessages(messagesData.data);
      } else {
         setMessages([]);
      }
   }, [messagesData]);

   // Send message mutation
   const { mutate: sendMessageMutation, isPending: isSendMessagePending } =
      useMutation({
         mutationFn: (newMessage: Message) =>
            sendMessage(
               newMessage.conversationId,
               newMessage.senderId,
               newMessage.content
            ),
         onSuccess: () => {
            refetchMessages();
            refetchConversations();
         },
         onError: (error) => {
            console.error("Failed to send message:", error);
         },
      });

   const handleSelectConversation = (conversationId: string) => {
      setSelectedConversationId(conversationId);
      // Note: In a real implementation, you would call an API to mark messages as read
      // For now, we'll just update the local state or trigger a refetch
   };

   const handleSendMessage = (content: string) => {
      if (!selectedConversationId || !selectedConversation?.room_id) return;

      const newMessage: Message = {
         id: `msg_${Date.now()}`,
         conversationId: selectedConversationId,
         senderId: "coach_1", // This should be the actual coach ID from auth
         senderType: "coach",
         content,
         timestamp: new Date().toISOString(),
         isRead: false,
      };

      // Send message via API
      sendMessageMutation(newMessage);
   };

   const handleTyping = (isTyping: boolean) => {
      // Handle typing indicator logic here
      console.log("Typing:", isTyping);
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
                  <Button variant="outline" size="sm">
                     New Message
                  </Button>
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
