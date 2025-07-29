 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
   Calendar,
   Clock,
   Mail,
   MapPin,
   MessageSquare,
   Phone,
   Shield,
   UserCheck,
   UserX,
} from "lucide-react";
import { User } from "./types";

interface UserProfileModalProps {
   user: User | null;
   isOpen: boolean;
   onClose: () => void;
   onSendMessage: (user: User) => void;
   onSuspend: (user: User) => void;
   onActivate: (user: User) => void;
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

export function UserProfileModal({
   user,
   isOpen,
   onClose,
   onSendMessage,
   onSuspend,
   onActivate,
}: UserProfileModalProps) {
   if (!user) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>User Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
               {/* Header */}
               <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                     <AvatarImage src={user.avatar} />
                     <AvatarFallback className="text-lg">
                        {user.name
                           .split(" ")
                           .map((n) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                     <div className="flex items-center space-x-2 mb-2">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                     </div>

                     <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                           <Mail className="h-4 w-4 mr-2" />
                           {user.email}
                        </div>
                        {user.phone && (
                           <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {user.phone}
                           </div>
                        )}
                        {user.location && (
                           <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {user.location}
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="flex space-x-2">
                     <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSendMessage(user)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                     </Button>
                  </div>
               </div>

               <Separator />

               {/* Bio */}
               {user.bio && (
                  <div>
                     <h3 className="font-medium mb-2">Bio</h3>
                     <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </div>
               )}

               {/* Activity */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                     <Calendar className="h-4 w-4 text-muted-foreground" />
                     <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-xs text-muted-foreground">
                           {user.joinedDate}
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Clock className="h-4 w-4 text-muted-foreground" />
                     <div>
                        <p className="text-sm font-medium">Last Active</p>
                        <p className="text-xs text-muted-foreground">
                           {user.lastActive}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Role-specific information */}
               {user.role === "patient" && user.subscription && (
                  <div>
                     <h3 className="font-medium mb-2">Subscription</h3>
                     <Badge variant="outline">{user.subscription}</Badge>
                  </div>
               )}

               {user.role === "patient" && user.coach && (
                  <div>
                     <h3 className="font-medium mb-2">Assigned Coach</h3>
                     <p className="text-sm text-muted-foreground">
                        {user.coach}
                     </p>
                  </div>
               )}

               {user.role === "coach" && user.specializations && (
                  <div>
                     <h3 className="font-medium mb-2">Specializations</h3>
                     <div className="flex flex-wrap gap-1">
                        {user.specializations.map((spec, index) => (
                           <Badge key={index} variant="secondary">
                              {spec}
                           </Badge>
                        ))}
                     </div>
                  </div>
               )}

               {user.role === "coach" && user.certifications && (
                  <div>
                     <h3 className="font-medium mb-2">Certifications</h3>
                     <div className="space-y-1">
                        {user.certifications.map((cert, index) => (
                           <div
                              key={index}
                              className="flex items-center space-x-2">
                              <Shield className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{cert}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               <Separator />

               {/* Actions */}
               <div className="flex justify-end space-x-2">
                  {user.status === "active" ? (
                     <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onSuspend(user)}>
                        <UserX className="h-4 w-4 mr-2" />
                        Suspend User
                     </Button>
                  ) : (
                     <Button
                        variant="default"
                        size="sm"
                        onClick={() => onActivate(user)}>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Activate User
                     </Button>
                  )}
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
