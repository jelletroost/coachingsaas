"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Download,
   Eye,
   Package,
   Search,
   ShoppingCart,
   Truck,
   User,
} from "lucide-react";
import { useState } from "react";
import { ordersData, orderStatsData } from "./mockData";

export function OrderManagement() {
   const [activeTab, setActiveTab] = useState("all");
   const [searchTerm, setSearchTerm] = useState("");

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
      });
   };

   const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
      }).format(amount);
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case "delivered":
            return "bg-green-100 text-green-800";
         case "shipped":
            return "bg-blue-100 text-blue-800";
         case "processing":
            return "bg-yellow-100 text-yellow-800";
         case "cancelled":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case "delivered":
            return Package;
         case "shipped":
            return Truck;
         case "processing":
            return ShoppingCart;
         case "cancelled":
            return User;
         default:
            return Package;
      }
   };

   const filteredOrders = ordersData.filter((order) => {
      const matchesSearch =
         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
         );
      const matchesTab = activeTab === "all" || order.status === activeTab;
      return matchesSearch && matchesTab;
   });

   return (
      <div className="space-y-6">
         {/* Order Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {orderStatsData.map((stat, index) => (
               <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        {stat.title}
                     </CardTitle>
                     <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{stat.value}</div>
                     <p className="text-xs text-muted-foreground">
                        {stat.description}
                     </p>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Search and Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="Search orders by order number or item name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                     />
                  </div>
                  <Button variant="outline">
                     <Download className="h-4 w-4 mr-2" />
                     Export Orders
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Orders Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
               <TabsTrigger value="all">All Orders</TabsTrigger>
               <TabsTrigger value="processing">Processing</TabsTrigger>
               <TabsTrigger value="shipped">Shipped</TabsTrigger>
               <TabsTrigger value="delivered">Delivered</TabsTrigger>
               <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
               {filteredOrders.length === 0 ? (
                  <Card>
                     <CardContent className="pt-6">
                        <div className="text-center py-8">
                           <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                           <h3 className="text-lg font-medium mb-2">
                              No orders found
                           </h3>
                           <p className="text-muted-foreground">
                              {searchTerm
                                 ? "Try adjusting your search terms"
                                 : "You haven't placed any orders yet"}
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               ) : (
                  <div className="space-y-4">
                     {filteredOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                           <Card key={order.id}>
                              <CardContent className="pt-6">
                                 <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                       <div className="flex items-center justify-between mb-4">
                                          <div>
                                             <h3 className="font-medium">
                                                Order #{order.orderNumber}
                                             </h3>
                                             <p className="text-sm text-muted-foreground">
                                                Placed on{" "}
                                                {formatDate(order.orderDate)}
                                             </p>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             <Badge
                                                className={getStatusColor(
                                                   order.status
                                                )}>
                                                {order.status}
                                             </Badge>
                                             <Button
                                                variant="outline"
                                                size="sm">
                                                <Eye className="h-4 w-4" />
                                             </Button>
                                          </div>
                                       </div>

                                       <div className="space-y-3">
                                          {order.items.map((item, index) => (
                                             <div
                                                key={index}
                                                className="flex items-center space-x-4 p-3 border rounded-lg">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                   <Package className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <div className="flex-1">
                                                   <p className="font-medium">
                                                      {item.name}
                                                   </p>
                                                   <p className="text-sm text-muted-foreground">
                                                      Quantity: {item.quantity}
                                                   </p>
                                                </div>
                                                <div className="text-right">
                                                   <p className="font-medium">
                                                      {formatCurrency(
                                                         item.price
                                                      )}
                                                   </p>
                                                   <p className="text-sm text-muted-foreground">
                                                      {formatCurrency(
                                                         item.price *
                                                            item.quantity
                                                      )}
                                                   </p>
                                                </div>
                                             </div>
                                          ))}
                                       </div>

                                       <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                          <div className="space-y-1">
                                             <p className="text-sm text-muted-foreground">
                                                Total:{" "}
                                                <span className="font-medium">
                                                   {formatCurrency(order.total)}
                                                </span>
                                             </p>
                                             {order.shippingAddress && (
                                                <p className="text-sm text-muted-foreground">
                                                   Shipped to:{" "}
                                                   {order.shippingAddress}
                                                </p>
                                             )}
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             {order.trackingNumber && (
                                                <Button
                                                   variant="outline"
                                                   size="sm">
                                                   <Truck className="h-4 w-4 mr-2" />
                                                   Track Package
                                                </Button>
                                             )}
                                             <Button
                                                variant="outline"
                                                size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Invoice
                                             </Button>
                                          </div>
                                       </div>

                                       {order.status === "shipped" &&
                                          order.trackingNumber && (
                                             <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                                <div className="flex items-center space-x-2">
                                                   <Truck className="h-4 w-4 text-blue-600" />
                                                   <span className="text-sm font-medium text-blue-800">
                                                      Tracking:{" "}
                                                      {order.trackingNumber}
                                                   </span>
                                                </div>
                                                <p className="text-sm text-blue-600 mt-1">
                                                   Estimated delivery:{" "}
                                                   {formatDate(
                                                      order.estimatedDelivery ||
                                                         ""
                                                   )}
                                                </p>
                                             </div>
                                          )}
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        );
                     })}
                  </div>
               )}
            </TabsContent>
         </Tabs>
      </div>
   );
}
