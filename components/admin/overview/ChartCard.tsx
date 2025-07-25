import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ChartCardProps {
   title: string;
   icon?: LucideIcon;
   children: React.ReactNode;
   className?: string;
}

export function ChartCard({
   title,
   icon: Icon,
   children,
   className,
}: ChartCardProps) {
   return (
      <Card className={className}>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
         </CardHeader>
         <CardContent>{children}</CardContent>
      </Card>
   );
}
