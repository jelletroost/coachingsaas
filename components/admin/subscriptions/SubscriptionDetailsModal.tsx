/* eslint-disable no-unused-vars */
"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
   AlertCircle,
   Calendar,
   CheckCircle,
   Clock,
   CreditCard,
   DollarSign,
   Pause,
   User,
   XCircle,
} from "lucide-react";
import { Subscription } from "./mockData";

interface SubscriptionDetailsModalProps {
   subscription: Subscription | null;
   isOpen: boolean;
   onClose: () => void;
   onEdit: (subscription: Subscription) => void;
}

const getStatusIcon = (status: Subscription["status"]) => {
   switch (status) {
      case "active":
         return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
         return <XCircle className="h-5 w-5 text-red-500" />;
      case "expired":
         return <Clock className="h-5 w-5 text-orange-500" />;
      case "pending":
         return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "suspended":
         return <Pause className="h-5 w-5 text-gray-500" />;
      default:
         return <Clock className="h-5 w-5 text-gray-500" />;
   }
};

const getStatusBadgeVariant = (status: Subscription["status"]) => {
   switch (status) {
      case "active":
         return "default";
      case "cancelled":
         return "destructive";
      case "expired":
         return "secondary";
      case "pending":
         return "outline";
      case "suspended":
         return "secondary";
      default:
         return "outline";
   }
};

export function SubscriptionDetailsModal({
   subscription,
   isOpen,
   onClose,
   onEdit,
}: SubscriptionDetailsModalProps) {
   if (!subscription) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-2">
                  <span>Subscription Details</span>
                  <div className="flex items-center space-x-2">
                     {getStatusIcon(subscription.status)}
                     <Badge
                        variant={getStatusBadgeVariant(subscription.status)}>
                        {subscription.status}
                     </Badge>
                  </div>
               </DialogTitle>
               <DialogDescription>
                  Detailed information about {subscription.userName}&apos;s
                  subscription
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
               {/* User Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <User className="h-5 w-5" />
                     <span>User Information</span>
                  </h3>
                  <div className="flex items-center space-x-4">
                     <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                           {subscription.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <div className="text-xl font-semibold">
                           {subscription.userName}
                        </div>
                        <div className="text-muted-foreground">
                           {subscription.userEmail}
                        </div>
                        <div className="text-sm text-muted-foreground">
                           User ID: {subscription.userId}
                        </div>
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Subscription Plan */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <DollarSign className="h-5 w-5" />
                     <span>Subscription Plan</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Plan Name
                        </div>
                        <div className="text-lg font-semibold">
                           {subscription.planName}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Plan Type
                        </div>
                        <Badge
                           variant="outline"
                           className="text-base px-3 py-1">
                           {subscription.planType}
                        </Badge>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Amount
                        </div>
                        <div className="text-lg font-semibold">
                           ${subscription.amount} {subscription.currency}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Billing Cycle
                        </div>
                        <div className="text-lg font-semibold capitalize">
                           {subscription.billingCycle}
                        </div>
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Dates */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <Calendar className="h-5 w-5" />
                     <span>Important Dates</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Start Date
                        </div>
                        <div className="text-base">
                           {new Date(
                              subscription.startDate
                           ).toLocaleDateString()}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           End Date
                        </div>
                        <div className="text-base">
                           {new Date(subscription.endDate).toLocaleDateString()}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Next Billing
                        </div>
                        <div className="text-base">
                           {new Date(
                              subscription.nextBillingDate
                           ).toLocaleDateString()}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Auto Renew
                        </div>
                        <div className="text-base">
                           {subscription.autoRenew ? "Yes" : "No"}
                        </div>
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Payment Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <CreditCard className="h-5 w-5" />
                     <span>Payment Information</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Payment Method
                        </div>
                        <div className="text-base">
                           {subscription.paymentMethod}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Last Payment Date
                        </div>
                        <div className="text-base">
                           {new Date(
                              subscription.lastPaymentDate
                           ).toLocaleDateString()}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-muted-foreground">
                           Last Payment Amount
                        </div>
                        <div className="text-base">
                           ${subscription.lastPaymentAmount}{" "}
                           {subscription.currency}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Coach Assignment */}
               {subscription.coachName && (
                  <>
                     <Separator />
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center space-x-2">
                           <User className="h-5 w-5" />
                           <span>Assigned Coach</span>
                        </h3>
                        <div>
                           <div className="text-sm font-medium text-muted-foreground">
                              Coach Name
                           </div>
                           <div className="text-base font-semibold">
                              {subscription.coachName}
                           </div>
                           {subscription.coachId && (
                              <div className="text-sm text-muted-foreground">
                                 Coach ID: {subscription.coachId}
                              </div>
                           )}
                        </div>
                     </div>
                  </>
               )}

               {/* Features */}
               <Separator />
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Plan Features</h3>
                  <div className="grid grid-cols-1 gap-2">
                     {subscription.features.map((feature, index) => (
                        <div
                           key={index}
                           className="flex items-center space-x-2">
                           <CheckCircle className="h-4 w-4 text-green-500" />
                           <span className="text-sm">{feature}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Notes */}
               {subscription.notes && (
                  <>
                     <Separator />
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Notes</h3>
                        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                           {subscription.notes}
                        </div>
                     </div>
                  </>
               )}

               {/* Actions */}
               <Separator />
               <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>
                     Close
                  </Button>
                  <Button onClick={() => onEdit(subscription)}>
                     Edit Subscription
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
