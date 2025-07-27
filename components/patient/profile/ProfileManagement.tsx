"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Edit, Heart, Save } from "lucide-react";
import { useState } from "react";
import { healthMetricsData, patientProfileData } from "./mockData";

export function ProfileManagement() {
   const [isEditing, setIsEditing] = useState(false);
   const [profileData, setProfileData] = useState(patientProfileData);

   // const handleSave = () => {
   //    setIsEditing(false);
   //    // TODO: Save profile data to backend
   //    console.log("Saving profile data:", profileData);
   // };

   const handleInputChange = (field: string, value: string) => {
      setProfileData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   return (
      <div className="space-y-6">
         {/* Profile Header */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex items-start space-x-6">
                  <div className="relative">
                     <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatar} />
                        <AvatarFallback className="text-2xl">
                           {profileData.firstName[0]}
                           {profileData.lastName[0]}
                        </AvatarFallback>
                     </Avatar>
                     <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                        <Camera className="h-4 w-4" />
                     </Button>
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center justify-between">
                        <div>
                           <h2 className="text-2xl font-bold">
                              {profileData.firstName} {profileData.lastName}
                           </h2>
                           <p className="text-muted-foreground">
                              {profileData.email}
                           </p>
                           <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline">
                                 {profileData.status}
                              </Badge>
                              <Badge variant="secondary">Patient</Badge>
                           </div>
                        </div>
                        <Button
                           onClick={() => setIsEditing(!isEditing)}
                           variant={isEditing ? "default" : "outline"}>
                           {isEditing ? (
                              <Save className="h-4 w-4 mr-2" />
                           ) : (
                              <Edit className="h-4 w-4 mr-2" />
                           )}
                           {isEditing ? "Save" : "Edit Profile"}
                        </Button>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Profile Tabs */}
         <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="personal">Personal Info</TabsTrigger>
               <TabsTrigger value="health">Health Data</TabsTrigger>
               <TabsTrigger value="preferences">Preferences</TabsTrigger>
               <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="firstName">First Name</Label>
                           <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) =>
                                 handleInputChange("firstName", e.target.value)
                              }
                              disabled={!isEditing}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="lastName">Last Name</Label>
                           <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) =>
                                 handleInputChange("lastName", e.target.value)
                              }
                              disabled={!isEditing}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) =>
                                 handleInputChange("email", e.target.value)
                              }
                              disabled={!isEditing}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) =>
                                 handleInputChange("phone", e.target.value)
                              }
                              disabled={!isEditing}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="dateOfBirth">Date of Birth</Label>
                           <Input
                              id="dateOfBirth"
                              type="date"
                              value={profileData.dateOfBirth}
                              onChange={(e) =>
                                 handleInputChange(
                                    "dateOfBirth",
                                    e.target.value
                                 )
                              }
                              disabled={!isEditing}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="gender">Gender</Label>
                           <Input
                              id="gender"
                              value={profileData.gender}
                              onChange={(e) =>
                                 handleInputChange("gender", e.target.value)
                              }
                              disabled={!isEditing}
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                           id="address"
                           value={profileData.address}
                           onChange={(e) =>
                              handleInputChange("address", e.target.value)
                           }
                           disabled={!isEditing}
                           rows={3}
                        />
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <Heart className="h-5 w-5" />
                           <span>Health Metrics</span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <Label className="text-sm text-muted-foreground">
                                 Height
                              </Label>
                              <p className="text-lg font-medium">
                                 {healthMetricsData.height}
                              </p>
                           </div>
                           <div>
                              <Label className="text-sm text-muted-foreground">
                                 Weight
                              </Label>
                              <p className="text-lg font-medium">
                                 {healthMetricsData.weight}
                              </p>
                           </div>
                           <div>
                              <Label className="text-sm text-muted-foreground">
                                 BMI
                              </Label>
                              <p className="text-lg font-medium">
                                 {healthMetricsData.bmi}
                              </p>
                           </div>
                           <div>
                              <Label className="text-sm text-muted-foreground">
                                 Blood Type
                              </Label>
                              <p className="text-lg font-medium">
                                 {healthMetricsData.bloodType}
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Medical Information</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div>
                           <Label className="text-sm text-muted-foreground">
                              Allergies
                           </Label>
                           <p className="text-sm">
                              {profileData.allergies || "None reported"}
                           </p>
                        </div>
                        <div>
                           <Label className="text-sm text-muted-foreground">
                              Medications
                           </Label>
                           <p className="text-sm">
                              {profileData.medications || "None"}
                           </p>
                        </div>
                        <div>
                           <Label className="text-sm text-muted-foreground">
                              Medical Conditions
                           </Label>
                           <p className="text-sm">
                              {profileData.medicalConditions || "None reported"}
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle>Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="emergencyName">
                              Emergency Contact Name
                           </Label>
                           <Input
                              id="emergencyName"
                              value={profileData.emergencyContact.name}
                              // onChange={}
                              disabled={!isEditing}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="emergencyPhone">
                              Emergency Contact Phone
                           </Label>
                           <Input
                              id="emergencyPhone"
                              value={profileData.emergencyContact.phone}
                              // onChange={}
                              disabled={!isEditing}
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Communication Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label>Preferred Communication Method</Label>
                        <div className="flex items-center space-x-4">
                           <label className="flex items-center space-x-2">
                              <input
                                 type="radio"
                                 name="communication"
                                 value="email"
                                 checked={
                                    profileData.preferences.communication ===
                                    "email"
                                 }
                                 disabled={!isEditing}
                              />
                              <span>Email</span>
                           </label>
                           <label className="flex items-center space-x-2">
                              <input
                                 type="radio"
                                 name="communication"
                                 value="phone"
                                 checked={
                                    profileData.preferences.communication ===
                                    "phone"
                                 }
                                 disabled={!isEditing}
                              />
                              <span>Phone</span>
                           </label>
                           <label className="flex items-center space-x-2">
                              <input
                                 type="radio"
                                 name="communication"
                                 value="text"
                                 checked={
                                    profileData.preferences.communication ===
                                    "text"
                                 }
                                 disabled={!isEditing}
                              />
                              <span>Text Message</span>
                           </label>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label>Appointment Reminders</Label>
                        <div className="flex items-center space-x-2">
                           <input
                              type="checkbox"
                              id="appointmentReminders"
                              checked={
                                 profileData.preferences.appointmentReminders
                              }
                              disabled={!isEditing}
                           />
                           <Label htmlFor="appointmentReminders">
                              Receive appointment reminders
                           </Label>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label>Progress Updates</Label>
                        <div className="flex items-center space-x-2">
                           <input
                              type="checkbox"
                              id="progressUpdates"
                              checked={profileData.preferences.progressUpdates}
                              disabled={!isEditing}
                           />
                           <Label htmlFor="progressUpdates">
                              Receive weekly progress updates
                           </Label>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                           Current Password
                        </Label>
                        <Input
                           id="currentPassword"
                           type="password"
                           placeholder="Enter current password"
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                           id="newPassword"
                           type="password"
                           placeholder="Enter new password"
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                           Confirm New Password
                        </Label>
                        <Input
                           id="confirmPassword"
                           type="password"
                           placeholder="Confirm new password"
                        />
                     </div>
                     <Button>Update Password</Button>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">
                              Two-Factor Authentication
                           </p>
                           <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                           </p>
                        </div>
                        <Button variant="outline">Enable</Button>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}
