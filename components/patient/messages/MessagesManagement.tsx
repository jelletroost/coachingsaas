"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import {
   Conversation,
   conversationsData,
   getConversationById,
   getMessagesByConversationId,
   Message,
} from "./mockData";

export default function MessagesManagement() {
   const [conversations, setConversations] =
      useState<Conversation[]>(conversationsData);
   const [selectedConversationId, setSelectedConversationId] = useState<
      string | undefined
   >();
   const [messages, setMessages] = useState<Message[]>([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredConversations, setFilteredConversations] =
      useState<Conversation[]>(conversations);

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

   // Filter conversations based on search query
   useEffect(() => {
      let filtered = conversations;

      // Filter by search query
      if (searchQuery) {
         filtered = filtered.filter(
            (conv) =>
               conv.coachName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
               conv.lastMessage
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
         );
      }

      setFilteredConversations(filtered);
   }, [conversations, searchQuery]);

   const handleSelectConversation = (conversationId: string) => {
      setSelectedConversationId(conversationId);
   };

   const handleSendMessage = (content: string) => {
      if (!selectedConversationId) return;

      const newMessage: Message = {
         id: `msg_${Date.now()}`,
         conversationId: selectedConversationId,
         senderId: "patient_1",
         senderType: "patient",
         content,
         timestamp: new Date().toISOString(),
         isRead: false,
      };

      // Add message to messages list
      setMessages((prev) => [...prev, newMessage]);

      // Update conversation's last message
      const updatedConversations = conversations.map((conv) =>
         conv.id === selectedConversationId
            ? {
                 ...conv,
                 lastMessage: content,
                 lastMessageTime: new Date().toISOString(),
                 lastActivity: new Date().toISOString(),
              }
            : conv
      );
      setConversations(updatedConversations);
   };

   const handleSearch = (query: string) => {
      setSearchQuery(query);
   };

   const handleTyping = (isTyping: boolean) => {
      // Handle typing indicator logic here
      console.log("Typing:", isTyping);
   };

   const selectedConversation = selectedConversationId
      ? getConversationById(selectedConversationId)
      : undefined;

   return (
      <div className="h-full">
         {/* Messages Interface */}
         <Card className="h-[calc(100vh-200px)]">
            <CardContent className="p-0 h-full">
               <div className="flex h-full">
                  {/* Message List */}
                  <div className="w-1/3 border-r border-gray-200">
                     <MessageList
                        conversations={filteredConversations}
                        selectedConversationId={selectedConversationId}
                        onSelectConversation={handleSelectConversation}
                        onSearch={handleSearch}
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
