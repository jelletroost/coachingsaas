"use client";
import { SubscriptionsManagement } from "@/components/admin/subscriptions";
import { PlanManagement } from "@/components/admin/subscriptions/PlanManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSubscriptionsPage() {
   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
            <p className="text-muted-foreground">
               Manage subscriptions and subscription plans
            </p>
         </div>

         <Tabs defaultValue="plans" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
               <TabsTrigger value="subscriptions">
                  User Subscriptions
               </TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-6">
               <PlanManagement />
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6">
               <SubscriptionsManagement />
            </TabsContent>
         </Tabs>
      </div>
   );
}
