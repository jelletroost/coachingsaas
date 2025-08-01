import { IntakeManagement } from "@/components/coach/intakes/IntakeManagement";

export default function IntakesPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Intake Management</h1>
            <p className="text-muted-foreground">
               Review and manage patient intake forms and health screenings
            </p>
         </div>
         <IntakeManagement />
      </div>
   );
}
