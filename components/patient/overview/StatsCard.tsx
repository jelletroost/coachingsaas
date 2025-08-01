import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatsCardProps {
   title: string;
   value: string;
   icon: React.ComponentType<{ className?: string }>;
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
               <div className="flex items-center space-x-1 text-xs">
                  {trend.isPositive ? (
                     <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                     <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span
                     className={
                        trend.isPositive ? "text-green-600" : "text-red-600"
                     }>
                     {trend.value}%
                  </span>
                  <span className="text-muted-foreground">from last month</span>
               </div>
            )}
            {description && (
               <p className="text-xs text-muted-foreground">{description}</p>
            )}
         </CardContent>
      </Card>
   );
}
