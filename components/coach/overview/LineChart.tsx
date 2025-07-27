import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface ChartDataPoint {
   label: string;
   value: number;
}

interface LineChartProps {
   title: string;
   data: ChartDataPoint[];
   type: "progress" | "appointments" | "engagement";
   currentValue: number;
   previousValue: number;
   color?: string;
}

export function LineChart({
   title,
   data,
   type,
   currentValue,
   previousValue,
   color = "#3b82f6",
}: LineChartProps) {
   const maxValue = Math.max(...data.map((d) => d.value));
   const minValue = Math.min(...data.map((d) => d.value));
   const range = maxValue - minValue;

   const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((point.value - minValue) / range) * 100;
      return `${x},${y}`;
   });

   const pathData = `M ${points.join(" L ")}`;

   const percentageChange =
      ((currentValue - previousValue) / previousValue) * 100;
   const isPositive = percentageChange >= 0;

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="flex items-center space-x-1 text-xs">
               {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
               ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
               )}
               <span className={isPositive ? "text-green-500" : "text-red-500"}>
                  {isPositive ? "+" : ""}
                  {Math.abs(percentageChange).toFixed(1)}%
               </span>
            </div>
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">
               {type === "progress" && `${currentValue}%`}
               {type === "appointments" && currentValue}
               {type === "engagement" && `${currentValue}%`}
            </div>
            <p className="text-xs text-muted-foreground mb-4">
               {type === "progress" && "Average patient progress"}
               {type === "appointments" && "Total appointments this week"}
               {type === "engagement" && "Patient engagement rate"}
            </p>
            <div className="h-[100px] w-full">
               <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  className="overflow-visible">
                  <defs>
                     <linearGradient
                        id={`gradient-${type}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop
                           offset="100%"
                           stopColor={color}
                           stopOpacity="0.1"
                        />
                     </linearGradient>
                  </defs>
                  <path
                     d={`${pathData} L 100,100 L 0,100 Z`}
                     fill={`url(#gradient-${type})`}
                  />
                  <path
                     d={pathData}
                     stroke={color}
                     strokeWidth="2"
                     fill="none"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  {data.map((point, index) => {
                     const x = (index / (data.length - 1)) * 100;
                     const y = 100 - ((point.value - minValue) / range) * 100;
                     return (
                        <circle key={index} cx={x} cy={y} r="2" fill={color} />
                     );
                  })}
               </svg>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
               {data.map((point, index) => (
                  <span key={index}>{point.label}</span>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
