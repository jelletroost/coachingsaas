import { FeatureFlag } from "@/components/shared/FeatureFlag";
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
            
            {/* Advanced Analytics - Feature Flag Protected */}
            <FeatureFlag flag="advanced_analytics" fallback={
               <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                     Advanced analytics dashboard is not available for your role.
                  </p>
               </div>
            }>
               <LineChart
                  title="Advanced Analytics Dashboard"
                  data={appointmentData}
                  type="appointments"
                  currentValue={65}
                  previousValue={58}
                  color="#10b981"
               />
            </FeatureFlag>
         </div>

         {/* Activity, Alerts, and Schedule Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityFeed activities={coachActivityData} />
            <AlertsPanel alerts={coachAlertsData} />
            <AppointmentSchedule appointments={upcomingAppointments} />
         </div>

         {/* AI Coaching Section - Feature Flag Protected */}
         <FeatureFlag flag="ai_coaching" fallback={null}>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
               <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  🤖 AI Coaching Recommendations
               </h3>
               <p className="text-purple-700 mb-4">
                  Get personalized coaching recommendations powered by AI to help your patients achieve their goals faster.
               </p>
               <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  View AI Recommendations
               </button>
            </div>
         </FeatureFlag>

         {/* Video Consultations Section - Feature Flag Protected */}
         <FeatureFlag flag="video_consultations" fallback={null}>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
               <h3 className="text-lg font-semibold text-green-900 mb-4">
                  📹 Video Consultation Hub
               </h3>
               <p className="text-green-700 mb-4">
                  Schedule and manage video consultations with your patients. Integrated with popular video platforms.
               </p>
               <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Schedule Video Call
               </button>
            </div>
         </FeatureFlag>
      </div>
   );
}
