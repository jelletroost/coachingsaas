import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Calendar,
   Clock,
   MessageSquare,
   Target,
   UserCheck,
} from "lucide-react";

interface ActivityItem {
   id: string;
   type: "appointment" | "message" | "assessment" | "goal" | "alert";
   title: string;
   description: string;
   user?: {
      name: string;
      avatar?: string;
   };
   timestamp: string;
   status: "pending" | "completed" | "failed";
}

interface ActivityFeedProps {
   activities: ActivityItem[];
   title?: string;
}

const getActivityIcon = (type: ActivityItem["type"]) => {
   switch (type) {
      case "appointment":
         return Calendar;
      case "message":
         return MessageSquare;
      case "assessment":
         return UserCheck;
      case "goal":
         return Target;
      case "alert":
         return Clock;
      default:
         return Clock;
   }
};

const getStatusColor = (status: ActivityItem["status"]) => {
   switch (status) {
      case "completed":
         return "bg-green-100 text-green-800";
      case "pending":
         return "bg-yellow-100 text-yellow-800";
      case "failed":
         return "bg-red-100 text-red-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

export function ActivityFeed({
   activities,
   title = "Recent Activity",
}: ActivityFeedProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                     <div
                        key={activity.id}
                        className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                           </div>
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">
                                 {activity.title}
                              </p>
                              <Badge
                                 variant="secondary"
                                 className={getStatusColor(activity.status)}>
                                 {activity.status}
                              </Badge>
                           </div>
                           <p className="text-sm text-muted-foreground mt-1">
                              {activity.description}
                           </p>
                           {activity.user && (
                              <div className="flex items-center space-x-2 mt-2">
                                 <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-xs">
                                       {activity.user.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <span className="text-xs text-muted-foreground">
                                    {activity.user.name}
                                 </span>
                              </div>
                           )}
                           <p className="text-xs text-muted-foreground mt-1">
                              {activity.timestamp}
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
}
