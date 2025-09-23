"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile } from "lucide-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import MeetingScheduler, { MeetingData } from "./MeetingScheduler";
import { Conversation, Message } from "./mockData";

interface PatientProfile {
   id: string;
   name: string;
   email: string;
   avatar?: string;
}

interface ChatWindowProps {
   patientProfile: PatientProfile;
   conversation: Conversation;
   messages: Message[];
   onSendMessage: (content: string) => void;
   onTyping: (isTyping: boolean) => void;
   onAddMeetingMessage?: (meetingData: MeetingData) => void;
}

export default function ChatWindow({
   patientProfile,
   conversation,
   messages,
   onSendMessage,
   onTyping,
   onAddMeetingMessage,
}: ChatWindowProps) {
   const [newMessage, setNewMessage] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const [isMeetingSchedulerOpen, setIsMeetingSchedulerOpen] = useState(false);
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

   // const formatMessageTime = (timestamp: string) => {
   //    const date = new Date(timestamp);
   //    return date.toLocaleTimeString([], {
   //       hour: "2-digit",
   //       minute: "2-digit",
   //    });
   // };

   // const formatMessageDate = (timestamp: string) => {
   //    const date = new Date(timestamp);
   //    const today = new Date();
   //    const yesterday = new Date(today);
   //    yesterday.setDate(yesterday.getDate() - 1);

   //    if (date.toDateString() === today.toDateString()) {
   //       return "Today";
   //    } else if (date.toDateString() === yesterday.toDateString()) {
   //       return "Yesterday";
   //    } else {
   //       return date.toLocaleDateString();
   //    }
   // };

   const handleMeetingSubmit = (meetingData: MeetingData) => {
      // Create a meeting message and add it to the chat
      if (onAddMeetingMessage) {
         onAddMeetingMessage(meetingData);
      }

      // Show success message
      alert(
         `Meeting request submitted!\nType: ${
            meetingData.type
         }\nDate: ${meetingData.date.toDateString()}\nTime: ${meetingData.time}`
      );
   };

   return (
      <div className="flex flex-col h-full">
         {/* Chat Header */}
         <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
               <Avatar className="h-10 w-10">
                  <AvatarImage
                     src={conversation.coachAvatar}
                     alt={conversation.coachName}
                  />
                  <AvatarFallback>
                     {conversation.coachName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <h3 className="text-sm font-medium text-gray-900">
                     {conversation.coachName}
                  </h3>
                  <div className="flex items-center space-x-2">
                     <div
                        className={`w-2 h-2 rounded-full ${
                           conversation.coachStatus === "online"
                              ? "bg-green-500"
                              : conversation.coachStatus === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                     />
                     <span className="text-xs text-gray-500 capitalize">
                        {conversation.coachStatus}
                     </span>
                     <span className="text-xs text-blue-600">
                        {conversation.coachSpecialty}
                     </span>
                  </div>
               </div>
            </div>
            <Button onClick={() => setIsMeetingSchedulerOpen(true)}>
               Schedule a Meeting
            </Button>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages?.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                     <p className="text-sm">No messages yet</p>
                     <p className="text-xs mt-1">
                        Start the conversation with {conversation.coachName}
                     </p>
                  </div>
               </div>
            ) : (
               messages?.map((message, index) => {
                  const isOwnMessage = message.sender_id === patientProfile?.id;
                  const showDate =
                     index === 0 ||
                     moment(message.created_at).format("YYYY-MM-DD") !==
                        moment(messages[index - 1]?.created_at).format(
                           "YYYY-MM-DD"
                        );

                  return (
                     <div key={message.id}>
                        {showDate && (
                           <div className="flex justify-center mb-4">
                              <Badge variant="secondary" className="text-xs">
                                 {moment(message.created_at).format(
                                    "YYYY-MM-DD"
                                 )}
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
                                       src={conversation.coachAvatar}
                                       alt={conversation.coachName}
                                    />
                                    <AvatarFallback className="text-xs">
                                       {conversation.coachName
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                              )}
                              {message.content.includes("Meeting scheduled") ? (
                                 // <MeetingMessage
                                 //    message={message}
                                 //    isOwnMessage={isOwnMessage}
                                 // />
                                 <p>Meeting</p>
                              ) : (
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
                                       {/* {formatMessageTime(message.timestamp)}
                                       {isOwnMessage && (
                                          <span className="ml-2">
                                             {message.isRead ? "✓✓" : "✓"}
                                          </span>
                                       )} */}
                                    </p>
                                 </div>
                              )}
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

         {/* Meeting Scheduler Modal */}
         {conversation && (
            <MeetingScheduler
               isOpen={isMeetingSchedulerOpen}
               onClose={() => setIsMeetingSchedulerOpen(false)}
               coachName={conversation.coachName}
               onSubmit={handleMeetingSubmit}
            />
         )}
      </div>
   );
}
