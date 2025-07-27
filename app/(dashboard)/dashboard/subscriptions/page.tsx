import { SubscriptionManagement } from "@/components/patient/subscriptions/SubscriptionManagement";

export default function PatientSubscriptionsPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">My Subscriptions</h1>
            <p className="text-muted-foreground">
               Manage your subscription, view billing history, and explore
               available plans
            </p>
         </div>
         <SubscriptionManagement />
      </div>
   );
}
