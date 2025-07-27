import { CoachDashboard } from "@/components/coach/overview/CoachDashboard";

export default function CoachDashboardPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Coach Dashboard</h1>
            <p className="text-muted-foreground">
               Welcome back! Here&apos;s an overview of your patients and
               activities
            </p>
         </div>
         <CoachDashboard />
      </div>
   );
}
