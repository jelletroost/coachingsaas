"use client";
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
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Calendar,
   CheckCircle,
   DollarSign,
   Edit,
   MoreHorizontal,
   Package,
   Plus,
   Trash2,
   Users,
   XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CreatePlanModal } from "./CreatePlanModal";
import { EditPlanModal } from "./EditPlanModal";

export interface SubscriptionPlan {
   id: string;
   name: string;
   description: string;
   status: "active" | "inactive" | "draft";
   price: number;
   currency: string;
   billingCycle: "monthly" | "quarterly" | "yearly";
   deliveryFrequency: number; // in days
   includedProducts: PlanProduct[];
   features: string[];
   maxSubscribers?: number;
   createdAt: string;
   updatedAt: string;
}

export interface PlanProduct {
   id: string;
   name: string;
   quantity: number;
   unit: string;
   type: "medication" | "supplement" | "service" | "equipment";
   description?: string;
}

const mockProducts: PlanProduct[] = [
   {
      id: "1",
      name: "Blood Pressure Tablet",
      quantity: 1,
      unit: "pack",
      type: "medication",
      description: "30-day supply of blood pressure medication",
   },
   {
      id: "2",
      name: "Coaching Session",
      quantity: 1,
      unit: "session",
      type: "service",
      description: "Monthly health coaching session",
   },
   {
      id: "3",
      name: "Blood Pressure Monitor",
      quantity: 1,
      unit: "device",
      type: "equipment",
      description: "Digital blood pressure monitoring device",
   },
   {
      id: "4",
      name: "Omega-3 Supplement",
      quantity: 1,
      unit: "bottle",
      type: "supplement",
      description: "Heart health supplement",
   },
   {
      id: "5",
      name: "Nutrition Consultation",
      quantity: 1,
      unit: "session",
      type: "service",
      description: "Monthly nutrition consultation",
   },
];

const mockPlans: SubscriptionPlan[] = [
   {
      id: "1",
      name: "Hypertension Care Plan",
      description: "Comprehensive care plan for hypertension management",
      status: "active",
      price: 89,
      currency: "USD",
      billingCycle: "monthly",
      deliveryFrequency: 30,
      includedProducts: [
         mockProducts[0], // Blood Pressure Tablet
         mockProducts[1], // Coaching Session
      ],
      features: [
         "Personalized medication management",
         "Monthly health coaching",
         "24/7 support",
         "Progress tracking",
         "Medication reminders",
      ],
      maxSubscribers: 100,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
   },
   {
      id: "2",
      name: "Diabetes Management Plan",
      description: "Complete diabetes care and monitoring plan",
      status: "active",
      price: 129,
      currency: "USD",
      billingCycle: "monthly",
      deliveryFrequency: 30,
      includedProducts: [
         mockProducts[2], // Blood Pressure Monitor
         mockProducts[4], // Nutrition Consultation
      ],
      features: [
         "Blood glucose monitoring",
         "Nutrition consultation",
         "Medication management",
         "Lifestyle coaching",
         "Emergency support",
      ],
      maxSubscribers: 75,
      createdAt: "2024-02-01",
      updatedAt: "2024-02-01",
   },
   {
      id: "3",
      name: "Heart Health Premium",
      description: "Premium cardiovascular health plan",
      status: "draft",
      price: 199,
      currency: "USD",
      billingCycle: "monthly",
      deliveryFrequency: 30,
      includedProducts: [
         mockProducts[3], // Omega-3 Supplement
         mockProducts[1], // Coaching Session
         mockProducts[4], // Nutrition Consultation
      ],
      features: [
         "Comprehensive heart health monitoring",
         "Premium supplements",
         "Expert coaching",
         "Advanced analytics",
         "Priority support",
      ],
      createdAt: "2024-03-01",
      updatedAt: "2024-03-01",
   },
];

