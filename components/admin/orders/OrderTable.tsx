/* eslint-disable no-unused-vars */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   AlertCircle,
   CheckCircle,
   Clock,
   Download,
   Edit,
   Eye,
   MoreHorizontal,
   Package,
   Search,
   Truck,
   XCircle,
} from "lucide-react";
import { useState } from "react";
import { Order } from "./mockData";

interface OrderTableProps {
   orders: Order[];
   onViewDetails: (order: Order) => void;
   onEditOrder: (order: Order) => void;
   onUpdateStatus: (order: Order, status: Order["status"]) => void;
   onExportOrders: () => void;
}

const getStatusIcon = (status: Order["status"]) => {
   switch (status) {
      case "pending":
         return <Clock className="h-4 w-4 text-yellow-500" />;
      case "confirmed":
         return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "processing":
         return <Package className="h-4 w-4 text-orange-500" />;
      case "shipped":
         return <Truck className="h-4 w-4 text-purple-500" />;
      case "delivered":
         return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
         return <XCircle className="h-4 w-4 text-red-500" />;
      case "refunded":
         return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
         return <Clock className="h-4 w-4 text-gray-500" />;
   }
};

const getStatusBadgeVariant = (status: Order["status"]) => {
   switch (status) {
      case "pending":
         return "secondary";
      case "confirmed":
         return "default";
      case "processing":
         return "default";
      case "shipped":
         return "default";
      case "delivered":
         return "default";
      case "cancelled":
         return "destructive";
      case "refunded":
         return "secondary";
      default:
         return "secondary";
   }
};

const getPaymentMethodLabel = (method: Order["paymentMethod"]) => {
   switch (method) {
      case "credit_card":
         return "Credit Card";
      case "paypal":
         return "PayPal";
      case "bank_transfer":
         return "Bank Transfer";
      case "insurance":
         return "Insurance";
      default:
         return method;
   }
};

const getPaymentStatusBadgeVariant = (status: Order["paymentStatus"]) => {
   switch (status) {
      case "paid":
         return "default";
      case "pending":
         return "secondary";
      case "failed":
         return "destructive";
      case "refunded":
         return "secondary";
      default:
         return "secondary";
   }
};

export function OrderTable({
   orders,
   onViewDetails,
   onEditOrder,
   onUpdateStatus,
   onExportOrders,
}: OrderTableProps) {
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("all");
   const [paymentStatusFilter, setPaymentStatusFilter] =
      useState<string>("all");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);

   const filteredOrders = orders.filter((order) => {
      const matchesSearch =
         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.coachName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
         statusFilter === "all" || order.status === statusFilter;
      const matchesPaymentStatus =
         paymentStatusFilter === "all" ||
         order.paymentStatus === paymentStatusFilter;

      return matchesSearch && matchesStatus && matchesPaymentStatus;
   });

   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentOrders = filteredOrders.slice(startIndex, endIndex);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
   };

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle>Orders ({filteredOrders.length})</CardTitle>
               <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={onExportOrders}>
                     <Download className="h-4 w-4 mr-2" />
                     Export
                  </Button>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search orders..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10"
                  />
               </div>
               <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                     <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Statuses</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="confirmed">Confirmed</SelectItem>
                     <SelectItem value="processing">Processing</SelectItem>
                     <SelectItem value="shipped">Shipped</SelectItem>
                     <SelectItem value="delivered">Delivered</SelectItem>
                     <SelectItem value="cancelled">Cancelled</SelectItem>
                     <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
               </Select>
               <Select
                  value={paymentStatusFilter}
                  onValueChange={setPaymentStatusFilter}>
                  <SelectTrigger>
                     <SelectValue placeholder="Filter by payment" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Payment Statuses</SelectItem>
                     <SelectItem value="paid">Paid</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="failed">Failed</SelectItem>
                     <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-muted/50">
                     <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Order
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Patient
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Coach
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Payment
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Total
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y">
                     {currentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/50">
                           <td className="px-4 py-3">
                              <div className="space-y-1">
                                 <div className="font-medium">
                                    {order.orderNumber}
                                 </div>
                                 <div className="text-sm text-muted-foreground">
                                    {order.items.length} item
                                    {order.items.length !== 1 ? "s" : ""}
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                 <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                       {order.patientName
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <div className="font-medium">
                                       {order.patientName}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       {order.patientEmail}
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              {order.coachName ? (
                                 <div className="text-sm font-medium">
                                    {order.coachName}
                                 </div>
                              ) : (
                                 <div className="text-sm text-muted-foreground">
                                    Unassigned
                                 </div>
                              )}
                           </td>
                           <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                 {getStatusIcon(order.status)}
                                 <Badge
                                    variant={getStatusBadgeVariant(
                                       order.status
                                    )}>
                                    {order.status}
                                 </Badge>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <div className="space-y-1">
                                 <div className="text-sm">
                                    {getPaymentMethodLabel(order.paymentMethod)}
                                 </div>
                                 <Badge
                                    variant={getPaymentStatusBadgeVariant(
                                       order.paymentStatus
                                    )}>
                                    {order.paymentStatus}
                                 </Badge>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <div className="font-medium">
                                 ${order.total.toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                 {order.currency}
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <div className="text-sm">
                                 {new Date(
                                    order.createdAt
                                 ).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                 {new Date(
                                    order.createdAt
                                 ).toLocaleTimeString()}
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                       <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                       onClick={() => onViewDetails(order)}>
                                       <Eye className="mr-2 h-4 w-4" />
                                       View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       onClick={() => onEditOrder(order)}>
                                       <Edit className="mr-2 h-4 w-4" />
                                       Edit Order
                                    </DropdownMenuItem>
                                    {order.status === "pending" && (
                                       <DropdownMenuItem
                                          onClick={() =>
                                             onUpdateStatus(order, "confirmed")
                                          }>
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Confirm Order
                                       </DropdownMenuItem>
                                    )}
                                    {order.status === "confirmed" && (
                                       <DropdownMenuItem
                                          onClick={() =>
                                             onUpdateStatus(order, "processing")
                                          }>
                                          <Package className="mr-2 h-4 w-4" />
                                          Start Processing
                                       </DropdownMenuItem>
                                    )}
                                    {order.status === "processing" && (
                                       <DropdownMenuItem
                                          onClick={() =>
                                             onUpdateStatus(order, "shipped")
                                          }>
                                          <Truck className="mr-2 h-4 w-4" />
                                          Mark as Shipped
                                       </DropdownMenuItem>
                                    )}
                                    {order.status === "shipped" && (
                                       <DropdownMenuItem
                                          onClick={() =>
                                             onUpdateStatus(order, "delivered")
                                          }>
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Mark as Delivered
                                       </DropdownMenuItem>
                                    )}
                                    {order.status !== "cancelled" &&
                                       order.status !== "refunded" && (
                                          <DropdownMenuItem
                                             onClick={() =>
                                                onUpdateStatus(
                                                   order,
                                                   "cancelled"
                                                )
                                             }
                                             className="text-red-600">
                                             <XCircle className="mr-2 h-4 w-4" />
                                             Cancel Order
                                          </DropdownMenuItem>
                                       )}
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {currentOrders.length === 0 && (
               <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders found</p>
               </div>
            )}

            {totalPages > 1 && (
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredOrders.length}
                  itemsPerPage={itemsPerPage}
                  showItemsPerPage={true}
                  onItemsPerPageChange={handleItemsPerPageChange}
               />
            )}
         </CardContent>
      </Card>
   );
}
