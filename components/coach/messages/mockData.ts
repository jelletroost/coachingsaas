// Message and conversation data for coach messaging system
export interface Message {
   id: string;
   conversationId: string;
   senderId: string;
   senderType: "coach" | "patient";
   content: string;
   timestamp: string;
   isRead: boolean;
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

export interface Patient {
   id: string;
   name: string;
   email: string;
   avatar?: string;
   status: "online" | "offline" | "away";
   lastActive: string;
   unreadMessages: number;
   assignedCoach: string;
}

// Mock conversations data matching API format
export const conversationsData: Conversation[] = [
   {
      id: "cd4f5480-026b-456e-a679-323120497792",
      user_id: "fccdf17b-94b2-4cbe-b871-f3c32df45625",
      role: "member",
      last_read_message_id: null,
      created_at: "2025-09-23T12:30:21.759503+00:00",
      updated_at: "2025-09-23T12:30:21.759503+00:00",
      room_id:
         "fccdf17b-94b2-4cbe-b871-f3c32df456251b638786-1953-42e7-b0e2-baa84d701469",
      message_room: {
         id: "4da19483-8a91-4cfb-b5dd-face18226a92",
         name: "Shannon Heath",
         room_id:
            "fccdf17b-94b2-4cbe-b871-f3c32df456251b638786-1953-42e7-b0e2-baa84d701469",
         is_group: false,
         created_at: "2025-09-23T12:30:21.740012+00:00",
         updated_at: "2025-09-23T12:30:21.740012+00:00",
      },
   },
   {
      id: "cd4f5480-026b-456e-a679-323120497793",
      user_id: "fccdf17b-94b2-4cbe-b871-f3c32df45626",
      role: "member",
      last_read_message_id: null,
      created_at: "2025-09-23T11:30:21.759503+00:00",
      updated_at: "2025-09-23T11:30:21.759503+00:00",
      room_id:
         "fccdf17b-94b2-4cbe-b871-f3c32df456261b638786-1953-42e7-b0e2-baa84d701470",
      message_room: {
         id: "4da19483-8a91-4cfb-b5dd-face18226a93",
         name: "Mike Davis",
         room_id:
            "fccdf17b-94b2-4cbe-b871-f3c32df456261b638786-1953-42e7-b0e2-baa84d701470",
         is_group: false,
         created_at: "2025-09-23T11:30:21.740012+00:00",
         updated_at: "2025-09-23T11:30:21.740012+00:00",
      },
   },
   {
      id: "cd4f5480-026b-456e-a679-323120497794",
      user_id: "fccdf17b-94b2-4cbe-b871-f3c32df45627",
      role: "member",
      last_read_message_id: null,
      created_at: "2025-09-23T10:30:21.759503+00:00",
      updated_at: "2025-09-23T10:30:21.759503+00:00",
      room_id:
         "fccdf17b-94b2-4cbe-b871-f3c32df456271b638786-1953-42e7-b0e2-baa84d701471",
      message_room: {
         id: "4da19483-8a91-4cfb-b5dd-face18226a94",
         name: "Emma Wilson",
         room_id:
            "fccdf17b-94b2-4cbe-b871-f3c32df456271b638786-1953-42e7-b0e2-baa84d701471",
         is_group: false,
         created_at: "2025-09-23T10:30:21.740012+00:00",
         updated_at: "2025-09-23T10:30:21.740012+00:00",
      },
   },
   {
      id: "cd4f5480-026b-456e-a679-323120497795",
      user_id: "fccdf17b-94b2-4cbe-b871-f3c32df45628",
      role: "member",
      last_read_message_id: null,
      created_at: "2025-09-23T09:30:21.759503+00:00",
      updated_at: "2025-09-23T09:30:21.759503+00:00",
      room_id:
         "fccdf17b-94b2-4cbe-b871-f3c32df456281b638786-1953-42e7-b0e2-baa84d701472",
      message_room: {
         id: "4da19483-8a91-4cfb-b5dd-face18226a95",
         name: "David Brown",
         room_id:
            "fccdf17b-94b2-4cbe-b871-f3c32df456281b638786-1953-42e7-b0e2-baa84d701472",
         is_group: false,
         created_at: "2025-09-23T09:30:21.740012+00:00",
         updated_at: "2025-09-23T09:30:21.740012+00:00",
      },
   },
   {
      id: "cd4f5480-026b-456e-a679-323120497796",
      user_id: "fccdf17b-94b2-4cbe-b871-f3c32df45629",
      role: "member",
      last_read_message_id: null,
      created_at: "2025-09-23T08:30:21.759503+00:00",
      updated_at: "2025-09-23T08:30:21.759503+00:00",
      room_id:
         "fccdf17b-94b2-4cbe-b871-f3c32df456291b638786-1953-42e7-b0e2-baa84d701473",
      message_room: {
         id: "4da19483-8a91-4cfb-b5dd-face18226a96",
         name: "Lisa Chen",
         room_id:
            "fccdf17b-94b2-4cbe-b871-f3c32df456291b638786-1953-42e7-b0e2-baa84d701473",
         is_group: false,
         created_at: "2025-09-23T08:30:21.740012+00:00",
         updated_at: "2025-09-23T08:30:21.740012+00:00",
      },
   },
   {
      id: "cd4f5480-026b-456e-a679-323120497797",
      user_id: "fccdf17b-94b2-4cbe-b871-f3c32df45630",
      role: "member",
      last_read_message_id: null,
      created_at: "2025-09-23T07:30:21.759503+00:00",
      updated_at: "2025-09-23T07:30:21.759503+00:00",
      room_id:
         "fccdf17b-94b2-4cbe-b871-f3c32df456301b638786-1953-42e7-b0e2-baa84d701474",
      message_room: {
         id: "4da19483-8a91-4cfb-b5dd-face18226a97",
         name: "John Smith",
         room_id:
            "fccdf17b-94b2-4cbe-b871-f3c32df456301b638786-1953-42e7-b0e2-baa84d701474",
         is_group: false,
         created_at: "2025-09-23T07:30:21.740012+00:00",
         updated_at: "2025-09-23T07:30:21.740012+00:00",
      },
   },
];

// Mock messages data
export const messagesData: Message[] = [
   // Conversation 1 - Sarah Johnson
   {
      id: "msg_1_1",
      conversationId: "conv_1",
      senderId: "coach_1",
      senderType: "coach",
      content: "Hi Sarah! How are you feeling today?",
      timestamp: "2024-01-20T10:00:00Z",
      isRead: true,
   },
   {
      id: "msg_1_2",
      conversationId: "conv_1",
      senderId: "1",
      senderType: "patient",
      content:
         "I'm doing well, thank you! I've been following the exercise routine you recommended.",
      timestamp: "2024-01-20T10:05:00Z",
      isRead: true,
   },
   {
      id: "msg_1_3",
      conversationId: "conv_1",
      senderId: "coach_1",
      senderType: "coach",
      content:
         "That's excellent! How many days have you been able to exercise this week?",
      timestamp: "2024-01-20T10:10:00Z",
      isRead: true,
   },
   {
      id: "msg_1_4",
      conversationId: "conv_1",
      senderId: "1",
      senderType: "patient",
      content:
         "Thank you for the exercise recommendations! I've been following them and feeling much better.",
      timestamp: "2024-01-20T10:30:00Z",
      isRead: true,
   },

   // Conversation 2 - Mike Davis
   {
      id: "msg_2_1",
      conversationId: "conv_2",
      senderId: "2",
      senderType: "patient",
      content: "Dr. Chen, I started the new medication yesterday.",
      timestamp: "2024-01-20T09:45:00Z",
      isRead: true,
   },
   {
      id: "msg_2_2",
      conversationId: "conv_2",
      senderId: "coach_1",
      senderType: "coach",
      content: "How are you feeling with it? Any side effects?",
      timestamp: "2024-01-20T10:00:00Z",
      isRead: true,
   },
   {
      id: "msg_2_3",
      conversationId: "conv_2",
      senderId: "2",
      senderType: "patient",
      content:
         "I'm experiencing some side effects from the new medication. Should I be concerned?",
      timestamp: "2024-01-20T10:15:00Z",
      isRead: false,
   },

   // Conversation 3 - Emma Wilson
   {
      id: "msg_3_1",
      conversationId: "conv_3",
      senderId: "3",
      senderType: "patient",
      content: "Dr. Chen, I have some exciting news!",
      timestamp: "2024-01-20T09:00:00Z",
      isRead: true,
   },
   {
      id: "msg_3_2",
      conversationId: "conv_3",
      senderId: "coach_1",
      senderType: "coach",
      content: "I'd love to hear it, Emma! What's the good news?",
      timestamp: "2024-01-20T09:15:00Z",
      isRead: true,
   },
   {
      id: "msg_3_3",
      conversationId: "conv_3",
      senderId: "3",
      senderType: "patient",
      content: "Great news! I've achieved my fitness goal for this month.",
      timestamp: "2024-01-20T09:30:00Z",
      isRead: true,
   },

   // Conversation 4 - David Brown
   {
      id: "msg_4_1",
      conversationId: "conv_4",
      senderId: "4",
      senderType: "patient",
      content: "Hi Dr. Chen, I'm having trouble with meal planning.",
      timestamp: "2024-01-20T07:00:00Z",
      isRead: true,
   },
   {
      id: "msg_4_2",
      conversationId: "conv_4",
      senderId: "coach_1",
      senderType: "coach",
      content:
         "I understand meal planning can be challenging. What specific issues are you facing?",
      timestamp: "2024-01-20T07:15:00Z",
      isRead: true,
   },
   {
      id: "msg_4_3",
      conversationId: "conv_4",
      senderId: "4",
      senderType: "patient",
      content: "Can you help me with meal planning for next week?",
      timestamp: "2024-01-20T07:30:00Z",
      isRead: false,
   },
   {
      id: "msg_4_4",
      conversationId: "conv_4",
      senderId: "4",
      senderType: "patient",
      content: "I'm particularly struggling with breakfast options.",
      timestamp: "2024-01-20T07:31:00Z",
      isRead: false,
   },
];

// Mock patients data
export const patientsData: Patient[] = [
   {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/avatars/sarah.jpg",
      status: "online",
      lastActive: "2024-01-20T10:30:00Z",
      unreadMessages: 0,
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "2",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      avatar: "/avatars/mike.jpg",
      status: "away",
      lastActive: "2024-01-20T10:15:00Z",
      unreadMessages: 1,
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar: "/avatars/emma.jpg",
      status: "offline",
      lastActive: "2024-01-20T09:30:00Z",
      unreadMessages: 0,
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "4",
      name: "David Brown",
      email: "david.brown@email.com",
      avatar: "/avatars/david.jpg",
      status: "offline",
      lastActive: "2024-01-20T07:30:00Z",
      unreadMessages: 2,
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "5",
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      avatar: "/avatars/lisa.jpg",
      status: "offline",
      lastActive: "2024-01-19T14:20:00Z",
      unreadMessages: 0,
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "6",
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "/avatars/john.jpg",
      status: "offline",
      lastActive: "2024-01-18T16:45:00Z",
      unreadMessages: 0,
      assignedCoach: "Dr. Michael Chen",
   },
];

// Helper functions
export const getMessagesByConversationId = (
   conversationId: string
): Message[] => {
   return messagesData.filter((msg) => msg.conversationId === conversationId);
};

export const getConversationById = (
   conversationId: string
): Conversation | undefined => {
   return conversationsData.find((conv) => conv.id === conversationId);
};

export const getPatientById = (patientId: string): Patient | undefined => {
   return patientsData.find((patient) => patient.id === patientId);
};

export const getUnreadConversations = (): Conversation[] => {
   // For API format, we'll consider conversations with null last_read_message_id as unread
   return conversationsData.filter(
      (conv) => conv.last_read_message_id === null
   );
};

export const getTotalUnreadMessages = (): number => {
   // For API format, count conversations with null last_read_message_id
   return conversationsData.filter((conv) => conv.last_read_message_id === null)
      .length;
};
