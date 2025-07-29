"use client";
 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
   Calendar,
   Eye,
   Mail,
   MoreHorizontal,
   Phone,
   Search,
   Shield,
   UserCheck,
   UserX,
} from "lucide-react";
import { useState } from "react";
import { User } from "./types";

interface UserTableProps {
   users: User[];
   onViewProfile: (user: User) => void;
   onSuspendUser: (user: User) => void;
   onActivateUser: (user: User) => void;
   onSendMessage: (user: User) => void;
}

const getRoleBadge = (role: User["role"]) => {
   const variants = {
      patient: "bg-blue-100 text-blue-800",
      coach: "bg-green-100 text-green-800",
      admin: "bg-purple-100 text-purple-800",
   };

   return (
      <Badge className={variants[role]}>
         {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
   );
};

const getStatusBadge = (status: User["status"]) => {
   const variants = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
   };

   return (
      <Badge className={variants[status]}>
         {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
   );
};

export function UserTable({
   users,
   onViewProfile,
   onSuspendUser,
   onActivateUser,
   onSendMessage,
}: UserTableProps) {
   const [searchTerm, setSearchTerm] = useState("");

   const filteredUsers = users.filter(
      (user) =>
         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle>Users ({filteredUsers.length})</CardTitle>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search users..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10 w-64"
                  />
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="border-b">
                        <th className="text-left p-3 font-medium">User</th>
                        <th className="text-left p-3 font-medium">Role</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Joined</th>
                        <th className="text-left p-3 font-medium">
                           Last Active
                        </th>
                        <th className="text-left p-3 font-medium">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredUsers.map((user) => (
                        <tr
                           key={user.id}
                           className="border-b hover:bg-muted/50">
                           <td className="p-3">
                              <div className="flex items-center space-x-3">
                                 <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                       {user.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <div className="font-medium">
                                       {user.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       {user.email}
                                    </div>
                                    {user.phone && (
                                       <div className="text-xs text-muted-foreground flex items-center">
                                          <Phone className="h-3 w-3 mr-1" />
                                          {user.phone}
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </td>
                           <td className="p-3">
                              <div className="flex items-center space-x-2">
                                 {getRoleBadge(user.role)}
                                 {user.role === "coach" && (
                                    <Shield className="h-4 w-4 text-green-600" />
                                 )}
                              </div>
                           </td>
                           <td className="p-3">
                              {getStatusBadge(user.status)}
                           </td>
                           <td className="p-3 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                 <Calendar className="h-3 w-3 mr-1" />
                                 {user.joinedDate}
                              </div>
                           </td>
                           <td className="p-3 text-sm text-muted-foreground">
                              {user.lastActive}
                           </td>
                           <td className="p-3">
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                       <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                       onClick={() => onViewProfile(user)}>
                                       <Eye className="h-4 w-4 mr-2" />
                                       View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       onClick={() => onSendMessage(user)}>
                                       <Mail className="h-4 w-4 mr-2" />
                                       Send Message
                                    </DropdownMenuItem>
                                    {user.status === "active" ? (
                                       <DropdownMenuItem
                                          onClick={() => onSuspendUser(user)}
                                          className="text-red-600">
                                          <UserX className="h-4 w-4 mr-2" />
                                          Suspend User
                                       </DropdownMenuItem>
                                    ) : (
                                       <DropdownMenuItem
                                          onClick={() => onActivateUser(user)}
                                          className="text-green-600">
                                          <UserCheck className="h-4 w-4 mr-2" />
                                          Activate User
                                       </DropdownMenuItem>
                                    )}
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {filteredUsers.length === 0 && (
               <div className="text-center py-8 text-muted-foreground">
                  <UserX className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No users found</p>
               </div>
            )}
         </CardContent>
      </Card>
   );
}
