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
   patientId: string;
   patientName: string;
   patientAvatar?: string;
   lastMessage: string;
   lastMessageTime: string;
   unreadCount: number;
   status: "active" | "archived";
   lastActivity: string;
   patientStatus: "online" | "offline" | "away";
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

// Mock conversations data
export const conversationsData: Conversation[] = [
   {
      id: "conv_1",
      patientId: "1",
      patientName: "Sarah Johnson",
      patientAvatar: "/avatars/sarah.jpg",
      lastMessage:
         "Thank you for the exercise recommendations! I've been following them and feeling much better.",
      lastMessageTime: "2 minutes ago",
      unreadCount: 0,
      status: "active",
      lastActivity: "2024-01-20T10:30:00Z",
      patientStatus: "online",
   },
   {
      id: "conv_2",
      patientId: "2",
      patientName: "Mike Davis",
      patientAvatar: "/avatars/mike.jpg",
      lastMessage:
         "I'm experiencing some side effects from the new medication. Should I be concerned?",
      lastMessageTime: "15 minutes ago",
      unreadCount: 1,
      status: "active",
      lastActivity: "2024-01-20T10:15:00Z",
      patientStatus: "away",
   },
   {
      id: "conv_3",
      patientId: "3",
      patientName: "Emma Wilson",
      patientAvatar: "/avatars/emma.jpg",
      lastMessage: "Great news! I've achieved my fitness goal for this month.",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      status: "active",
      lastActivity: "2024-01-20T09:30:00Z",
      patientStatus: "offline",
   },
   {
      id: "conv_4",
      patientId: "4",
      patientName: "David Brown",
      patientAvatar: "/avatars/david.jpg",
      lastMessage: "Can you help me with meal planning for next week?",
      lastMessageTime: "3 hours ago",
      unreadCount: 2,
      status: "active",
      lastActivity: "2024-01-20T07:30:00Z",
      patientStatus: "offline",
   },
   {
      id: "conv_5",
      patientId: "5",
      patientName: "Lisa Chen",
      patientAvatar: "/avatars/lisa.jpg",
      lastMessage: "I've been struggling with sleep lately. Any suggestions?",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      status: "active",
      lastActivity: "2024-01-19T14:20:00Z",
      patientStatus: "offline",
   },
   {
      id: "conv_6",
      patientId: "6",
      patientName: "John Smith",
      patientAvatar: "/avatars/john.jpg",
      lastMessage: "Looking forward to our first session next week!",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
      status: "active",
      lastActivity: "2024-01-18T16:45:00Z",
      patientStatus: "offline",
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
   return conversationsData.filter((conv) => conv.unreadCount > 0);
};

export const getTotalUnreadMessages = (): number => {
   return conversationsData.reduce(
      (total, conv) => total + conv.unreadCount,
      0
   );
};
