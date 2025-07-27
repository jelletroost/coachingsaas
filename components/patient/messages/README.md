# Patient Messages System

A comprehensive messaging system for patients to communicate with their health coaches in real-time.

## Components

### MessagesManagement

The main component that orchestrates the entire messaging interface. It combines the message list and chat window, handles state management, and provides filtering and search functionality.

**Features:**

-  Conversation list with coach status indicators
-  Real-time chat interface
-  Search and filter conversations
-  Tab-based organization (All, Unread, Active, Archived)
-  Unread message counters
-  Message sending and receiving

### MessageList

Displays the list of conversations with coaches. Shows coach avatars, online status, last message preview, and unread message counts.

**Features:**

-  Search conversations
-  Coach status indicators (online/away/offline)
-  Unread message badges
-  Conversation actions (archive, delete)
-  Responsive design

### ChatWindow

The main chat interface where patients can send and receive messages with their coaches.

**Features:**

-  Real-time message display
-  Message timestamps and read receipts
-  Typing indicators
-  File attachment support (UI ready)
-  Emoji picker (UI ready)
-  Voice/video call buttons
-  Coach profile quick access

## Data Structure

### Conversation

```typescript
interface Conversation {
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
```

### Message

```typescript
interface Message {
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
```

### Coach

```typescript
interface Coach {
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
```

## Usage

```tsx
import { MessagesManagement } from "@/components/patient/messages";

export default function PatientMessagesPage() {
   return (
      <div className="p-6">
         <MessagesManagement />
      </div>
   );
}
```

## Features

### Real-time Messaging

-  Send and receive messages instantly
-  Message read receipts
-  Typing indicators
-  Online/offline status

### Conversation Management

-  Search conversations by coach name or message content
-  Filter by unread, active, or archived conversations
-  Archive and delete conversations
-  Mark messages as read

### User Experience

-  Responsive design for desktop and mobile
-  Smooth animations and transitions
-  Intuitive interface with clear visual hierarchy
-  Accessibility features

### Patient-Specific Features

-  Coach specialty display
-  Coach ratings and experience
-  Quick access to coach profiles
-  Appointment scheduling integration
-  Health goal tracking integration

### Future Enhancements

-  Real-time notifications
-  File sharing and attachments
-  Voice and video calls
-  Message reactions and emojis
-  Message threading and replies
-  Message encryption
-  Message templates and quick replies
-  Health data sharing
-  Appointment reminders

## Mock Data

The system includes comprehensive mock data for testing and development:

-  3 sample coaches with different specialties and statuses
-  Multiple conversations with realistic message history
-  Various message types and timestamps
-  Coach profiles with avatars and health information

## Styling

The components use Tailwind CSS for styling and are built with the shadcn/ui component library for consistency with the rest of the application.

## Patient vs Coach Perspective

This system is specifically designed for the patient perspective, with the following key differences from the coach messaging system:

-  **Coach-focused interface**: Shows coach information prominently
-  **Specialty display**: Highlights coach specialties and expertise
-  **Patient actions**: Actions are tailored for patient needs (find coach, schedule appointments)
-  **Health context**: Designed to integrate with health tracking and goal management
-  **Simplified navigation**: Focused on patient-coach communication rather than managing multiple patients
