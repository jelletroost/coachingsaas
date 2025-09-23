"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMemberRooms } from "@/services/message.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import { Conversation, getMessagesByConversationId, Message } from "./mockData";

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

   // Load messages when conversation is selected
   useEffect(() => {
      if (selectedConversationId) {
         const conversationMessages = getMessagesByConversationId(
            selectedConversationId
         );
         setMessages(conversationMessages);
      } else {
         setMessages([]);
      }
   }, [selectedConversationId]);

   const handleSelectConversation = (conversationId: string) => {
      setSelectedConversationId(conversationId);
      // Note: In a real implementation, you would call an API to mark messages as read
      // For now, we'll just update the local state or trigger a refetch
   };

   const handleSendMessage = (content: string) => {
      if (!selectedConversationId) return;

      const newMessage: Message = {
         id: `msg_${Date.now()}`,
         conversationId: selectedConversationId,
         senderId: "coach_1",
         senderType: "coach",
         content,
         timestamp: new Date().toISOString(),
         isRead: false,
      };

      // Add message to messages list
      setMessages((prev) => [...prev, newMessage]);

      // Note: In a real implementation, you would call an API to send the message
      // and then refetch the conversations to get updated timestamps
      // For now, we'll just add the message to local state
   };

   const handleTyping = (isTyping: boolean) => {
      // Handle typing indicator logic here
      console.log("Typing:", isTyping);
   };

   const selectedConversation = selectedConversationId
      ? conversations.find(
           (conv: Conversation) => conv.id === selectedConversationId
        )
      : undefined;

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
                     />
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
