import { ActivityFeed } from "./ActivityFeed";
import { AlertsPanel } from "./AlertsPanel";
import { LineChart } from "./LineChart";
import {
   activityData,
   alertsData,
   engagementData,
   revenueData,
   statsData,
   userGrowthData,
} from "./mockData";
import { StatsCard } from "./StatsCard";

export function AdminDashboard() {
   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
               <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  description={stat.description}
               />
            ))}
         </div>

         {/* Charts Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LineChart
               title="User Growth"
               data={userGrowthData}
               type="growth"
               currentValue={2847}
               previousValue={1720}
               color="#3b82f6"
            />
            <LineChart
               title="Revenue Trends"
               data={revenueData}
               type="revenue"
               currentValue={75000}
               previousValue={68000}
               color="#10b981"
            />
            <LineChart
               title="Engagement Rate"
               data={engagementData}
               type="engagement"
               currentValue={95}
               previousValue={88}
               color="#f59e0b"
            />
         </div>

         {/* Activity and Alerts Row */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed activities={activityData} />
            <AlertsPanel alerts={alertsData} />
         </div>
      </div>
   );
}
