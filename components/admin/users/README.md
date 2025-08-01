# User Management Components

This directory contains modular components for managing users in the admin panel of the health coaching platform.

## Components

### Core Components

-  **UsersManagement** - Main component that combines all user management features
-  **UserTable** - Table component for displaying users with search and actions
-  **UserTabs** - Tab component for filtering users by role (All, Patients, Coaches, Admins)
-  **UserProfileModal** - Modal for viewing detailed user profiles
-  **UserEditModal** - Modal for editing user information

### Data

-  **mockData** - Mock user data and statistics for development

## Features

### User Management Dashboard

-  **Statistics Cards** - Overview of total users, patients, coaches, and admins
-  **Status Overview** - Quick view of active, pending, and suspended users
-  **Action Bar** - Filter, export, and add user functionality
-  **Tabbed Interface** - Filter users by role with count badges

### User Table

-  **Search Functionality** - Search by name or email
-  **User Information** - Avatar, name, email, phone, role, status
-  **Action Menu** - View profile, edit, send message, suspend/activate
-  **Responsive Design** - Works on all screen sizes

### User Profile Modal

-  **Detailed Information** - Complete user profile with bio, location, etc.
-  **Role-specific Data** - Specializations for coaches, subscriptions for patients
-  **Quick Actions** - Edit, message, suspend/activate from profile view

### User Edit Modal

-  **Form-based Editing** - Edit all user fields with validation
-  **Role-specific Fields** - Different fields for patients vs coaches
-  **Dynamic Lists** - Add/remove specializations and certifications for coaches

## Usage

```tsx
import { UsersManagement } from "@/components/admin/users/UsersManagement";

export default function AdminUsersPage() {
   return (
      <div className="p-6">
         <UsersManagement />
      </div>
   );
}
```

## Individual Components

### UserTable

```tsx
import { UserTable } from "@/components/admin/users/UserTable";

<UserTable
   users={users}
   onViewProfile={handleViewProfile}
   onEditUser={handleEditUser}
   onSuspendUser={handleSuspendUser}
   onActivateUser={handleActivateUser}
   onSendMessage={handleSendMessage}
/>;
```

### UserTabs

```tsx
import { UserTabs } from "@/components/admin/users/UserTabs";

<UserTabs users={users}>
   {(filteredUsers) => <UserTable users={filteredUsers} />}
</UserTabs>;
```

### UserProfileModal

```tsx
import { UserProfileModal } from "@/components/admin/users/UserProfileModal";

<UserProfileModal
   user={selectedUser}
   isOpen={isModalOpen}
   onClose={() => setIsModalOpen(false)}
   onEdit={handleEdit}
   onSendMessage={handleMessage}
   onSuspend={handleSuspend}
   onActivate={handleActivate}
/>;
```

## Data Structure

### User Interface

```typescript
interface User {
   id: string;
   name: string;
   email: string;
   role: "patient" | "coach" | "admin";
   status: "active" | "suspended" | "pending";
   avatar?: string;
   phone?: string;
   joinedDate: string;
   lastActive: string;
   subscription?: string;
   coach?: string;
   location?: string;
   bio?: string;
   specializations?: string[];
   certifications?: string[];
}
```

### User Statistics

```typescript
interface UserStats {
   total: number;
   patients: number;
   coaches: number;
   admins: number;
   active: number;
   suspended: number;
   pending: number;
}
```

## Actions Available

### User Actions

-  **View Profile** - Open detailed user profile modal
-  **Edit User** - Open user edit modal
-  **Send Message** - Send direct message to user
-  **Suspend User** - Suspend user account
-  **Activate User** - Reactivate suspended user

### Bulk Actions

-  **Filter Users** - Advanced filtering options
-  **Export Users** - Export user data to CSV/Excel
-  **Add User** - Create new user account

## Mock Data

The component includes comprehensive mock data with:

-  5 patients with different statuses
-  4 coaches with specializations and certifications
-  2 admin users
-  Realistic user information and statistics

## Customization

All components are highly customizable:

-  Colors and styling via Tailwind classes
-  Data structure can be modified for different user types
-  Actions can be extended with additional functionality
-  Modals can be customized with additional fields

## Dependencies

-  `@/components/ui/*` - UI components from the design system
-  `lucide-react` - Icons
-  `react-hot-toast` - Toast notifications
-  `tailwindcss` - Styling
