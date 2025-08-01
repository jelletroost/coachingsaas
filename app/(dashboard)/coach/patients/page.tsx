import { PatientsManagement } from "@/components/coach/patients/PatientsManagement";

export default function PatientsPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Patient Management</h1>
            <p className="text-muted-foreground">
               Manage your patients, track their progress, and schedule
               appointments
            </p>
         </div>
         <PatientsManagement />
      </div>
   );
}
