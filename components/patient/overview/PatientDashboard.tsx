import { FeatureFlag } from "@/components/shared/FeatureFlag";
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
            
            {/* Health Tracking - Feature Flag Protected */}
            <FeatureFlag flag="health_tracking" fallback={
               <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                     Health tracking features are not available for your account.
                  </p>
               </div>
            }>
               <LineChart
                  title="Health Tracking Dashboard"
                  data={wellnessData}
                  type="wellness"
                  currentValue={85}
                  previousValue={82}
                  color="#10b981"
               />
            </FeatureFlag>
         </div>

         {/* Activity, Alerts, and Schedule Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityFeed activities={patientActivityData} />
            <AlertsPanel alerts={patientAlertsData} />
            <AppointmentSchedule appointments={upcomingAppointments} />
         </div>

         {/* Patient Messaging Section - Feature Flag Protected */}
         <FeatureFlag flag="patient_messaging" fallback={null}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
               <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  💬 Direct Messaging
               </h3>
               <p className="text-blue-700 mb-4">
                  Send direct messages to your coach for quick questions and support.
               </p>
               <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Message My Coach
               </button>
            </div>
         </FeatureFlag>

         {/* Mobile App Features - Feature Flag Protected */}
         <FeatureFlag flag="mobile_app" fallback={null}>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
               <h3 className="text-lg font-semibold text-orange-900 mb-4">
                  📱 Mobile App Features
               </h3>
               <p className="text-orange-700 mb-4">
                  Access your health data, track progress, and stay connected with your coach on the go.
               </p>
               <div className="flex gap-2">
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                     Download iOS App
                  </button>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                     Download Android App
                  </button>
               </div>
            </div>
         </FeatureFlag>
      </div>
   );
}
