"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, CheckCircle, Clock, Info, X } from "lucide-react";

interface Alert {
   id: string;
   type: "info" | "warning" | "success" | "reminder";
   title: string;
   message: string;
   timestamp: string;
   priority: "low" | "medium" | "high";
   action?: {
      label: string;
      onClick: () => void;
   };
}

interface AlertsPanelProps {
   alerts: Alert[];
   title?: string;
}

const getAlertIcon = (type: Alert["type"]) => {
   switch (type) {
      case "info":
         return Info;
      case "warning":
         return AlertTriangle;
      case "success":
         return CheckCircle;
      case "reminder":
         return Clock;
      default:
         return Bell;
   }
};

const getAlertColor = (type: Alert["type"]) => {
   switch (type) {
      case "info":
         return "bg-blue-100 text-blue-800 border-blue-200";
      case "warning":
         return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "success":
         return "bg-green-100 text-green-800 border-green-200";
      case "reminder":
         return "bg-purple-100 text-purple-800 border-purple-200";
      default:
         return "bg-gray-100 text-gray-800 border-gray-200";
   }
};

const getPriorityColor = (priority: Alert["priority"]) => {
   switch (priority) {
      case "high":
         return "bg-red-100 text-red-800";
      case "medium":
         return "bg-orange-100 text-orange-800";
      case "low":
         return "bg-gray-100 text-gray-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

export function AlertsPanel({
   alerts,
   title = "Alerts & Notifications",
}: AlertsPanelProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
            {alerts.length === 0 ? (
               <div className="text-center py-6 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No alerts at the moment</p>
               </div>
            ) : (
               alerts.map((alert) => {
                  const Icon = getAlertIcon(alert.type);
                  return (
                     <div
                        key={alert.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border ${getAlertColor(
                           alert.type
                        )}`}>
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                           <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                 {alert.title}
                              </p>
                              <div className="flex items-center space-x-2">
                                 <Badge
                                    className={`text-xs ${getPriorityColor(
                                       alert.priority
                                    )}`}>
                                    {alert.priority}
                                 </Badge>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0">
                                    <X className="h-3 w-3" />
                                 </Button>
                              </div>
                           </div>
                           <p className="text-sm">{alert.message}</p>
                           <div className="flex items-center justify-between">
                              <p className="text-xs opacity-75">
                                 {alert.timestamp}
                              </p>
                              {alert.action && (
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={alert.action.onClick}
                                    className="text-xs">
                                    {alert.action.label}
                                 </Button>
                              )}
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </CardContent>
      </Card>
   );
}
