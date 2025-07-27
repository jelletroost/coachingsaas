import { ActivityFeed } from "./ActivityFeed";
import { AlertsPanel } from "./AlertsPanel";
import { AppointmentSchedule } from "./AppointmentSchedule";
import { LineChart } from "./LineChart";
import {
   appointmentData,
   coachActivityData,
   coachAlertsData,
   coachStatsData,
   patientProgressData,
   upcomingAppointments,
} from "./mockData";
import { StatsCard } from "./StatsCard";

export function CoachDashboard() {
   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coachStatsData.map((stat, index) => (
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
               title="Patient Progress"
               data={patientProgressData}
               type="progress"
               currentValue={94}
               previousValue={89}
               color="#3b82f6"
            />
            <LineChart
               title="Weekly Appointments"
               data={appointmentData}
               type="appointments"
               currentValue={65}
               previousValue={58}
               color="#10b981"
            />
         </div>

         {/* Activity, Alerts, and Schedule Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityFeed activities={coachActivityData} />
            <AlertsPanel alerts={coachAlertsData} />
            <AppointmentSchedule appointments={upcomingAppointments} />
         </div>
      </div>
   );
}
