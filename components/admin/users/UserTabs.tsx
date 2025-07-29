import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, UserCheck, User as UserIcon, Users } from "lucide-react";
import { User } from "./types";

interface UserTabsProps {
   users: User[];
   children: (filteredUsers: User[]) => React.ReactNode;
}

export function UserTabs({ users, children }: UserTabsProps) {
   const patients = users.filter((user) => user.role === "patient");
   const coaches = users.filter((user) => user.role === "coach");
   const admins = users.filter((user) => user.role === "admin");

   return (
      <Tabs defaultValue="all" className="w-full">
         <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center space-x-2">
               <Users className="h-4 w-4" />
               <span>All</span>
               <Badge variant="secondary" className="ml-1">
                  {users.length}
               </Badge>
            </TabsTrigger>
            <TabsTrigger
               value="patients"
               className="flex items-center space-x-2">
               <UserIcon className="h-4 w-4" />
               <span>Patients</span>
               <Badge variant="secondary" className="ml-1">
                  {patients.length}
               </Badge>
            </TabsTrigger>
            <TabsTrigger
               value="coaches"
               className="flex items-center space-x-2">
               <UserCheck className="h-4 w-4" />
               <span>Coaches</span>
               <Badge variant="secondary" className="ml-1">
                  {coaches.length}
               </Badge>
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center space-x-2">
               <Shield className="h-4 w-4" />
               <span>Admins</span>
               <Badge variant="secondary" className="ml-1">
                  {admins.length}
               </Badge>
            </TabsTrigger>
         </TabsList>

         <TabsContent value="all" className="mt-6">
            {children(users)}
         </TabsContent>

         <TabsContent value="patients" className="mt-6">
            {children(patients)}
         </TabsContent>

         <TabsContent value="coaches" className="mt-6">
            {children(coaches)}
         </TabsContent>

         <TabsContent value="admins" className="mt-6">
            {children(admins)}
         </TabsContent>
      </Tabs>
   );
}
