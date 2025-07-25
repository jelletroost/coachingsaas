import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface ChartDataPoint {
   label: string;
   value: number;
}

interface SimpleChartProps {
   title: string;
   data: ChartDataPoint[];
   type: "growth" | "revenue" | "engagement";
   currentValue: number;
   previousValue: number;
}

export function SimpleChart({
   title,
   data,
   type,
   currentValue,
   previousValue,
}: SimpleChartProps) {
   const percentageChange =
      ((currentValue - previousValue) / previousValue) * 100;
   const isPositive = percentageChange >= 0;

   const maxValue = Math.max(...data.map((d) => d.value));
   const minValue = Math.min(...data.map((d) => d.value));
   const range = maxValue - minValue;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                     {type === "revenue"
                        ? `$${currentValue.toLocaleString()}`
                        : currentValue.toLocaleString()}
                  </div>
                  <div
                     className={`flex items-center space-x-1 text-sm ${
                        isPositive ? "text-green-600" : "text-red-600"
                     }`}>
                     {isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                     ) : (
                        <TrendingDown className="h-4 w-4" />
                     )}
                     <span>{Math.abs(percentageChange).toFixed(1)}%</span>
                  </div>
               </div>

               <div className="h-32 flex items-end space-x-1">
                  {data.map((point, index) => {
                     const height =
                        range > 0
                           ? ((point.value - minValue) / range) * 100
                           : 50;
                     return (
                        <div
                           key={index}
                           className="flex-1 flex flex-col items-center space-y-1">
                           <div
                              className="w-full bg-primary rounded-t"
                              style={{ height: `${height}%` }}
                           />
                           <span className="text-xs text-muted-foreground">
                              {point.label}
                           </span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
