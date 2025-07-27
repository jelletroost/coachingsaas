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
import { Archive, MoreVertical, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Conversation } from "./mockData";

interface MessageListProps {
   conversations: Conversation[];
   selectedConversationId?: string;
   onSelectConversation: (conversationId: string) => void;
   onSearch: (query: string) => void;
}

export default function MessageList({
   conversations,
   selectedConversationId,
   onSelectConversation,
   onSearch,
}: MessageListProps) {
   const [searchQuery, setSearchQuery] = useState("");

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case "online":
            return "bg-green-500";
         case "away":
            return "bg-yellow-500";
         case "offline":
            return "bg-gray-400";
         default:
            return "bg-gray-400";
      }
   };

   const formatLastMessageTime = (timestamp: string) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 1) {
         return "Just now";
      } else if (diffInHours < 24) {
         return `${Math.floor(diffInHours)}h ago`;
      } else if (diffInHours < 48) {
         return "Yesterday";
      } else {
         return date.toLocaleDateString();
      }
   };

   return (
      <div className="flex flex-col h-full border-r border-gray-200">
         {/* Header */}
         <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
               My Coaches
            </h2>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
               <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
               />
            </div>
         </div>

         {/* Conversations List */}
         <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                     <p className="text-sm">No conversations found</p>
                     <p className="text-xs mt-1">
                        Start a conversation with your coach
                     </p>
                  </div>
               </div>
            ) : (
               conversations.map((conversation) => (
                  <div
                     key={conversation.id}
                     className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversationId === conversation.id
                           ? "bg-blue-50 border-l-4 border-l-blue-500"
                           : ""
                     }`}
                     onClick={() => onSelectConversation(conversation.id)}>
                     <div className="flex items-start space-x-3">
                        {/* Avatar with status indicator */}
                        <div className="relative">
                           <Avatar className="h-12 w-12">
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
                           <div
                              className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                                 conversation.coachStatus
                              )}`}
                           />
                        </div>

                        {/* Conversation details */}
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between mb-1">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                 {conversation.coachName}
                              </h3>
                              <span className="text-xs text-gray-500">
                                 {formatLastMessageTime(
                                    conversation.lastMessageTime
                                 )}
                              </span>
                           </div>
                           <p className="text-xs text-blue-600 mb-1">
                              {conversation.coachSpecialty}
                           </p>
                           <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage}
                           </p>
                        </div>

                        {/* Unread count and actions */}
                        <div className="flex flex-col items-end space-y-2">
                           {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                 {conversation.unreadCount}
                              </Badge>
                           )}
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="h-4 w-4" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                 <DropdownMenuItem>
                                    <Archive className="mr-2 h-4 w-4" />
                                    Archive
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
