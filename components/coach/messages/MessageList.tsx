"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, MoreVertical, Trash2 } from "lucide-react";
import { Conversation } from "./mockData";

interface MessageListProps {
   conversations: Conversation[];
   selectedConversationId?: string;
   onSelectConversation: (conversationId: string) => void;
}

export default function MessageList({
   conversations,
   selectedConversationId,
   onSelectConversation,
}: MessageListProps) {
   const getStatusColor = () => {
      // For now, we'll show all conversations as online since we don't have status info in API
      return "bg-green-500";
   };

   const formatTime = (timestamp: string) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 1) {
         const diffInMinutes = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60)
         );
         return `${diffInMinutes}m ago`;
      } else if (diffInHours < 24) {
         return `${Math.floor(diffInHours)}h ago`;
      } else {
         return date.toLocaleDateString();
      }
   };

   return (
      <div className="flex flex-col h-full border-r border-gray-200">
         {/* Header */}
         <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
         </div>

         {/* Conversations List */}
         <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                     <p className="text-sm">No conversations found</p>
                     <p className="text-xs mt-1">
                        Start a conversation with your patients
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
                                 src={`/avatars/${conversation.message_room.name
                                    .toLowerCase()
                                    .replace(/\s+/g, "_")}.jpg`}
                                 alt={conversation.message_room.name}
                              />
                              <AvatarFallback>
                                 {conversation.message_room.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div
                              className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor()}`}
                           />
                        </div>

                        {/* Conversation details */}
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                 {conversation.message_room.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                 <span className="text-xs text-gray-500">
                                    {formatTime(conversation.updated_at)}
                                 </span>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0">
                                          <MoreVertical className="h-4 w-4" />
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                       <DropdownMenuItem>
                                          <Archive className="h-4 w-4 mr-2" />
                                          Archive
                                       </DropdownMenuItem>
                                       <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </div>
                           </div>
                           <p className="text-sm text-gray-600 truncate mt-1">
                              {conversation.message_room.is_group
                                 ? "Group conversation"
                                 : "Direct message"}
                           </p>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
