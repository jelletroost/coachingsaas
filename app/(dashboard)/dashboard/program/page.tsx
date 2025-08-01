import { ProgramManagement } from "@/components/patient/program/ProgramManagement";

export default function PatientProgramPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">My Program</h1>
            <p className="text-muted-foreground">
               Track your progress, manage goals, and view your health
               transformation journey
            </p>
         </div>
         <ProgramManagement />
      </div>
   );
}
