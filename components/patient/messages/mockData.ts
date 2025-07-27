// Message and conversation data for patient messaging system
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
   coachId: string;
   coachName: string;
   coachAvatar?: string;
   coachSpecialty: string;
   lastMessage: string;
   lastMessageTime: string;
   unreadCount: number;
   status: "active" | "archived";
   lastActivity: string;
   coachStatus: "online" | "offline" | "away";
}

export interface Coach {
   id: string;
   name: string;
   email: string;
   avatar?: string;
   specialty: string;
   status: "online" | "offline" | "away";
   lastActive: string;
   unreadMessages: number;
   rating: number;
   experience: string;
}

// Mock coaches data
export const coachesData: Coach[] = [
   {
      id: "coach_1",
      name: "Dr. Sarah Chen",
      email: "sarah.chen@healthcoach.com",
      avatar: "/avatars/sarah-chen.jpg",
      specialty: "Cardiovascular Health",
      status: "online",
      lastActive: "2024-01-20T10:30:00Z",
      unreadMessages: 2,
      rating: 4.8,
      experience: "8 years",
   },
   {
      id: "coach_2",
      name: "Dr. Michael Rodriguez",
      email: "michael.rodriguez@healthcoach.com",
      avatar: "/avatars/michael-rodriguez.jpg",
      specialty: "Nutrition & Wellness",
      status: "away",
      lastActive: "2024-01-20T09:15:00Z",
      unreadMessages: 0,
      rating: 4.9,
      experience: "12 years",
   },
   {
      id: "coach_3",
      name: "Dr. Emily Johnson",
      email: "emily.johnson@healthcoach.com",
      avatar: "/avatars/emily-johnson.jpg",
      specialty: "Mental Health",
      status: "offline",
      lastActive: "2024-01-19T16:45:00Z",
      unreadMessages: 1,
      rating: 4.7,
      experience: "6 years",
   },
];

// Mock conversations data
export const conversationsData: Conversation[] = [
   {
      id: "conv_1",
      coachId: "coach_1",
      coachName: "Dr. Sarah Chen",
      coachAvatar: "/avatars/sarah-chen.jpg",
      coachSpecialty: "Cardiovascular Health",
      lastMessage:
         "That's excellent! How many days have you been able to exercise this week?",
      lastMessageTime: "2024-01-20T10:10:00Z",
      unreadCount: 0,
      status: "active",
      lastActivity: "2024-01-20T10:30:00Z",
      coachStatus: "online",
   },
   {
      id: "conv_2",
      coachId: "coach_2",
      coachName: "Dr. Michael Rodriguez",
      coachAvatar: "/avatars/michael-rodriguez.jpg",
      coachSpecialty: "Nutrition & Wellness",
      lastMessage:
         "Great progress on your meal plan! Let's discuss your next goals.",
      lastMessageTime: "2024-01-20T09:00:00Z",
      unreadCount: 2,
      status: "active",
      lastActivity: "2024-01-20T09:15:00Z",
      coachStatus: "away",
   },
   {
      id: "conv_3",
      coachId: "coach_3",
      coachName: "Dr. Emily Johnson",
      coachAvatar: "/avatars/emily-johnson.jpg",
      coachSpecialty: "Mental Health",
      lastMessage: "How are you feeling with the new meditation techniques?",
      lastMessageTime: "2024-01-19T16:30:00Z",
      unreadCount: 1,
      status: "active",
      lastActivity: "2024-01-19T16:45:00Z",
      coachStatus: "offline",
   },
];

// Mock messages data
export const messagesData: Message[] = [
   // Conversation 1 - Dr. Sarah Chen
   {
      id: "msg_1_1",
      conversationId: "conv_1",
      senderId: "coach_1",
      senderType: "coach",
      content: "Hi! How are you feeling today?",
      timestamp: "2024-01-20T10:00:00Z",
      isRead: true,
   },
   {
      id: "msg_1_2",
      conversationId: "conv_1",
      senderId: "patient_1",
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
      senderId: "patient_1",
      senderType: "patient",
      content:
         "I've been able to exercise 4 days this week. Feeling much stronger!",
      timestamp: "2024-01-20T10:30:00Z",
      isRead: true,
   },

   // Conversation 2 - Dr. Michael Rodriguez
   {
      id: "msg_2_1",
      conversationId: "conv_2",
      senderId: "coach_2",
      senderType: "coach",
      content:
         "Great progress on your meal plan! Let's discuss your next goals.",
      timestamp: "2024-01-20T09:00:00Z",
      isRead: false,
   },
   {
      id: "msg_2_2",
      conversationId: "conv_2",
      senderId: "coach_2",
      senderType: "coach",
      content:
         "I've prepared some new recipes that should help with your energy levels.",
      timestamp: "2024-01-20T09:15:00Z",
      isRead: false,
   },

   // Conversation 3 - Dr. Emily Johnson
   {
      id: "msg_3_1",
      conversationId: "conv_3",
      senderId: "coach_3",
      senderType: "coach",
      content: "How are you feeling with the new meditation techniques?",
      timestamp: "2024-01-19T16:30:00Z",
      isRead: false,
   },
];

// Helper functions
export const getConversationById = (id: string): Conversation | undefined => {
   return conversationsData.find((conv) => conv.id === id);
};

export const getMessagesByConversationId = (
   conversationId: string
): Message[] => {
   return messagesData.filter((msg) => msg.conversationId === conversationId);
};

export const getTotalUnreadMessages = (): number => {
   return conversationsData.reduce(
      (total, conv) => total + conv.unreadCount,
      0
   );
};

export const getUnreadConversations = (): Conversation[] => {
   return conversationsData.filter((conv) => conv.unreadCount > 0);
};

export const getCoachById = (id: string): Coach | undefined => {
   return coachesData.find((coach) => coach.id === id);
};
