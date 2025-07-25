import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface ChartDataPoint {
   label: string;
   value: number;
}

interface LineChartProps {
   title: string;
   data: ChartDataPoint[];
   type: "growth" | "revenue" | "engagement";
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
   const percentageChange =
      ((currentValue - previousValue) / previousValue) * 100;
   const isPositive = percentageChange >= 0;

   const maxValue = Math.max(...data.map((d) => d.value));
   const minValue = Math.min(...data.map((d) => d.value));
   const range = maxValue - minValue;

   // SVG dimensions
   const width = 300;
   const height = 120;
   const padding = 20;

   // Calculate points for the line
   const points = data
      .map((point, index) => {
         const x =
            padding + (index / (data.length - 1)) * (width - 2 * padding);
         const y =
            height -
            padding -
            ((point.value - minValue) / range) * (height - 2 * padding);
         return `${x},${y}`;
      })
      .join(" ");

   // Create area path
   const areaPoints = [
      ...points.split(" ").map((p) => p.split(",")[0] + "," + p.split(",")[1]),
      ...points
         .split(" ")
         .reverse()
         .map((p) => p.split(",")[0] + "," + (height - padding)),
   ].join(" ");

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

               <div className="relative">
                  <svg width={width} height={height} className="w-full">
                     {/* Grid lines */}
                     {[0, 1, 2, 3, 4].map((i) => (
                        <line
                           key={i}
                           x1={padding}
                           y1={padding + (i * (height - 2 * padding)) / 4}
                           x2={width - padding}
                           y2={padding + (i * (height - 2 * padding)) / 4}
                           stroke="#e5e7eb"
                           strokeWidth="1"
                        />
                     ))}

                     {/* Area fill */}
                     <polygon
                        points={areaPoints}
                        fill={color}
                        fillOpacity="0.1"
                     />

                     {/* Line */}
                     <polyline
                        points={points}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />

                     {/* Data points */}
                     {data.map((point, index) => {
                        const x =
                           padding +
                           (index / (data.length - 1)) * (width - 2 * padding);
                        const y =
                           height -
                           padding -
                           ((point.value - minValue) / range) *
                              (height - 2 * padding);
                        return (
                           <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="3"
                              fill={color}
                           />
                        );
                     })}
                  </svg>

                  {/* Labels */}
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                     {data.map((point, index) => (
                        <span key={index} className="text-center">
                           {point.label}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
