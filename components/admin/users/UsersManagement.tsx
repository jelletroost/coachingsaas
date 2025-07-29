"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { transformUserForComponent, useUsers } from "@/hooks/useUsers";
import {
   Download,
   Filter,
   Loader2,
   Shield,
   User,
   UserCheck,
   UserPlus,
   Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AssignCoachModal } from "./AssignCoachModal";
import { type User as UserType } from "./types";
import { UserProfileModal } from "./UserProfileModal";
import { UserTable } from "./UserTable";
import { UserTabs } from "./UserTabs";

export function UsersManagement() {
   const { data: dbUsers, isLoading, error, refetch } = useUsers();
   const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
   const [isAssignCoachModalOpen, setIsAssignCoachModalOpen] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState<UserType | null>(null);

   // Transform database users to component format
   const users = dbUsers ? dbUsers.map(transformUserForComponent) as UserType[] : [];

   // Get coaches for assignment
   const coaches = users.filter((u: UserType) => u.role === "coach");

   // Calculate stats from real data
   const userStats = {
      total: users.length,
      patients: users.filter((u: UserType) => u.role === "patient").length,
      coaches: users.filter((u: UserType) => u.role === "coach").length,
      admins: users.filter((u: UserType) => u.role === "admin").length,
      active: users.filter((u: UserType) => u.status === "active").length,
      suspended: users.filter((u: UserType) => u.status === "suspended").length,
      pending: users.filter((u: UserType) => u.status === "pending").length,
   };

   const handleViewProfile = (user: UserType) => {
      setSelectedUser(user);
      setIsProfileModalOpen(true);
   };

   const handleSuspendUser = (user: UserType) => {
      // TODO: Implement actual API call to suspend user
      toast.success(`${user.name} has been suspended`);
      refetch(); // Refresh data after action
   };

   const handleActivateUser = (user: UserType) => {
      // TODO: Implement actual API call to activate user
      toast.success(`${user.name} has been activated`);
      refetch(); // Refresh data after action
   };

   const handleSendMessage = (user: UserType) => {
      toast.success(`Message sent to ${user.name}`);
   };

   const handleAddUser = () => {
      toast.success("Add user functionality coming soon!");
   };

   const handleExportUsers = () => {
      toast.success("Export functionality coming soon!");
   };

   const handleAssignCoach = (user: UserType) => {
      setSelectedPatient(user);
      setIsAssignCoachModalOpen(true);
   };

   const handleAssignCoachSuccess = () => {
      refetch(); // Refresh data after assignment
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
               <Loader2 className="h-6 w-6 animate-spin" />
               <span>Loading users...</span>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="text-center">
               <p className="text-red-600 mb-4">Error loading users</p>
               <Button onClick={() => refetch()}>Retry</Button>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{userStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     All platform users
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Patients
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{userStats.patients}</div>
                  <p className="text-xs text-muted-foreground">
                     Active patients
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Coaches</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{userStats.coaches}</div>
                  <p className="text-xs text-muted-foreground">
                     Certified coaches
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admins</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{userStats.admins}</div>
                  <p className="text-xs text-muted-foreground">
                     Platform administrators
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Status Overview */}
         <Card>
            <CardHeader>
               <CardTitle className="text-sm font-medium">
                  User Status Overview
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                     <Badge className="bg-green-100 text-green-800">
                        Active: {userStats.active}
                     </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Badge className="bg-yellow-100 text-yellow-800">
                        Pending: {userStats.pending}
                     </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Badge className="bg-red-100 text-red-800">
                        Suspended: {userStats.suspended}
                     </Badge>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Actions Bar */}
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex space-x-2">
               <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
               </Button>
               <Button variant="outline" size="sm" onClick={handleExportUsers}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
               </Button>
               <Button size="sm" onClick={handleAddUser}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
               </Button>
            </div>
         </div>

         {/* Users Table with Tabs */}
         <UserTabs users={users}>
            {(filteredUsers) => (
               <UserTable
                  users={filteredUsers}
                  onViewProfile={handleViewProfile}
                  onSuspendUser={handleSuspendUser}
                  onActivateUser={handleActivateUser}
                  onSendMessage={handleSendMessage}
                  onAssignCoach={handleAssignCoach}
               />
            )}
         </UserTabs>

         {/* Modals */}
         <UserProfileModal
            user={selectedUser}
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            onSendMessage={handleSendMessage}
            onSuspend={handleSuspendUser}
            onActivate={handleActivateUser}
         />
         <AssignCoachModal
            patient={selectedPatient}
            coaches={coaches}
            isOpen={isAssignCoachModalOpen}
            onClose={() => setIsAssignCoachModalOpen(false)}
            onSuccess={handleAssignCoachSuccess}
         />
      </div>
   );
}
