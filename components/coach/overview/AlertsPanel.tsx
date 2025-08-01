import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

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
         return AlertCircle;
      case "error":
         return XCircle;
      case "info":
         return Info;
      case "success":
         return CheckCircle;
      default:
         return Info;
   }
};

const getAlertColor = (type: Alert["type"]) => {
   switch (type) {
      case "warning":
         return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "error":
         return "text-red-600 bg-red-50 border-red-200";
      case "info":
         return "text-blue-600 bg-blue-50 border-blue-200";
      case "success":
         return "text-green-600 bg-green-50 border-green-200";
      default:
         return "text-gray-600 bg-gray-50 border-gray-200";
   }
};

const getPriorityColor = (priority: Alert["priority"]) => {
   switch (priority) {
      case "high":
         return "bg-red-100 text-red-800";
      case "medium":
         return "bg-yellow-100 text-yellow-800";
      case "low":
         return "bg-green-100 text-green-800";
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
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-3">
               {alerts.map((alert) => {
                  const Icon = getAlertIcon(alert.type);
                  return (
                     <div
                        key={alert.id}
                        className={`p-3 rounded-lg border ${getAlertColor(
                           alert.type
                        )}`}>
                        <div className="flex items-start space-x-3">
                           <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                 <h4 className="text-sm font-medium">
                                    {alert.title}
                                 </h4>
                                 <div className="flex items-center space-x-2">
                                    <Badge
                                       variant="secondary"
                                       className={getPriorityColor(
                                          alert.priority
                                       )}>
                                       {alert.priority}
                                    </Badge>
                                    {alert.actionRequired && (
                                       <Badge
                                          variant="destructive"
                                          className="text-xs">
                                          Action Required
                                       </Badge>
                                    )}
                                 </div>
                              </div>
                              <p className="text-sm mt-1 opacity-90">
                                 {alert.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                 <span className="text-xs opacity-75">
                                    {alert.timestamp}
                                 </span>
                                 {alert.actionRequired && (
                                    <Button
                                       size="sm"
                                       variant="outline"
                                       className="text-xs">
                                       Take Action
                                    </Button>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
}
