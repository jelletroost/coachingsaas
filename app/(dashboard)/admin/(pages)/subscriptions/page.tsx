import { SubscriptionsManagement } from "@/components/admin/subscriptions";

export default function AdminSubscriptionsPage() {
   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
            <p className="text-muted-foreground">
               Manage and monitor all platform subscriptions
            </p>
         </div>
         <SubscriptionsManagement />
      </div>
   );
}
