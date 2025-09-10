"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/providers/authProvider";
import { updateRole } from "@/services/auth_service";
import { CheckIcon, UserIcon, Users2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roles = [
   {
      id: "patient",
      title: "Patient",
      description: "Access your health dashboard and track your progress",
      icon: UserIcon,
      features: [
         "Personal health dashboard",
         "Track progress and goals",
         "Connect with coaches",
         "Access health resources",
      ],
   },
   {
      id: "coach",
      title: "Coach",
      description: "Help patients achieve their health goals",
      icon: Users2Icon,
      features: [
         "Manage patient profiles",
         "Create treatment plans",
         "Monitor patient progress",
         "Access coaching tools",
      ],
   },
];

export default function ChooseRolePage() {
   const { user } = useAuth();
   const router = useRouter();
   const [selectedRole, setSelectedRole] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);

   const handleRoleSelect = (roleId: string) => {
      setSelectedRole(roleId);
   };

   const handleSaveRole = async () => {
      if (!selectedRole || !user) return;

      setIsLoading(true);
      try {
         const response = await updateRole(selectedRole);

         if (response.error) {
            console.error("Error updating user role:", response.error);
            return;
         }

         // Redirect based on selected role
         const redirectPaths = {
            patient: "/dashboard",
            coach: "/coach/overview",
            admin: "/admin/overview",
         };

         const redirectPath =
            redirectPaths[selectedRole as keyof typeof redirectPaths];
         router.push(redirectPath);
      } catch (error) {
         console.error("Error saving role:", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
               <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Choose Your Role
               </h1>
               <p className="text-muted-foreground">
                  Select the role that best describes how you&apos;ll be using
                  the platform
               </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
               {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;

                  return (
                     <Card
                        key={role.id}
                        className={`cursor-pointer min-w-[300px] min-h-[400px] transition-all duration-200 hover:shadow-lg ${
                           isSelected
                              ? "ring-2 ring-primary border-primary shadow-lg"
                              : "hover:border-primary/50"
                        }`}
                        onClick={() => handleRoleSelect(role.id)}>
                        <CardHeader className="text-center pb-4">
                           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                              <Icon className="h-8 w-8 text-primary" />
                           </div>
                           <CardTitle className="text-xl">
                              {role.title}
                           </CardTitle>
                           <CardDescription className="text-sm">
                              {role.description}
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-2">
                              {role.features.map((feature, index) => (
                                 <li
                                    key={index}
                                    className="flex items-center text-sm">
                                    <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                 </li>
                              ))}
                           </ul>
                           {isSelected && (
                              <div className="mt-4 flex items-center justify-center">
                                 <div className="flex items-center text-primary font-medium text-sm">
                                    <CheckIcon className="h-4 w-4 mr-1" />
                                    Selected
                                 </div>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  );
               })}
            </div>

            <div className="text-center">
               <Button
                  onClick={handleSaveRole}
                  disabled={!selectedRole || isLoading}
                  size="lg"
                  className="px-8">
                  {isLoading ? "Saving..." : "Continue"}
               </Button>
            </div>
         </div>
      </div>
   );
}
