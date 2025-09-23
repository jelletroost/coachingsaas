// Message and conversation data for coach messaging system
export interface Message {
   id?: string;
   conversationId: string;
   room_id?: string;
   sender_id: string;
   senderType: "coach" | "patient";
   content: string;
   timestamp: string;
   isRead: boolean;
   is_error?: boolean;
   meeting_id?: {
      id?: string;
      type: string;
      senderId?: string;
      date: Date;
      meeting_link?: string;
      time: string;
      duration: number;
      notes: string;
      status: string;
   };
   attachments?: {
      type: "image" | "document" | "video";
      url: string;
      name: string;
   }[];
}

export interface Conversation {
   id: string;
   user_id: string;
   role: string;
   last_read_message_id: string | null;
   created_at: string;
   updated_at: string;
   room_id: string;
   message_room: {
      id: string;
      name: string;
      room_id: string;
      is_group: boolean;
      created_at: string;
      updated_at: string;
   };
}
