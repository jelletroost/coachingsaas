"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
   MoreVertical,
   Paperclip,
   Phone,
   Send,
   Smile,
   Video,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Conversation, Message } from "./mockData";

interface ChatWindowProps {
   conversation?: Conversation;
   messages: Message[];
   onSendMessage: (content: string) => void;
   onTyping: (isTyping: boolean) => void;
}

export default function ChatWindow({
   conversation,
   messages,
   onSendMessage,
   onTyping,
}: ChatWindowProps) {
   const [newMessage, setNewMessage] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const handleSendMessage = () => {
      if (newMessage.trim()) {
         onSendMessage(newMessage.trim());
         setNewMessage("");
         setIsTyping(false);
      }
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleSendMessage();
      }
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value);
      if (e.target.value.length > 0 && !isTyping) {
         setIsTyping(true);
         onTyping(true);
      } else if (e.target.value.length === 0 && isTyping) {
         setIsTyping(false);
         onTyping(false);
      }
   };

   const formatMessageTime = (timestamp: string) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   const formatMessageDate = (timestamp: string) => {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
         return "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
         return "Yesterday";
      } else {
         return date.toLocaleDateString();
      }
   };

   if (!conversation) {
      return (
         <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                     className="w-8 h-8 text-gray-400"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                     />
                  </svg>
               </div>
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
               </h3>
               <p className="text-gray-500">
                  Choose a patient to start messaging
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="flex flex-col h-full">
         {/* Chat Header */}
         <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
               <Avatar className="h-10 w-10">
                  <AvatarImage
                     src={conversation.patientAvatar}
                     alt={conversation.patientName}
                  />
                  <AvatarFallback>
                     {conversation.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <h3 className="text-sm font-medium text-gray-900">
                     {conversation.patientName}
                  </h3>
                  <div className="flex items-center space-x-2">
                     <div
                        className={`w-2 h-2 rounded-full ${
                           conversation.patientStatus === "online"
                              ? "bg-green-500"
                              : conversation.patientStatus === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                     />
                     <span className="text-xs text-gray-500 capitalize">
                        {conversation.patientStatus}
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex items-center space-x-2">
               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Phone className="h-4 w-4" />
               </Button>
               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Video className="h-4 w-4" />
               </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem>View Profile</DropdownMenuItem>
                     <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                     <DropdownMenuItem>Block</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                     <p className="text-sm">No messages yet</p>
                     <p className="text-xs mt-1">
                        Start the conversation with {conversation.patientName}
                     </p>
                  </div>
               </div>
            ) : (
               messages.map((message, index) => {
                  const isOwnMessage = message.senderType === "coach";
                  const showDate =
                     index === 0 ||
                     formatMessageDate(message.timestamp) !==
                        formatMessageDate(messages[index - 1]?.timestamp);

                  return (
                     <div key={message.id}>
                        {showDate && (
                           <div className="flex justify-center mb-4">
                              <Badge variant="secondary" className="text-xs">
                                 {formatMessageDate(message.timestamp)}
                              </Badge>
                           </div>
                        )}
                        <div
                           className={`flex ${
                              isOwnMessage ? "justify-end" : "justify-start"
                           }`}>
                           <div
                              className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                                 isOwnMessage
                                    ? "flex-row-reverse space-x-reverse"
                                    : ""
                              }`}>
                              {!isOwnMessage && (
                                 <Avatar className="h-6 w-6 flex-shrink-0">
                                    <AvatarImage
                                       src={conversation.patientAvatar}
                                       alt={conversation.patientName}
                                    />
                                    <AvatarFallback className="text-xs">
                                       {conversation.patientName
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                              )}
                              <div
                                 className={`rounded-lg px-3 py-2 ${
                                    isOwnMessage
                                       ? "bg-blue-600 text-white"
                                       : "bg-white text-gray-900 border border-gray-200"
                                 }`}>
                                 <p className="text-sm">{message.content}</p>
                                 <p
                                    className={`text-xs mt-1 ${
                                       isOwnMessage
                                          ? "text-blue-100"
                                          : "text-gray-500"
                                    }`}>
                                    {formatMessageTime(message.timestamp)}
                                    {isOwnMessage && (
                                       <span className="ml-2">
                                          {message.isRead ? "✓✓" : "✓"}
                                       </span>
                                    )}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
            <div ref={messagesEndRef} />
         </div>

         {/* Message Input */}
         <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="h-4 w-4" />
               </Button>
               <div className="flex-1 relative">
                  <Input
                     ref={inputRef}
                     value={newMessage}
                     onChange={handleInputChange}
                     onKeyPress={handleKeyPress}
                     placeholder="Type a message..."
                     className="pr-10"
                  />
                  <Button
                     variant="ghost"
                     size="sm"
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0">
                     <Smile className="h-4 w-4" />
                  </Button>
               </div>
               <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="h-8 w-8 p-0">
                  <Send className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}
