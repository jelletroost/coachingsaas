import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Calendar,
   CheckCircle,
   MessageSquare,
   Target,
   TrendingUp,
   User,
} from "lucide-react";

interface Activity {
   id: string;
   type: "appointment" | "message" | "goal" | "progress" | "achievement";
   title: string;
   description: string;
   timestamp: string;
   coachName?: string;
   coachAvatar?: string;
   status?: "completed" | "upcoming" | "in-progress";
}

interface ActivityFeedProps {
   activities: Activity[];
   title?: string;
}

const getActivityIcon = (type: Activity["type"]) => {
   switch (type) {
      case "appointment":
         return Calendar;
      case "message":
         return MessageSquare;
      case "goal":
         return Target;
      case "progress":
         return TrendingUp;
      case "achievement":
         return CheckCircle;
      default:
         return User;
   }
};

const getActivityColor = (type: Activity["type"]) => {
   switch (type) {
      case "appointment":
         return "bg-blue-100 text-blue-800";
      case "message":
         return "bg-green-100 text-green-800";
      case "goal":
         return "bg-purple-100 text-purple-800";
      case "progress":
         return "bg-orange-100 text-orange-800";
      case "achievement":
         return "bg-yellow-100 text-yellow-800";
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
            <CardTitle className="text-lg">{title}</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            {activities.map((activity) => {
               const Icon = getActivityIcon(activity.type);
               return (
                  <div key={activity.id} className="flex items-start space-x-3">
                     <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityColor(
                           activity.type
                        )}`}>
                        <Icon className="h-4 w-4" />
                     </div>
                     <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                           <p className="text-sm font-medium">
                              {activity.title}
                           </p>
                           {activity.status && (
                              <Badge
                                 variant={
                                    activity.status === "completed"
                                       ? "default"
                                       : activity.status === "upcoming"
                                       ? "secondary"
                                       : "outline"
                                 }
                                 className="text-xs">
                                 {activity.status}
                              </Badge>
                           )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                           {activity.description}
                        </p>
                        {activity.coachName && (
                           <div className="flex items-center space-x-2">
                              <Avatar className="h-4 w-4">
                                 <AvatarFallback className="text-xs">
                                    {activity.coachName
                                       .split(" ")
                                       .map((n) => n[0])
                                       .join("")}
                                 </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                 {activity.coachName}
                              </span>
                           </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                           {activity.timestamp}
                        </p>
                     </div>
                  </div>
               );
            })}
         </CardContent>
      </Card>
   );
}
