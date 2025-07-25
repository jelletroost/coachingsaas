"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, DollarSign, Package, Plus, X } from "lucide-react";
import { useState } from "react";
import { PlanProduct, SubscriptionPlan } from "./PlanManagement";

interface CreatePlanModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (
      planData: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt">
   ) => void;
   availableProducts: PlanProduct[];
}

const billingCycles = [
   { value: "monthly", label: "Monthly" },
   { value: "quarterly", label: "Quarterly" },
   { value: "yearly", label: "Yearly" },
];

const deliveryFrequencies = [
   { value: 7, label: "Weekly (7 days)" },
   { value: 14, label: "Bi-weekly (14 days)" },
   { value: 30, label: "Monthly (30 days)" },
   { value: 60, label: "Bi-monthly (60 days)" },
   { value: 90, label: "Quarterly (90 days)" },
];

export function CreatePlanModal({
   isOpen,
   onClose,
   onSubmit,
   availableProducts,
}: CreatePlanModalProps) {
   const [formData, setFormData] = useState({
      name: "",
      description: "",
      status: "draft" as const,
      price: 0,
      currency: "USD",
      billingCycle: "monthly" as "monthly" | "quarterly" | "yearly",
      deliveryFrequency: 30,
      includedProducts: [] as PlanProduct[],
      features: [] as string[],
      maxSubscribers: undefined as number | undefined,
   });

   const [newFeature, setNewFeature] = useState("");

   const handleAddProduct = (product: PlanProduct) => {
      if (!formData.includedProducts.find((p) => p.id === product.id)) {
         setFormData((prev) => ({
            ...prev,
            includedProducts: [...prev.includedProducts, product],
         }));
      }
   };

   const handleRemoveProduct = (productId: string) => {
      setFormData((prev) => ({
         ...prev,
         includedProducts: prev.includedProducts.filter(
            (p) => p.id !== productId
         ),
      }));
   };

   const handleAddFeature = () => {
      if (newFeature.trim()) {
         setFormData((prev) => ({
            ...prev,
            features: [...prev.features, newFeature.trim()],
         }));
         setNewFeature("");
      }
   };

   const handleRemoveFeature = (featureIndex: number) => {
      setFormData((prev) => ({
         ...prev,
         features: prev.features.filter((_, index) => index !== featureIndex),
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (formData.name.trim() === "") {
         alert("Plan name is required");
         return;
      }

      if (formData.price <= 0) {
         alert("Price must be greater than 0");
         return;
      }

      if (formData.includedProducts.length === 0) {
         alert("At least one product must be included");
         return;
      }

      const planData: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt"> =
         {
            name: formData.name,
            description: formData.description,
            status: formData.status,
            price: formData.price,
            currency: formData.currency,
            billingCycle: formData.billingCycle,
            deliveryFrequency: formData.deliveryFrequency,
            includedProducts: formData.includedProducts,
            features: formData.features,
            maxSubscribers: formData.maxSubscribers,
         };

      onSubmit(planData);
      handleClose();
   };

   const handleClose = () => {
      setFormData({
         name: "",
         description: "",
         status: "draft",
         price: 0,
         currency: "USD",
         billingCycle: "monthly",
         deliveryFrequency: 30,
         includedProducts: [],
         features: [],
         maxSubscribers: undefined,
      });
      setNewFeature("");
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>Create New Subscription Plan</DialogTitle>
               <DialogDescription>
                  Define a new subscription plan with products, pricing, and
                  delivery frequency.
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Basic Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="name">Plan Name *</Label>
                        <Input
                           id="name"
                           value={formData.name}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 name: e.target.value,
                              }))
                           }
                           placeholder="e.g., Hypertension Care Plan"
                           required
                        />
                     </div>
                     <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                           value={formData.status}
                           onValueChange={(value) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 status: value as
                                    | "draft"
                                    | "active"
                                    | "inactive",
                              }))
                           }>
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
                  <div>
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                           setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                           }))
                        }
                        placeholder="Describe what this plan offers..."
                        rows={3}
                     />
                  </div>
               </div>

               <Separator />

               {/* Pricing */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <DollarSign className="h-5 w-5" />
                     <span>Pricing & Billing</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                           id="price"
                           type="number"
                           step="0.01"
                           min="0"
                           value={formData.price}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 price: parseFloat(e.target.value) || 0,
                              }))
                           }
                           required
                        />
                     </div>
                     <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Input
                           id="currency"
                           value={formData.currency}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 currency: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div>
                        <Label htmlFor="billingCycle">Billing Cycle</Label>
                        <Select
                           value={formData.billingCycle}
                           onValueChange={(value) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 billingCycle: value as
                                    | "monthly"
                                    | "quarterly"
                                    | "yearly",
                              }))
                           }>
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              {billingCycles.map((cycle) => (
                                 <SelectItem
                                    key={cycle.value}
                                    value={cycle.value}>
                                    {cycle.label}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Delivery Frequency */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <Calendar className="h-5 w-5" />
                     <span>Delivery Schedule</span>
                  </h3>
                  <div>
                     <Label htmlFor="deliveryFrequency">
                        Delivery Frequency
                     </Label>
                     <Select
                        value={formData.deliveryFrequency.toString()}
                        onValueChange={(value) =>
                           setFormData((prev) => ({
                              ...prev,
                              deliveryFrequency: parseInt(value),
                           }))
                        }>
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {deliveryFrequencies.map((freq) => (
                              <SelectItem
                                 key={freq.value}
                                 value={freq.value.toString()}>
                                 {freq.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <Separator />

               {/* Products */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                     <Package className="h-5 w-5" />
                     <span>Included Products *</span>
                  </h3>

                  {/* Available Products */}
                  <div>
                     <Label>Available Products</Label>
                     <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {availableProducts.map((product) => (
                           <div
                              key={product.id}
                              className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                              onClick={() => handleAddProduct(product)}>
                              <div>
                                 <div className="font-medium">
                                    {product.name}
                                 </div>
                                 <div className="text-sm text-muted-foreground">
                                    {product.description}
                                 </div>
                              </div>
                              <Badge variant="outline">{product.type}</Badge>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Selected Products */}
                  {formData.includedProducts.length > 0 && (
                     <div>
                        <Label>Selected Products</Label>
                        <div className="mt-2 space-y-2">
                           {formData.includedProducts.map((product) => (
                              <div
                                 key={product.id}
                                 className="flex items-center justify-between p-3 bg-muted rounded-md">
                                 <div>
                                    <div className="font-medium">
                                       {product.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       {product.quantity} {product.unit} •{" "}
                                       {product.type}
                                    </div>
                                 </div>
                                 <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                       handleRemoveProduct(product.id)
                                    }>
                                    <X className="h-4 w-4" />
                                 </Button>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>

               <Separator />

               {/* Features */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Plan Features</h3>
                  <div className="space-y-2">
                     <div className="flex space-x-2">
                        <Input
                           value={newFeature}
                           onChange={(e) => setNewFeature(e.target.value)}
                           placeholder="Add a feature..."
                           onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), handleAddFeature())
                           }
                        />
                        <Button type="button" onClick={handleAddFeature}>
                           <Plus className="h-4 w-4" />
                        </Button>
                     </div>
                     {formData.features.length > 0 && (
                        <div className="space-y-2">
                           {formData.features.map((feature, index) => (
                              <div
                                 key={index}
                                 className="flex items-center justify-between p-2 bg-muted rounded-md">
                                 <span className="text-sm">{feature}</span>
                                 <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveFeature(index)}>
                                    <X className="h-4 w-4" />
                                 </Button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               <Separator />

               {/* Additional Settings */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Settings</h3>
                  <div>
                     <Label htmlFor="maxSubscribers">
                        Maximum Subscribers (Optional)
                     </Label>
                     <Input
                        id="maxSubscribers"
                        type="number"
                        min="1"
                        value={formData.maxSubscribers || ""}
                        onChange={(e) =>
                           setFormData((prev) => ({
                              ...prev,
                              maxSubscribers: e.target.value
                                 ? parseInt(e.target.value)
                                 : undefined,
                           }))
                        }
                        placeholder="Leave empty for unlimited"
                     />
                  </div>
               </div>

               {/* Actions */}
               <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={handleClose}>
                     Cancel
                  </Button>
                  <Button type="submit">Create Plan</Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}
