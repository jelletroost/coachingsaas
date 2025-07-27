import { ActivityFeed } from "./ActivityFeed";
import { AlertsPanel } from "./AlertsPanel";
import { AppointmentSchedule } from "./AppointmentSchedule";
import { LineChart } from "./LineChart";
import {
   patientActivityData,
   patientAlertsData,
   patientProgressData,
   patientStatsData,
   upcomingAppointments,
   wellnessData,
} from "./mockData";
import { StatsCard } from "./StatsCard";

export function PatientDashboard() {
   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {patientStatsData.map((stat, index) => (
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
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
               title="My Progress"
               data={patientProgressData}
               type="progress"
               currentValue={78}
               previousValue={72}
               color="#3b82f6"
            />
            <LineChart
               title="Wellness Score"
               data={wellnessData}
               type="wellness"
               currentValue={85}
               previousValue={82}
               color="#10b981"
            />
         </div>

         {/* Activity, Alerts, and Schedule Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityFeed activities={patientActivityData} />
            <AlertsPanel alerts={patientAlertsData} />
            <AppointmentSchedule appointments={upcomingAppointments} />
         </div>
      </div>
   );
}