export function PlanManagement() {
   const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans);
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
      null
   );
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("all");

   const filteredPlans = plans.filter((plan) => {
      const matchesSearch =
         plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
         statusFilter === "all" || plan.status === statusFilter;
      return matchesSearch && matchesStatus;
   });

   const handleCreatePlan = (
      planData: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt">
   ) => {
      const newPlan: SubscriptionPlan = {
         ...planData,
         id: `plan_${Date.now()}`,
         createdAt: new Date().toISOString().split("T")[0],
         updatedAt: new Date().toISOString().split("T")[0],
      };

      setPlans((prev) => [newPlan, ...prev]);
      toast.success(`Plan "${newPlan.name}" created successfully`);
   };

   const handleEditPlan = (plan: SubscriptionPlan) => {
      setSelectedPlan(plan);
      setIsEditModalOpen(true);
   };

   const handleUpdatePlan = (planData: SubscriptionPlan) => {
      setPlans((prev) =>
         prev.map((p) =>
            p.id === planData.id
               ? {
                    ...planData,
                    updatedAt: new Date().toISOString().split("T")[0],
                 }
               : p
         )
      );
      toast.success(`Plan "${planData.name}" updated successfully`);
   };

   const handleDeletePlan = (plan: SubscriptionPlan) => {
      setPlans((prev) => prev.filter((p) => p.id !== plan.id));
      toast.success(`Plan "${plan.name}" deleted successfully`);
   };

   const handleToggleStatus = (plan: SubscriptionPlan) => {
      const newStatus = plan.status === "active" ? "inactive" : "active";
      setPlans((prev) =>
         prev.map((p) =>
            p.id === plan.id
               ? {
                    ...p,
                    status: newStatus,
                    updatedAt: new Date().toISOString().split("T")[0],
                 }
               : p
         )
      );
      toast.success(`Plan "${plan.name}" ${newStatus}`);
   };

   const getStatusBadgeVariant = (status: SubscriptionPlan["status"]) => {
      switch (status) {
         case "active":
            return "default";
         case "inactive":
            return "secondary";
         case "draft":
            return "outline";
         default:
            return "outline";
      }
   };

   const getStatusIcon = (status: SubscriptionPlan["status"]) => {
      switch (status) {
         case "active":
            return <CheckCircle className="h-4 w-4 text-green-500" />;
         case "inactive":
            return <XCircle className="h-4 w-4 text-red-500" />;
         case "draft":
            return <Package className="h-4 w-4 text-yellow-500" />;
         default:
            return <Package className="h-4 w-4 text-gray-500" />;
      }
   };

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
               <h2 className="text-2xl font-bold tracking-tight">
                  Subscription Plans
               </h2>
               <p className="text-muted-foreground">
                  Manage subscription plans that patients can purchase
               </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
               <Plus className="mr-2 h-4 w-4" />
               Create Plan
            </Button>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Plans
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{plans.length}</div>
                  <p className="text-xs text-muted-foreground">
                     Available plans
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Active Plans
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {plans.filter((p) => p.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Currently active
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Average Price
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     $
                     {(
                        plans.reduce((sum, p) => sum + p.price, 0) /
                        plans.length
                     ).toFixed(0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Per month</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Products
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {plans.reduce(
                        (sum, p) => sum + p.includedProducts.length,
                        0
                     )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Across all plans
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Filters */}
         <Card>
            <CardHeader>
               <h3 className="text-lg font-semibold">Filters</h3>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <Label htmlFor="search">Search Plans</Label>
                     <Input
                        id="search"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <div>
                     <Label htmlFor="status">Filter by Status</Label>
                     <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}>
                        <SelectTrigger>
                           <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Statuses</SelectItem>
                           <SelectItem value="active">Active</SelectItem>
                           <SelectItem value="inactive">Inactive</SelectItem>
                           <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Plans Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
               <Card key={plan.id} className="relative">
                  <CardHeader>
                     <div className="flex items-start justify-between">
                        <div className="space-y-1">
                           <CardTitle className="text-lg">
                              {plan.name}
                           </CardTitle>
                           <div className="flex items-center space-x-2">
                              {getStatusIcon(plan.status)}
                              <Badge
                                 variant={getStatusBadgeVariant(plan.status)}>
                                 {plan.status}
                              </Badge>
                           </div>
                        </div>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                 <MoreHorizontal className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                 onClick={() => handleEditPlan(plan)}>
                                 <Edit className="mr-2 h-4 w-4" />
                                 Edit Plan
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => handleToggleStatus(plan)}>
                                 {plan.status === "active" ? (
                                    <>
                                       <XCircle className="mr-2 h-4 w-4" />
                                       Deactivate
                                    </>
                                 ) : (
                                    <>
                                       <CheckCircle className="mr-2 h-4 w-4" />
                                       Activate
                                    </>
                                 )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => handleDeletePlan(plan)}
                                 className="text-red-600">
                                 <Trash2 className="mr-2 h-4 w-4" />
                                 Delete
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">
                        {plan.description}
                     </p>

                     <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">${plan.price}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                           {plan.billingCycle}
                        </div>
                     </div>

                     <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                           <Calendar className="h-4 w-4 text-muted-foreground" />
                           <span>
                              Delivery every {plan.deliveryFrequency} days
                           </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                           <Package className="h-4 w-4 text-muted-foreground" />
                           <span>
                              {plan.includedProducts.length} products included
                           </span>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label className="text-sm font-medium">
                           Included Products:
                        </Label>
                        <div className="space-y-1">
                           {plan.includedProducts.slice(0, 3).map((product) => (
                              <div
                                 key={product.id}
                                 className="text-sm text-muted-foreground">
                                 • {product.name} ({product.quantity}{" "}
                                 {product.unit})
                              </div>
                           ))}
                           {plan.includedProducts.length > 3 && (
                              <div className="text-sm text-muted-foreground">
                                 +{plan.includedProducts.length - 3} more
                                 products
                              </div>
                           )}
                        </div>
                     </div>

                     {plan.maxSubscribers && (
                        <div className="text-sm text-muted-foreground">
                           Max subscribers: {plan.maxSubscribers}
                        </div>
                     )}
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Create Plan Modal */}
         <CreatePlanModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreatePlan}
            availableProducts={mockProducts}
         />

         {/* Edit Plan Modal */}
         {selectedPlan && (
            <EditPlanModal
               plan={selectedPlan}
               isOpen={isEditModalOpen}
               onClose={() => {
                  setIsEditModalOpen(false);
                  setSelectedPlan(null);
               }}
               onSubmit={handleUpdatePlan}
               availableProducts={mockProducts}
            />
         )}
      </div>
   );
}
