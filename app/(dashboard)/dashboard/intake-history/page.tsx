import { IntakeHistoryManagement } from "@/components/patient/intake-history/IntakeHistoryManagement";

export default function IntakeHistoryPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Intake History</h1>
            <p className="text-muted-foreground">
               View your complete intake form history, coach feedback, and
               health journey progress
            </p>
         </div>
         <IntakeHistoryManagement />
      </div>
   );
}
