import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   AlertTriangle,
   Clock,
   MessageSquare,
   ShoppingCart,
   User,
} from "lucide-react";

interface ActivityItem {
   id: string;
   type: "signup" | "message" | "order" | "alert";
   title: string;
   description: string;
   user?: {
      name: string;
      avatar?: string;
   };
   timestamp: string;
   status?: "pending" | "completed" | "failed";
}

interface ActivityFeedProps {
   activities: ActivityItem[];
   title?: string;
}

const getActivityIcon = (type: ActivityItem["type"]) => {
   switch (type) {
      case "signup":
         return <User className="h-4 w-4" />;
      case "message":
         return <MessageSquare className="h-4 w-4" />;
      case "order":
         return <ShoppingCart className="h-4 w-4" />;
      case "alert":
         return <AlertTriangle className="h-4 w-4" />;
   }
};

const getStatusBadge = (status?: ActivityItem["status"]) => {
   if (!status) return null;

   const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
   };

   return <Badge className={variants[status]}>{status}</Badge>;
};

export function ActivityFeed({
   activities,
   title = "Recent Activity",
}: ActivityFeedProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                     <div className="flex-shrink-0">
                        {activity.user?.avatar ? (
                           <Avatar className="h-8 w-8">
                              <AvatarImage src={activity.user.avatar} />
                              <AvatarFallback>
                                 {activity.user.name.charAt(0)}
                              </AvatarFallback>
                           </Avatar>
                        ) : (
                           <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              {getActivityIcon(activity.type)}
                           </div>
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <p className="text-sm font-medium">
                              {activity.title}
                           </p>
                           {getStatusBadge(activity.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                           {activity.description}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                           <Clock className="h-3 w-3" />
                           <span>{activity.timestamp}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
