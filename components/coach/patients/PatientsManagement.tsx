"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { PatientFilters } from "./PatientFilters";
import { PatientProfileModal } from "./PatientProfileModal";
import { PatientTable } from "./PatientTable";
import { patientStats, patientsData, type Patient } from "./mockData";

export function PatientsManagement() {
   const [patients] = useState<Patient[]>(patientsData);
   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
   const [filters, setFilters] = useState({
      status: "all",
      progress: "all",
      searchTerm: "",
   });

   const handleViewProfile = (patient: Patient) => {
      setSelectedPatient(patient);
      setIsProfileModalOpen(true);
   };

   const handleSendMessage = (patient: Patient) => {
      // TODO: Implement message functionality
      console.log("Send message to:", patient.name);
   };

   const handleScheduleAppointment = (patient: Patient) => {
      // TODO: Implement appointment scheduling
      console.log("Schedule appointment for:", patient.name);
   };

   const filteredPatients = patients.filter((patient) => {
      const matchesStatus =
         filters.status === "all" || patient.status === filters.status;
      const matchesProgress =
         filters.progress === "all" ||
         (filters.progress === "high" && patient.progress >= 80) ||
         (filters.progress === "medium" &&
            patient.progress >= 50 &&
            patient.progress < 80) ||
         (filters.progress === "low" && patient.progress < 50);
      const matchesSearch =
         patient.name
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
         patient.email.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesStatus && matchesProgress && matchesSearch;
   });

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
                  <div className="text-2xl font-bold">{patientStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     {patientStats.active} active, {patientStats.inactive}{" "}
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
                     {patientStats.averageProgress}%
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
                     {patientStats.totalSessions}
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
                     {patientStats.unreadMessages}
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
            onSendMessage={handleSendMessage}
            onScheduleAppointment={handleScheduleAppointment}
         />

         {/* Patient Profile Modal */}
         {selectedPatient && (
            <PatientProfileModal
               patient={selectedPatient}
               isOpen={isProfileModalOpen}
               onClose={() => setIsProfileModalOpen(false)}
            />
         )}
      </div>
   );
}
