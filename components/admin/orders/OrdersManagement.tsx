"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { OrderTable } from "./OrderTable";
import { mockOrders, orderStats, type Order } from "./mockData";

export function OrdersManagement() {
   const [orders, setOrders] = useState<Order[]>(mockOrders);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

   const handleViewDetails = (order: Order) => {
      setSelectedOrder(order);
      setIsDetailsModalOpen(true);
   };

   const handleEditOrder = (order: Order) => {
      toast.success(`Edit functionality for ${order.orderNumber} coming soon!`);
   };

   const handleUpdateStatus = (order: Order, newStatus: Order["status"]) => {
      setOrders((prev) =>
         prev.map((o) =>
            o.id === order.id
               ? {
                    ...o,
                    status: newStatus,
                    updatedAt: new Date().toISOString(),
                 }
               : o
         )
      );
      toast.success(
         `Order ${order.orderNumber} status updated to ${newStatus}`
      );
   };

   const handleExportOrders = () => {
      toast.success("Export functionality coming soon!");
   };

   return (
      <div className="space-y-6">
         {/* Statistics Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{orderStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     +{orderStats.thisMonth} this month
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     ${orderStats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Avg: ${orderStats.averageOrderValue}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Active Orders
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {orderStats.pending +
                        orderStats.confirmed +
                        orderStats.processing +
                        orderStats.shipped}
                  </div>
                  <p className="text-xs text-muted-foreground">In progress</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Delivered
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {orderStats.delivered}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Successfully completed
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Status Overview */}
         <Card>
            <CardHeader>
               <CardTitle>Order Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Pending: {orderStats.pending}</Badge>
                  <Badge variant="outline">
                     Confirmed: {orderStats.confirmed}
                  </Badge>
                  <Badge variant="outline">
                     Processing: {orderStats.processing}
                  </Badge>
                  <Badge variant="outline">Shipped: {orderStats.shipped}</Badge>
                  <Badge variant="outline">
                     Delivered: {orderStats.delivered}
                  </Badge>
                  <Badge variant="outline">
                     Cancelled: {orderStats.cancelled}
                  </Badge>
                  <Badge variant="outline">
                     Refunded: {orderStats.refunded}
                  </Badge>
               </div>
            </CardContent>
         </Card>

         {/* Orders Table */}
         <OrderTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onEditOrder={handleEditOrder}
            onUpdateStatus={handleUpdateStatus}
            onExportOrders={handleExportOrders}
         />

         {/* Order Details Modal */}
         <OrderDetailsModal
            order={selectedOrder}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onEdit={handleEditOrder}
         />
      </div>
   );
}
