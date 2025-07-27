"use client";

import { OrdersManagement } from "@/components/admin/orders";

export default function AdminOrdersPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Order Management</h1>
            <p className="text-muted-foreground">
               Manage all patient orders, track shipments, and monitor order
               status
            </p>
         </div>
         <OrdersManagement />
      </div>
   );
}
