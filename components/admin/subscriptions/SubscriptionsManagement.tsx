"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   AlertCircle,
   DollarSign,
   Download,
   Filter,
   Search,
   TrendingUp,
   Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SubscriptionDetailsModal } from "./SubscriptionDetailsModal";
import { SubscriptionTable } from "./SubscriptionTable";
import {
   mockSubscriptions,
   subscriptionStats,
   type Subscription,
} from "./mockData";

export function SubscriptionsManagement() {
   const [subscriptions, setSubscriptions] =
      useState<Subscription[]>(mockSubscriptions);
   const [selectedSubscription, setSelectedSubscription] =
      useState<Subscription | null>(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("all");
   const [planTypeFilter, setPlanTypeFilter] = useState<string>("all");

   const filteredSubscriptions = subscriptions.filter((subscription) => {
      const matchesSearch =
         subscription.userName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
         subscription.userEmail
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
         subscription.planName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
         statusFilter === "all" || subscription.status === statusFilter;
      const matchesPlanType =
         planTypeFilter === "all" || subscription.planType === planTypeFilter;

      return matchesSearch && matchesStatus && matchesPlanType;
   });

   const handleViewDetails = (subscription: Subscription) => {
      setSelectedSubscription(subscription);
      setIsDetailsModalOpen(true);
   };

   const handleEditSubscription = (subscription: Subscription) => {
      toast.success(
         `Edit functionality for ${subscription.userName} coming soon!`
      );
   };

   const handleCancelSubscription = (subscription: Subscription) => {
      setSubscriptions((prev) =>
         prev.map((s) =>
            s.id === subscription.id
               ? { ...s, status: "cancelled" as const }
               : s
         )
      );
      toast.success(
         `${subscription.userName}'s subscription has been cancelled`
      );
   };

   const handleReactivateSubscription = (subscription: Subscription) => {
      setSubscriptions((prev) =>
         prev.map((s) =>
            s.id === subscription.id ? { ...s, status: "active" as const } : s
         )
      );
      toast.success(
         `${subscription.userName}'s subscription has been reactivated`
      );
   };

   const handleSuspendSubscription = (subscription: Subscription) => {
      setSubscriptions((prev) =>
         prev.map((s) =>
            s.id === subscription.id
               ? { ...s, status: "suspended" as const }
               : s
         )
      );
      toast.success(
         `${subscription.userName}'s subscription has been suspended`
      );
   };

   const handleExportSubscriptions = () => {
      toast.success("Export functionality coming soon!");
   };

   const handleAddSubscription = () => {
      toast.success("Add subscription functionality coming soon!");
   };

   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {subscriptionStats.total}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     All subscriptions
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Active Subscriptions
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {subscriptionStats.active}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Currently active
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Monthly Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     ${subscriptionStats.monthlyRevenue.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     From active subscriptions
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Pending Issues
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {subscriptionStats.suspended + subscriptionStats.pending}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Suspended + Pending
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Filters and Actions */}
         <Card>
            <CardHeader>
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                     <Filter className="h-5 w-5" />
                     <h3 className="text-lg font-semibold">Filters</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Button
                        variant="outline"
                        onClick={handleExportSubscriptions}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                     </Button>
                     <Button onClick={handleAddSubscription}>
                        Add Subscription
                     </Button>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                     <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="Search subscriptions..."
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                     </SelectContent>
                  </Select>
                  <Select
                     value={planTypeFilter}
                     onValueChange={setPlanTypeFilter}>
                     <SelectTrigger>
                        <SelectValue placeholder="Filter by plan type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </CardContent>
         </Card>

         {/* Results Summary */}
         <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
               Showing {filteredSubscriptions.length} of {subscriptions.length}{" "}
               subscriptions
            </div>
            <div className="flex items-center space-x-2">
               <Badge variant="outline">
                  Active: {subscriptionStats.active}
               </Badge>
               <Badge variant="outline">
                  Premium: {subscriptionStats.premium}
               </Badge>
               <Badge variant="outline">
                  Enterprise: {subscriptionStats.enterprise}
               </Badge>
            </div>
         </div>

         {/* Subscription Table */}
         <SubscriptionTable
            subscriptions={filteredSubscriptions}
            onViewDetails={handleViewDetails}
            onEditSubscription={handleEditSubscription}
            onCancelSubscription={handleCancelSubscription}
            onReactivateSubscription={handleReactivateSubscription}
            onSuspendSubscription={handleSuspendSubscription}
         />

         {/* Subscription Details Modal */}
         <SubscriptionDetailsModal
            subscription={selectedSubscription}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onEdit={handleEditSubscription}
         />
      </div>
   );
}
