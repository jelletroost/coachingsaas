import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, User } from "lucide-react";
import { type Patient } from "./mockData";

interface PatientTableProps {
   patients: Patient[];
   onViewProfile: (patient: Patient) => void;
   onPrescribe: (patient: Patient) => void;
}

export function PatientTable({
   patients,
   onViewProfile,
   onPrescribe,
}: PatientTableProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg font-semibold">
               Patients ({patients.length})
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {patients.length === 0 ? (
                  <div className="text-center py-8">
                     <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                     <p className="text-muted-foreground">
                        No patients found matching your filters
                     </p>
                  </div>
               ) : (
                  patients.map((patient) => (
                     <div
                        key={patient.id}
                        className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        {/* Avatar and Name */}
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                           <Avatar className="w-12 h-12">
                              <AvatarFallback className="text-sm">
                                 {`${patient.user.first_name} ${patient.user.last_name}`
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-foreground truncate">
                                 {`${patient.user.first_name} ${patient.user.last_name}`}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">
                                 {patient.user.email}
                              </p>
                           </div>
                        </div>

                        {/* Join Date */}
                        <div className="hidden md:block">
                           <div className="text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                 <Calendar className="w-3 h-3" />
                                 <span>Joined {new Date(patient.created_at).toLocaleDateString()}</span>
                              </div>
                           </div>
                        </div>

                        {/* Last Active */}
                        <div className="hidden lg:block">
                           <div className="text-xs text-muted-foreground">
                              Last active: {new Date(patient.updated_at).toLocaleDateString()}
                           </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewProfile(patient)}>
                              <User className="h-4 w-4 mr-1" />
                              View
                           </Button>

                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onPrescribe(patient)}>
                              <Package className="h-4 w-4 mr-1" />
                              Prescribe
                           </Button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </CardContent>
      </Card>
   );
}
