/* eslint-disable no-unused-vars */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
   AlertCircle,
   CheckCircle,
   Clock,
   Edit,
   MapPin,
   Package,
   Phone,
   Truck,
   User,
   XCircle,
} from "lucide-react";
import { Order } from "./mockData";

interface OrderDetailsModalProps {
   order: Order | null;
   isOpen: boolean;
   onClose: () => void;
   onEdit: (order: Order) => void;
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

const getItemTypeBadgeVariant = (type: Order["items"][0]["type"]) => {
   switch (type) {
      case "medication":
         return "destructive";
      case "supplement":
         return "default";
      case "consultation":
         return "secondary";
      case "program":
         return "default";
      default:
         return "secondary";
   }
};

export function OrderDetailsModal({
   order,
   isOpen,
   onClose,
   onEdit,
}: OrderDetailsModalProps) {
   if (!order) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold">
                     Order Details - {order.orderNumber}
                  </DialogTitle>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => onEdit(order)}>
                     <Edit className="h-4 w-4 mr-2" />
                     Edit Order
                  </Button>
               </div>
            </DialogHeader>

            <div className="space-y-6">
               {/* Order Status */}
               <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                     {getStatusIcon(order.status)}
                     <div>
                        <div className="font-medium">Order Status</div>
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                           {order.status}
                        </Badge>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm text-muted-foreground">
                        Order Date
                     </div>
                     <div className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                     </div>
                  </div>
               </div>

               {/* Patient & Coach Information */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Patient Information
                     </h3>
                     <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
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
                           {order.patientPhone && (
                              <div className="text-sm text-muted-foreground flex items-center">
                                 <Phone className="h-3 w-3 mr-1" />
                                 {order.patientPhone}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Coach Information
                     </h3>
                     {order.coachName ? (
                        <div className="flex items-center space-x-3">
                           <Avatar className="h-12 w-12">
                              <AvatarFallback>
                                 {order.coachName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div>
                              <div className="font-medium">
                                 {order.coachName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                 Assigned Coach
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="text-muted-foreground">
                           No coach assigned
                        </div>
                     )}
                  </div>
               </div>

               <Separator />

               {/* Order Items */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Order Items</h3>
                  <div className="space-y-3">
                     {order.items.map((item) => (
                        <div
                           key={item.id}
                           className="flex items-center justify-between p-4 border rounded-lg">
                           <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                 <Badge
                                    variant={getItemTypeBadgeVariant(
                                       item.type
                                    )}>
                                    {item.type}
                                 </Badge>
                                 <div className="font-medium">{item.name}</div>
                              </div>
                              {item.description && (
                                 <div className="text-sm text-muted-foreground mt-1">
                                    {item.description}
                                 </div>
                              )}
                           </div>
                           <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                 Qty: {item.quantity}
                              </div>
                              <div className="font-medium">
                                 ${item.totalPrice.toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                 ${item.unitPrice.toFixed(2)} each
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <Separator />

               {/* Payment Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span>Payment Method:</span>
                           <span className="font-medium">
                              {getPaymentMethodLabel(order.paymentMethod)}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span>Payment Status:</span>
                           <Badge
                              variant={getPaymentStatusBadgeVariant(
                                 order.paymentStatus
                              )}>
                              {order.paymentStatus}
                           </Badge>
                        </div>
                        {order.insuranceProvider && (
                           <div className="flex justify-between">
                              <span>Insurance Provider:</span>
                              <span className="font-medium">
                                 {order.insuranceProvider}
                              </span>
                           </div>
                        )}
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span>Subtotal:</span>
                           <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Tax:</span>
                           <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Shipping:</span>
                           <span>${order.shipping.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                           <span>Total:</span>
                           <span>
                              ${order.total.toFixed(2)} {order.currency}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Addresses */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Shipping Address
                     </h3>
                     <div className="text-sm space-y-1">
                        <div>{order.shippingAddress.street}</div>
                        <div>
                           {order.shippingAddress.city},{" "}
                           {order.shippingAddress.state}{" "}
                           {order.shippingAddress.zipCode}
                        </div>
                        <div>{order.shippingAddress.country}</div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Billing Address
                     </h3>
                     <div className="text-sm space-y-1">
                        <div>{order.billingAddress.street}</div>
                        <div>
                           {order.billingAddress.city},{" "}
                           {order.billingAddress.state}{" "}
                           {order.billingAddress.zipCode}
                        </div>
                        <div>{order.billingAddress.country}</div>
                     </div>
                  </div>
               </div>

               {/* Additional Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                     Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span>Prescription Required:</span>
                           <Badge
                              variant={
                                 order.prescriptionRequired
                                    ? "destructive"
                                    : "default"
                              }>
                              {order.prescriptionRequired ? "Yes" : "No"}
                           </Badge>
                        </div>
                        {order.prescriptionStatus && (
                           <div className="flex justify-between">
                              <span>Prescription Status:</span>
                              <Badge
                                 variant={
                                    order.prescriptionStatus === "approved"
                                       ? "default"
                                       : order.prescriptionStatus === "rejected"
                                       ? "destructive"
                                       : "secondary"
                                 }>
                                 {order.prescriptionStatus}
                              </Badge>
                           </div>
                        )}
                        {order.trackingNumber && (
                           <div className="flex justify-between">
                              <span>Tracking Number:</span>
                              <span className="font-mono">
                                 {order.trackingNumber}
                              </span>
                           </div>
                        )}
                        {order.estimatedDelivery && (
                           <div className="flex justify-between">
                              <span>Estimated Delivery:</span>
                              <span>{order.estimatedDelivery}</span>
                           </div>
                        )}
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span>Last Updated:</span>
                           <span>
                              {new Date(order.updatedAt).toLocaleDateString()}
                           </span>
                        </div>
                        {order.notes && (
                           <div>
                              <div className="text-sm font-medium mb-1">
                                 Notes:
                              </div>
                              <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded">
                                 {order.notes}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
