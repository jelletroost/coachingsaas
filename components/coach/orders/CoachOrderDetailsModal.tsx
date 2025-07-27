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
   MapPin,
   Package,
   Phone,
   Repeat,
   Truck,
   XCircle,
} from "lucide-react";
import { CoachOrder } from "./mockData";

interface CoachOrderDetailsModalProps {
   order: CoachOrder | null;
   isOpen: boolean;
   onClose: () => void;
}

const getStatusIcon = (status: CoachOrder["status"]) => {
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

const getStatusBadgeVariant = (status: CoachOrder["status"]) => {
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

const getPaymentMethodLabel = (method: CoachOrder["paymentMethod"]) => {
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

const getPaymentStatusBadgeVariant = (status: CoachOrder["paymentStatus"]) => {
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

export function CoachOrderDetailsModal({
   order,
   isOpen,
   onClose,
}: CoachOrderDetailsModalProps) {
   if (!order) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-2">
                  <span>Order Details</span>
                  <Badge variant="outline">{order.orderNumber}</Badge>
               </DialogTitle>
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
                  <div className="flex items-center space-x-2">
                     {order.isSubscriptionOrder ? (
                        <>
                           <Repeat className="h-4 w-4 text-blue-500" />
                           <Badge variant="outline">Subscription Order</Badge>
                        </>
                     ) : (
                        <Badge variant="secondary">One-time Order</Badge>
                     )}
                  </div>
               </div>

               {/* Patient Information */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">
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
                        </div>
                     </div>
                     {order.patientPhone && (
                        <div className="flex items-center space-x-2 text-sm">
                           <Phone className="h-4 w-4" />
                           <span>{order.patientPhone}</span>
                        </div>
                     )}
                  </div>

                  {/* Order Information */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">
                        Order Information
                     </h3>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span>Order Date:</span>
                           <span>
                              {new Date(order.createdAt).toLocaleDateString()}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span>Last Updated:</span>
                           <span>
                              {new Date(order.updatedAt).toLocaleDateString()}
                           </span>
                        </div>
                        {order.estimatedDelivery && (
                           <div className="flex justify-between">
                              <span>Estimated Delivery:</span>
                              <span>{order.estimatedDelivery}</span>
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
                     </div>
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
                           className="flex items-center justify-between p-3 border rounded-lg">
                           <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                 {item.description}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                 Qty: {item.quantity} × ${item.unitPrice}
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="font-medium">
                                 ${item.totalPrice.toFixed(2)}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                 {item.type}
                              </Badge>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <Separator />

               {/* Payment Information */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">Payment Details</h3>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span>Payment Method:</span>
                           <span>
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
                              <span>{order.insuranceProvider}</span>
                           </div>
                        )}
                        {order.prescriptionRequired && (
                           <div className="flex justify-between">
                              <span>Prescription Required:</span>
                              <span>Yes</span>
                           </div>
                        )}
                        {order.prescriptionStatus && (
                           <div className="flex justify-between">
                              <span>Prescription Status:</span>
                              <Badge variant="outline">
                                 {order.prescriptionStatus}
                              </Badge>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">Order Summary</h3>
                     <div className="space-y-2 text-sm">
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
                        <div className="flex justify-between font-medium">
                           <span>Total:</span>
                           <span>
                              ${order.total.toFixed(2)} {order.currency}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Shipping Address */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Shipping Address</h3>
                  <div className="flex items-start space-x-2">
                     <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                     <div className="text-sm">
                        <div>{order.shippingAddress.street}</div>
                        <div>
                           {order.shippingAddress.city},{" "}
                           {order.shippingAddress.state}{" "}
                           {order.shippingAddress.zipCode}
                        </div>
                        <div>{order.shippingAddress.country}</div>
                     </div>
                  </div>
               </div>

               {/* Notes */}
               {order.notes && (
                  <>
                     <Separator />
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Notes</h3>
                        <div className="p-3 bg-muted/50 rounded-lg text-sm">
                           {order.notes}
                        </div>
                     </div>
                  </>
               )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
               <Button variant="outline" onClick={onClose}>
                  Close
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
