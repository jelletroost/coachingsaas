import { OrderManagement } from "@/components/patient/orders/OrderManagement";

export default function PatientOrdersPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">
               Track your orders, view order history, and manage shipments
            </p>
         </div>
         <OrderManagement />
      </div>
   );
}
