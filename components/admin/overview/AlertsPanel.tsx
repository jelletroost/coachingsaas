import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

interface Alert {
   id: string;
   type: "warning" | "error" | "info" | "success";
   title: string;
   description: string;
   timestamp: string;
   priority: "low" | "medium" | "high";
   actionRequired?: boolean;
}

interface AlertsPanelProps {
   alerts: Alert[];
   title?: string;
}

const getAlertIcon = (type: Alert["type"]) => {
   switch (type) {
      case "warning":
         return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
         return <XCircle className="h-4 w-4 text-red-600" />;
      case "success":
         return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "info":
         return <Clock className="h-4 w-4 text-blue-600" />;
   }
};

const getPriorityBadge = (priority: Alert["priority"]) => {
   const variants = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
   };

   return <Badge className={variants[priority]}>{priority}</Badge>;
};

export function AlertsPanel({
   alerts,
   title = "Alerts & Notifications",
}: AlertsPanelProps) {
   const highPriorityAlerts = alerts.filter(
      (alert) => alert.priority === "high"
   );

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
               <AlertTriangle className="h-4 w-4" />
               <span>{title}</span>
               {highPriorityAlerts.length > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                     {highPriorityAlerts.length} urgent
                  </Badge>
               )}
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-3">
               {alerts.map((alert) => (
                  <div
                     key={alert.id}
                     className="flex items-start space-x-3 p-3 rounded-lg border">
                     <div className="flex-shrink-0 mt-0.5">
                        {getAlertIcon(alert.type)}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <h4 className="text-sm font-medium">
                              {alert.title}
                           </h4>
                           <div className="flex items-center space-x-2">
                              {getPriorityBadge(alert.priority)}
                              {alert.actionRequired && (
                                 <Badge
                                    variant="outline"
                                    className="text-orange-600 border-orange-600">
                                    Action Required
                                 </Badge>
                              )}
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                           {alert.description}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-2">
                           <Clock className="h-3 w-3" />
                           <span>{alert.timestamp}</span>
                        </div>
                     </div>
                  </div>
               ))}

               {alerts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                     <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                     <p className="text-sm">No alerts at the moment</p>
                  </div>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
