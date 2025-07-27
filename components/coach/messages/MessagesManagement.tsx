"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageList from "./MessageList";
import {
   Conversation,
   conversationsData,
   getConversationById,
   getMessagesByConversationId,
   getTotalUnreadMessages,
   getUnreadConversations,
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
   const [activeTab, setActiveTab] = useState("all");
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

   // Filter conversations based on search and tab
   useEffect(() => {
      let filtered = conversations;

      // Filter by search query
      if (searchQuery) {
         filtered = filtered.filter(
            (conv) =>
               conv.patientName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
               conv.lastMessage
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
         );
      }

      // Filter by tab
      switch (activeTab) {
         case "unread":
            filtered = filtered.filter((conv) => conv.unreadCount > 0);
            break;
         case "active":
            filtered = filtered.filter((conv) => conv.status === "active");
            break;
         case "archived":
            filtered = filtered.filter((conv) => conv.status === "archived");
            break;
         default:
            break;
      }

      setFilteredConversations(filtered);
   }, [conversations, searchQuery, activeTab]);

   const handleSelectConversation = (conversationId: string) => {
      setSelectedConversationId(conversationId);

      // Mark messages as read
      const updatedConversations = conversations.map((conv) =>
         conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      );
      setConversations(updatedConversations);
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

   const totalUnread = getTotalUnreadMessages();
   const unreadConversations = getUnreadConversations();

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

            {/* Tabs */}
            <Tabs
               value={activeTab}
               onValueChange={setActiveTab}
               className="w-full">
               <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                     value="all"
                     className="flex items-center space-x-2">
                     <span>All</span>
                     <Badge variant="secondary" className="ml-1">
                        {conversations.length}
                     </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                     value="unread"
                     className="flex items-center space-x-2">
                     <span>Unread</span>
                     {unreadConversations.length > 0 && (
                        <Badge variant="destructive" className="ml-1">
                           {unreadConversations.length}
                        </Badge>
                     )}
                  </TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
               </TabsList>
            </Tabs>
         </div>

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
