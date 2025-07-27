import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface DataPoint {
   date: string;
   value: number;
}

interface LineChartProps {
   title: string;
   data: DataPoint[];
   type: "progress" | "wellness";
   currentValue: number;
   previousValue: number;
   color: string;
}

export function LineChart({
   title,
   data,
   type,
   currentValue,
   previousValue,
   color,
}: LineChartProps) {
   const trend = ((currentValue - previousValue) / previousValue) * 100;
   const isPositive = trend >= 0;

   // Simple SVG line chart
   const maxValue = Math.max(...data.map((d) => d.value));
   const minValue = Math.min(...data.map((d) => d.value));
   const range = maxValue - minValue;

   const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 200;
      const y = 60 - ((point.value - minValue) / range) * 50;
      return `${x},${y}`;
   });

   const pathData = points.join(" ");

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="flex items-center space-x-1 text-xs">
               {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
               ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
               )}
               <span className={isPositive ? "text-green-600" : "text-red-600"}>
                  {Math.abs(trend).toFixed(1)}%
               </span>
            </div>
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">
               {type === "progress" ? `${currentValue}%` : currentValue}
            </div>
            <p className="text-xs text-muted-foreground">
               {type === "progress" ? "Overall progress" : "Wellness score"}
            </p>
            <div className="mt-4 h-16 w-full">
               <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 220 70"
                  className="overflow-visible">
                  <polyline
                     fill="none"
                     stroke={color}
                     strokeWidth="2"
                     points={pathData}
                  />
                  {data.map((point, index) => {
                     const x = (index / (data.length - 1)) * 200;
                     const y = 60 - ((point.value - minValue) / range) * 50;
                     return (
                        <circle key={index} cx={x} cy={y} r="3" fill={color} />
                     );
                  })}
               </svg>
            </div>
         </CardContent>
      </Card>
   );
}
