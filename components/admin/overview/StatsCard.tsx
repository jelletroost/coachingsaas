import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
   title: string;
   value: string | number;
   icon: LucideIcon;
   trend?: {
      value: number;
      isPositive: boolean;
   };
   description?: string;
}

export function StatsCard({
   title,
   value,
   icon: Icon,
   trend,
   description,
}: StatsCardProps) {
   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
               <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span
                     className={
                        trend.isPositive ? "text-green-600" : "text-red-600"
                     }>
                     {trend.isPositive ? "+" : ""}
                     {trend.value}%
                  </span>
                  <span>from last month</span>
               </div>
            )}
            {description && (
               <p className="text-xs text-muted-foreground mt-1">
                  {description}
               </p>
            )}
         </CardContent>
      </Card>
   );
}
