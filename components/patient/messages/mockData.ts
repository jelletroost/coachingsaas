// Message and conversation data for patient messaging system
export interface Message {
   id?: string;
   room_id: string;
   sender_id: string;
   content: string;
   created_at?: string;
   meeting_id?: {
      type: string;
      senderId?: string;
      date: Date;
      meeting_link?: string;
      time: string;
      duration: number;
      notes: string;
      status: string;
   };
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
];

// Mock conversations data - Patient only has one assigned coach
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
];

// // Mock messages data - Only messages from assigned coach
// export const messagesData: Message[] = [
//    // Conversation with assigned coach - Dr. Sarah Chen
//    {
//       room_id: "conv_1",
//       sender_id: "coach_1",
//       content: "Hi! How are you feeling today?",
//    },
//    {
//       room_id: "conv_1",
//       sender_id: "patient_1",
//       content:
//          "I'm doing well, thank you! I've been following the exercise routine you recommended.",
//    },
//    {
//       room_id: "conv_1",
//       sender_id: "coach_1",
//       content:
//          "That's excellent! How many days have you been able to exercise this week?",
//    },
//    {
//       room_id: "conv_1",
//       sender_id: "patient_1",
//       content:
//          "I've been able to exercise 4 days this week. Feeling much stronger!",
//    },
//    {
//       room_id: "conv_1",
//       sender_id: "patient_1",
//       content: "Meeting scheduled: Phone Call on Mon Jan 22 2024 at 14:00",
//    },
//    {
//       room_id: "conv_1",
//       sender_id: "coach_1",
//       content: "Meeting confirmed: Google Meet on Tomorrow at 15:30",
//    },
// ];

// Helper functions
export const getConversationById = (id: string): Conversation | undefined => {
   return conversationsData.find((conv) => conv.id === id);
};

// export const getMessagesByConversationId = (roomId: string): Message[] => {
//    return messagesData.filter((msg) => msg.room_id === roomId);
// };

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
