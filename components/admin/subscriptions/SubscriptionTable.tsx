/* eslint-disable no-unused-vars */
"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   AlertCircle,
   CheckCircle,
   Clock,
   Edit,
   Eye,
   MoreHorizontal,
   Pause,
   RefreshCw,
   Trash2,
   XCircle,
} from "lucide-react";
import { Subscription } from "./mockData";

interface SubscriptionTableProps {
   subscriptions: Subscription[];
   onViewDetails: (subscription: Subscription) => void;
   onEditSubscription: (subscription: Subscription) => void;
   onCancelSubscription: (subscription: Subscription) => void;
   onReactivateSubscription: (subscription: Subscription) => void;
   onSuspendSubscription: (subscription: Subscription) => void;
}

const getStatusIcon = (status: Subscription["status"]) => {
   switch (status) {
      case "active":
         return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
         return <XCircle className="h-4 w-4 text-red-500" />;
      case "expired":
         return <Clock className="h-4 w-4 text-orange-500" />;
      case "pending":
         return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "suspended":
         return <Pause className="h-4 w-4 text-gray-500" />;
      default:
         return <Clock className="h-4 w-4 text-gray-500" />;
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

const getPlanTypeBadgeVariant = (planType: Subscription["planType"]) => {
   switch (planType) {
      case "basic":
         return "outline";
      case "premium":
         return "default";
      case "enterprise":
         return "secondary";
      default:
         return "outline";
   }
};

export function SubscriptionTable({
   subscriptions,
   onViewDetails,
   onEditSubscription,
   onCancelSubscription,
   onReactivateSubscription,
   onSuspendSubscription,
}: SubscriptionTableProps) {
   return (
      <div className="rounded-md border">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-muted/50">
                  <tr>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        User
                     </th>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        Plan
                     </th>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        Status
                     </th>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        Amount
                     </th>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        Next Billing
                     </th>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        Coach
                     </th>
                     <th className="px-4 py-3 text-left text-sm font-medium">
                        Actions
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y">
                  {subscriptions.map((subscription) => (
                     <tr key={subscription.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                 <AvatarFallback>
                                    {subscription.userName
                                       .split(" ")
                                       .map((n) => n[0])
                                       .join("")}
                                 </AvatarFallback>
                              </Avatar>
                              <div>
                                 <div className="font-medium">
                                    {subscription.userName}
                                 </div>
                                 <div className="text-sm text-muted-foreground">
                                    {subscription.userEmail}
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="space-y-1">
                              <div className="font-medium">
                                 {subscription.planName}
                              </div>
                              <Badge
                                 variant={getPlanTypeBadgeVariant(
                                    subscription.planType
                                 )}>
                                 {subscription.planType}
                              </Badge>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-2">
                              {getStatusIcon(subscription.status)}
                              <Badge
                                 variant={getStatusBadgeVariant(
                                    subscription.status
                                 )}>
                                 {subscription.status}
                              </Badge>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="font-medium">
                              ${subscription.amount}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {subscription.billingCycle}
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="text-sm">
                              {new Date(
                                 subscription.nextBillingDate
                              ).toLocaleDateString()}
                           </div>
                           <div className="text-xs text-muted-foreground">
                              {subscription.autoRenew ? "Auto-renew" : "Manual"}
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           {subscription.coachName ? (
                              <div className="text-sm font-medium">
                                 {subscription.coachName}
                              </div>
                           ) : (
                              <div className="text-sm text-muted-foreground">
                                 Unassigned
                              </div>
                           )}
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
                                    onClick={() => onViewDetails(subscription)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onClick={() =>
                                       onEditSubscription(subscription)
                                    }>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                 </DropdownMenuItem>
                                 {subscription.status === "active" && (
                                    <DropdownMenuItem
                                       onClick={() =>
                                          onSuspendSubscription(subscription)
                                       }>
                                       <Pause className="mr-2 h-4 w-4" />
                                       Suspend
                                    </DropdownMenuItem>
                                 )}
                                 {(subscription.status === "suspended" ||
                                    subscription.status === "expired") && (
                                    <DropdownMenuItem
                                       onClick={() =>
                                          onReactivateSubscription(subscription)
                                       }>
                                       <RefreshCw className="mr-2 h-4 w-4" />
                                       Reactivate
                                    </DropdownMenuItem>
                                 )}
                                 {subscription.status === "active" && (
                                    <DropdownMenuItem
                                       onClick={() =>
                                          onCancelSubscription(subscription)
                                       }
                                       className="text-red-600">
                                       <Trash2 className="mr-2 h-4 w-4" />
                                       Cancel
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
      </div>
   );
}
