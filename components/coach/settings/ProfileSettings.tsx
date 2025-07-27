"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import {
   type CoachProfileSettings,
   specializationOptions,
   timezoneOptions,
} from "./mockData";

interface ProfileSettingsProps {
   settings: CoachProfileSettings;
   onSettingsChange: (settings: CoachProfileSettings) => void;
}

export function ProfileSettings({
   settings,
   onSettingsChange,
}: ProfileSettingsProps) {
   const [newSpecialization, setNewSpecialization] = useState("");
   const [newCertification, setNewCertification] = useState("");

   const handleChange = (field: keyof CoachProfileSettings, value: any) => {
      onSettingsChange({
         ...settings,
         [field]: value,
      });
   };

   const handleSpecializationChange = (specialization: string) => {
      if (!settings.specialization.includes(specialization)) {
         handleChange("specialization", [
            ...settings.specialization,
            specialization,
         ]);
      }
      setNewSpecialization("");
   };

   const removeSpecialization = (specialization: string) => {
      handleChange(
         "specialization",
         settings.specialization.filter((s) => s !== specialization)
      );
   };

   const handleCertificationChange = () => {
      if (
         newCertification.trim() &&
         !settings.certifications.includes(newCertification.trim())
      ) {
         handleChange("certifications", [
            ...settings.certifications,
            newCertification.trim(),
         ]);
         setNewCertification("");
      }
   };

   const removeCertification = (certification: string) => {
      handleChange(
         "certifications",
         settings.certifications.filter((c) => c !== certification)
      );
   };

   const handleAvailabilityChange = (
      day: string,
      field: string,
      value: any
   ) => {
      handleChange("availability", {
         ...settings.availability,
         [day]: {
            ...settings.availability[day as keyof typeof settings.availability],
            [field]: value,
         },
      });
   };

   return (
      <div className="space-y-6">
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
                        value={settings.firstName}
                        onChange={(e) =>
                           handleChange("firstName", e.target.value)
                        }
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="lastName">Last Name</Label>
                     <Input
                        id="lastName"
                        value={settings.lastName}
                        onChange={(e) =>
                           handleChange("lastName", e.target.value)
                        }
                     />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="phone">Phone</Label>
                     <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                     id="bio"
                     value={settings.bio}
                     onChange={(e) => handleChange("bio", e.target.value)}
                     rows={4}
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="yearsOfExperience">
                        Years of Experience
                     </Label>
                     <Input
                        id="yearsOfExperience"
                        type="number"
                        value={settings.yearsOfExperience}
                        onChange={(e) =>
                           handleChange(
                              "yearsOfExperience",
                              parseInt(e.target.value)
                           )
                        }
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="timezone">Timezone</Label>
                     <Select
                        value={settings.timezone}
                        onValueChange={(value) =>
                           handleChange("timezone", value)
                        }>
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {timezoneOptions.map((option) => (
                              <SelectItem
                                 key={option.value}
                                 value={option.value}>
                                 {option.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex flex-wrap gap-2">
                  {settings.specialization.map((spec) => (
                     <Badge
                        key={spec}
                        variant="secondary"
                        className="flex items-center gap-1">
                        {spec}
                        <X
                           className="h-3 w-3 cursor-pointer"
                           onClick={() => removeSpecialization(spec)}
                        />
                     </Badge>
                  ))}
               </div>
               <div className="flex gap-2">
                  <Select
                     value={newSpecialization}
                     onValueChange={handleSpecializationChange}>
                     <SelectTrigger className="w-full">
                        <SelectValue placeholder="Add specialization" />
                     </SelectTrigger>
                     <SelectContent>
                        {specializationOptions
                           .filter(
                              (option) =>
                                 !settings.specialization.includes(option)
                           )
                           .map((option) => (
                              <SelectItem key={option} value={option}>
                                 {option}
                              </SelectItem>
                           ))}
                     </SelectContent>
                  </Select>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex flex-wrap gap-2">
                  {settings.certifications.map((cert) => (
                     <Badge
                        key={cert}
                        variant="secondary"
                        className="flex items-center gap-1">
                        {cert}
                        <X
                           className="h-3 w-3 cursor-pointer"
                           onClick={() => removeCertification(cert)}
                        />
                     </Badge>
                  ))}
               </div>
               <div className="flex gap-2">
                  <Input
                     placeholder="Add certification"
                     value={newCertification}
                     onChange={(e) => setNewCertification(e.target.value)}
                     onKeyPress={(e) =>
                        e.key === "Enter" && handleCertificationChange()
                     }
                  />
                  <Button onClick={handleCertificationChange} size="sm">
                     <Plus className="h-4 w-4" />
                  </Button>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Availability Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {Object.entries(settings.availability).map(([day, schedule]) => (
                  <div
                     key={day}
                     className="flex items-center gap-4 p-3 border rounded-lg">
                     <div className="w-24 font-medium capitalize">{day}</div>
                     <Switch
                        checked={schedule.available}
                        onCheckedChange={(checked) =>
                           handleAvailabilityChange(day, "available", checked)
                        }
                     />
                     {schedule.available && (
                        <div className="flex items-center gap-2">
                           <Input
                              type="time"
                              value={schedule.start}
                              onChange={(e) =>
                                 handleAvailabilityChange(
                                    day,
                                    "start",
                                    e.target.value
                                 )
                              }
                              className="w-24"
                           />
                           <span>to</span>
                           <Input
                              type="time"
                              value={schedule.end}
                              onChange={(e) =>
                                 handleAvailabilityChange(
                                    day,
                                    "end",
                                    e.target.value
                                 )
                              }
                              className="w-24"
                           />
                        </div>
                     )}
                  </div>
               ))}
            </CardContent>
         </Card>
      </div>
   );
}
