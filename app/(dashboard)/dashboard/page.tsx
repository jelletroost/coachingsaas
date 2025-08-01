"use client";
import { PatientDashboard } from "@/components/patient/overview/PatientDashboard";

export default function PatientDashboardPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">
               Here&apos;s an overview of your health journey and progress
            </p>
         </div>
         <PatientDashboard />
      </div>
   );
}
