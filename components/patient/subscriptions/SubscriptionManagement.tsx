"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   CreditCard,
   Download,
   Edit,
   Eye,
   FileText,
   Settings,
   TrendingUp,
   Users,
} from "lucide-react";
import { useState } from "react";
import {
   billingHistoryData,
   planFeaturesData,
   subscriptionData,
} from "./mockData";

export function SubscriptionManagement() {
   const [activeTab, setActiveTab] = useState("overview");

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
      }).format(amount);
   };

   return (
      <div className="space-y-6">
         {/* Current Subscription */}
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle className="text-xl">Current Plan</CardTitle>
                     <p className="text-muted-foreground">
                        Manage your subscription and billing
                     </p>
                  </div>
                  <Badge
                     variant={
                        subscriptionData.status === "active"
                           ? "default"
                           : "secondary"
                     }
                     className="text-sm">
                     {subscriptionData.status}
                  </Badge>
               </div>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                     <h3 className="font-semibold text-lg">
                        {subscriptionData.plan.name}
                     </h3>
                     <p className="text-muted-foreground">
                        {subscriptionData.plan.description}
                     </p>
                     <div className="text-2xl font-bold">
                        {formatCurrency(subscriptionData.plan.price)}
                        <span className="text-sm font-normal text-muted-foreground">
                           /month
                        </span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <p className="text-sm text-muted-foreground">
                        Next billing date
                     </p>
                     <p className="font-medium">
                        {formatDate(subscriptionData.nextBillingDate)}
                     </p>
                     <p className="text-sm text-muted-foreground">
                        Billing cycle: {subscriptionData.billingCycle}
                     </p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-sm text-muted-foreground">
                        Plan features
                     </p>
                     <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                           {subscriptionData.plan.features.coachingSessions}{" "}
                           coaching sessions/month
                        </span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                           {subscriptionData.plan.features.resources} resources
                           available
                        </span>
                     </div>
                  </div>
               </div>
               <div className="flex items-center space-x-2 mt-6">
                  <Button variant="outline">
                     <Edit className="h-4 w-4 mr-2" />
                     Change Plan
                  </Button>
                  <Button variant="outline">
                     <Settings className="h-4 w-4 mr-2" />
                     Billing Settings
                  </Button>
                  <Button variant="outline">
                     <Eye className="h-4 w-4 mr-2" />
                     View Details
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="overview">Overview</TabsTrigger>
               <TabsTrigger value="billing">Billing History</TabsTrigger>
               <TabsTrigger value="plans">Available Plans</TabsTrigger>
               <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <TrendingUp className="h-5 w-5" />
                           <span>Usage This Month</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <div className="flex justify-between text-sm">
                              <span>Coaching Sessions</span>
                              <span>
                                 {subscriptionData.usage.sessionsUsed}/
                                 {
                                    subscriptionData.plan.features
                                       .coachingSessions
                                 }
                              </span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                 className="bg-blue-600 h-2 rounded-full"
                                 style={{
                                    width: `${
                                       (subscriptionData.usage.sessionsUsed /
                                          subscriptionData.plan.features
                                             .coachingSessions) *
                                       100
                                    }%`,
                                 }}></div>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between text-sm">
                              <span>Resources Downloaded</span>
                              <span>
                                 {subscriptionData.usage.resourcesDownloaded}
                              </span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                 className="bg-green-600 h-2 rounded-full"
                                 style={{
                                    width: `${Math.min(
                                       (subscriptionData.usage
                                          .resourcesDownloaded /
                                          20) *
                                          100,
                                       100
                                    )}%`,
                                 }}></div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center space-x-3">
                           <CreditCard className="h-8 w-8 text-muted-foreground" />
                           <div>
                              <p className="font-medium">
                                 •••• •••• ••••{" "}
                                 {subscriptionData.paymentMethod.last4}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Expires{" "}
                                 {subscriptionData.paymentMethod.expiryMonth}/
                                 {subscriptionData.paymentMethod.expiryYear}
                              </p>
                           </div>
                           <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {billingHistoryData.map((invoice) => (
                           <div
                              key={invoice.id}
                              className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                 <div className="flex flex-col">
                                    <p className="font-medium">
                                       {invoice.description}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                       {formatDate(invoice.date)}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                 <div className="text-right">
                                    <p className="font-medium">
                                       {formatCurrency(invoice.amount)}
                                    </p>
                                    <Badge
                                       variant={
                                          invoice.status === "paid"
                                             ? "default"
                                             : "secondary"
                                       }
                                       className="text-xs">
                                       {invoice.status}
                                    </Badge>
                                 </div>
                                 <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="plans" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planFeaturesData.map((plan) => (
                     <Card key={plan.id} className="relative">
                        {plan.recommended && (
                           <Badge
                              className="absolute top-4 right-4"
                              variant="default">
                              Recommended
                           </Badge>
                        )}
                        <CardHeader>
                           <CardTitle className="text-xl">
                              {plan.name}
                           </CardTitle>
                           <p className="text-muted-foreground">
                              {plan.description}
                           </p>
                           <div className="text-3xl font-bold">
                              {formatCurrency(plan.price)}
                              <span className="text-sm font-normal text-muted-foreground">
                                 /month
                              </span>
                           </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <ul className="space-y-2">
                              {plan.features.map((feature, index) => (
                                 <li
                                    key={index}
                                    className="flex items-center space-x-2">
                                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                                    <span className="text-sm">{feature}</span>
                                 </li>
                              ))}
                           </ul>
                           <Button
                              className="w-full"
                              variant={
                                 plan.recommended ? "default" : "outline"
                              }>
                              {subscriptionData.plan.id === plan.id
                                 ? "Current Plan"
                                 : "Choose Plan"}
                           </Button>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Detailed Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-6">
                        <div>
                           <h4 className="font-medium mb-3">
                              Coaching Sessions
                           </h4>
                           <div className="space-y-3">
                              {subscriptionData.usage.sessionHistory.map(
                                 (session, index) => (
                                    <div
                                       key={index}
                                       className="flex items-center justify-between p-3 border rounded-lg">
                                       <div>
                                          <p className="font-medium">
                                             {session.title}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                             {formatDate(session.date)}
                                          </p>
                                       </div>
                                       <Badge variant="outline">
                                          {session.duration} min
                                       </Badge>
                                    </div>
                                 )
                              )}
                           </div>
                        </div>
                        <div>
                           <h4 className="font-medium mb-3">
                              Resources Accessed
                           </h4>
                           <div className="space-y-3">
                              {subscriptionData.usage.resourceHistory.map(
                                 (resource, index) => (
                                    <div
                                       key={index}
                                       className="flex items-center justify-between p-3 border rounded-lg">
                                       <div>
                                          <p className="font-medium">
                                             {resource.title}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                             {formatDate(resource.date)}
                                          </p>
                                       </div>
                                       <Badge variant="outline">
                                          {resource.type}
                                       </Badge>
                                    </div>
                                 )
                              )}
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}
