/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Repeat, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CoachOrderDetailsModal } from "./CoachOrderDetailsModal";
import { CoachOrderTable } from "./CoachOrderTable";
import { coachOrderStats, mockCoachOrders, type CoachOrder } from "./mockData";

export function CoachOrdersManagement() {
   const [orders, setOrders] = useState<CoachOrder[]>(mockCoachOrders);
   const [selectedOrder, setSelectedOrder] = useState<CoachOrder | null>(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

   const handleViewDetails = (order: CoachOrder) => {
      setSelectedOrder(order);
      setIsDetailsModalOpen(true);
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
                     My Patient Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {coachOrderStats.total}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     +{coachOrderStats.thisMonth} this month
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Patient Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     ${coachOrderStats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Avg: ${coachOrderStats.averageOrderValue}
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
                     {coachOrderStats.pending +
                        coachOrderStats.confirmed +
                        coachOrderStats.processing +
                        coachOrderStats.shipped}
                  </div>
                  <p className="text-xs text-muted-foreground">In progress</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Subscription Orders
                  </CardTitle>
                  <Repeat className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {coachOrderStats.subscriptionOrders}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     {Math.round(
                        (coachOrderStats.subscriptionOrders /
                           coachOrderStats.total) *
                           100
                     )}
                     % of total
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
                  <Badge variant="outline">
                     Pending: {coachOrderStats.pending}
                  </Badge>
                  <Badge variant="outline">
                     Confirmed: {coachOrderStats.confirmed}
                  </Badge>
                  <Badge variant="outline">
                     Processing: {coachOrderStats.processing}
                  </Badge>
                  <Badge variant="outline">
                     Shipped: {coachOrderStats.shipped}
                  </Badge>
                  <Badge variant="outline">
                     Delivered: {coachOrderStats.delivered}
                  </Badge>
                  <Badge variant="outline">
                     Cancelled: {coachOrderStats.cancelled}
                  </Badge>
                  <Badge variant="outline">
                     Refunded: {coachOrderStats.refunded}
                  </Badge>
               </div>
            </CardContent>
         </Card>

         {/* Orders Table */}
         <CoachOrderTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onExportOrders={handleExportOrders}
         />

         {/* Order Details Modal */}
         <CoachOrderDetailsModal
            order={selectedOrder}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
         />
      </div>
   );
}
