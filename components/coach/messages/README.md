# Coach Messages System

A comprehensive messaging system for coaches to communicate with their patients in real-time.

## Components

### MessagesManagement

The main component that orchestrates the entire messaging interface. It combines the message list and chat window, handles state management, and provides filtering and search functionality.

**Features:**

-  Conversation list with patient status indicators
-  Real-time chat interface
-  Search and filter conversations
-  Tab-based organization (All, Unread, Active, Archived)
-  Unread message counters
-  Message sending and receiving

### MessageList

Displays the list of conversations with patients. Shows patient avatars, online status, last message preview, and unread message counts.

**Features:**

-  Search conversations
-  Patient status indicators (online/away/offline)
-  Unread message badges
-  Conversation actions (archive, delete)
-  Responsive design

### ChatWindow

The main chat interface where coaches can send and receive messages with patients.

**Features:**

-  Real-time message display
-  Message timestamps and read receipts
-  Typing indicators
-  File attachment support (UI ready)
-  Emoji picker (UI ready)
-  Voice/video call buttons
-  Patient profile quick access

## Data Structure

### Conversation

```typescript
interface Conversation {
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

## Usage

```tsx
import { MessagesManagement } from "@/components/coach/messages";

export default function MessagesPage() {
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

-  Search conversations by patient name or message content
-  Filter by unread, active, or archived conversations
-  Archive and delete conversations
-  Mark messages as read

### User Experience

-  Responsive design for desktop and mobile
-  Smooth animations and transitions
-  Intuitive interface with clear visual hierarchy
-  Accessibility features

### Future Enhancements

-  Real-time notifications
-  File sharing and attachments
-  Voice and video calls
-  Message reactions and emojis
-  Message threading and replies
-  Message encryption
-  Message templates and quick replies

## Mock Data

The system includes comprehensive mock data for testing and development:

-  6 sample patients with different statuses
-  Multiple conversations with realistic message history
-  Various message types and timestamps
-  Patient profiles with avatars and health information

## Styling

The components use Tailwind CSS for styling and are built with the shadcn/ui component library for consistency with the rest of the application.
