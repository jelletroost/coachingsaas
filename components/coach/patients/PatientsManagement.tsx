"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePatientsByCoach } from "@/hooks/usePatients";
import { Calendar, MessageSquare, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { PatientFilters } from "./PatientFilters";
import { PatientProfileModal } from "./PatientProfileModal";
import { PatientTable } from "./PatientTable";
import { PrescriptionData, PrescriptionModal } from "./PrescriptionModal";
import { type Patient } from "./mockData";

export function PatientsManagement() {
   const { data: patients = [], isLoading, error } = usePatientsByCoach();
   const typedPatients = patients as Patient[];
   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
   const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] =
      useState(false);
   const [filters, setFilters] = useState({
      status: "all",
      searchTerm: "",
   });

   const handleViewProfile = (patient: Patient) => {
      setSelectedPatient(patient);
      setIsProfileModalOpen(true);
   };

   const handlePrescribe = (patient: Patient) => {
      setSelectedPatient(patient);
      setIsPrescriptionModalOpen(true);
   };

   const handlePrescriptionSubmit = (prescription: PrescriptionData) => {
      console.log("Prescription submitted:", prescription);
      // prescribeByCoach(prescription);
   };

   const filteredPatients = typedPatients.filter((patient) => {
      const matchesStatus =
         filters.status === "all" || patient.account_status === filters.status;
      const matchesSearch =
         `${patient.user.first_name} ${patient.user.last_name}`
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
         patient.user.email.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
   });

   // Calculate real stats from API data
   const realStats = {
      total: typedPatients.length,
      active: typedPatients.filter((p) => p.account_status === "active").length,
      inactive: typedPatients.filter((p) => p.account_status === "inactive").length,
      pending: typedPatients.filter((p) => p.account_status === "pending").length,
      averageProgress: 75, // Placeholder since we don't have progress data
      totalSessions: 45, // Placeholder since we don't have sessions data
      unreadMessages: 12, // Placeholder since we don't have messages data
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                     </CardHeader>
                     <CardContent>
                        <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                        <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                     </CardContent>
                  </Card>
               ))}
            </div>
            <div className="text-center py-8">
               <div className="h-8 w-32 bg-muted animate-pulse rounded mx-auto mb-4" />
               <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto" />
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="text-center py-8">
            <div className="text-red-500 mb-4">Error loading patients</div>
            <p className="text-muted-foreground">
               Please try refreshing the page
            </p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Patients
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{realStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     {realStats.active} active, {realStats.inactive}{" "}
                     inactive
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Average Progress
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {realStats.averageProgress}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Across all patients
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Sessions
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {realStats.totalSessions}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Unread Messages
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {realStats.unreadMessages}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Requiring attention
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Filters and Search */}
         <PatientFilters filters={filters} onFiltersChange={setFilters} />

         {/* Patient Table */}
         <PatientTable
            patients={filteredPatients}
            onViewProfile={handleViewProfile}
            onPrescribe={handlePrescribe}
         />

         {/* Patient Profile Modal */}
         {selectedPatient && (
            <PatientProfileModal
               patient={selectedPatient}
               isOpen={isProfileModalOpen}
               onClose={() => setIsProfileModalOpen(false)}
            />
         )}

         {/* Prescription Modal */}
         <PrescriptionModal
            patient={selectedPatient}
            isOpen={isPrescriptionModalOpen}
            onClose={() => setIsPrescriptionModalOpen(false)}
            onPrescribe={handlePrescriptionSubmit}
         />
      </div>
   );
}
