"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { IntakeDetailsModal } from "./IntakeDetailsModal";
import { IntakeFilters } from "./IntakeFilters";
import { IntakeTable } from "./IntakeTable";
import { intakeFormsData, intakeStats, type IntakeForm } from "./mockData";

export function IntakeManagement() {
   const [intakes, setIntakes] = useState<IntakeForm[]>(intakeFormsData);
   const [selectedIntake, setSelectedIntake] = useState<IntakeForm | null>(
      null
   );
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
   const [filters, setFilters] = useState({
      status: "all",
      priority: "all",
      questionnaireType: "all",
      searchTerm: "",
   });

   const handleViewDetails = (intake: IntakeForm) => {
      setSelectedIntake(intake);
      setIsDetailsModalOpen(true);
   };

   const handleApproveIntake = (intake: IntakeForm) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id ? { ...i, status: "approved" as const } : i
         )
      );
   };

   const handleRejectIntake = (intake: IntakeForm) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id ? { ...i, status: "rejected" as const } : i
         )
      );
   };

   const handleRequireFollowup = (intake: IntakeForm) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id
               ? { ...i, status: "requires_followup" as const }
               : i
         )
      );
   };

   const filteredIntakes = intakes.filter((intake) => {
      const matchesStatus =
         filters.status === "all" || intake.status === filters.status;
      const matchesPriority =
         filters.priority === "all" || intake.priority === filters.priority;
      const matchesType =
         filters.questionnaireType === "all" ||
         intake.questionnaireType === filters.questionnaireType;
      const matchesSearch =
         intake.patientName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
         intake.patientEmail
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
         intake.id.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesStatus && matchesPriority && matchesType && matchesSearch;
   });

   return (
      <div className="space-y-6">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Intakes
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{intakeStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     {intakeStats.thisWeek} submitted this week
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Pending Review
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {intakeStats.pending}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Awaiting review
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Approved
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {intakeStats.approved}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Ready for consultation
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Urgent Cases
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{intakeStats.urgent}</div>
                  <p className="text-xs text-muted-foreground">
                     Require immediate attention
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Filters and Search */}
         <IntakeFilters filters={filters} onFiltersChange={setFilters} />

         {/* Intake Table */}
         <IntakeTable
            intakes={filteredIntakes}
            onViewDetails={handleViewDetails}
            onApprove={handleApproveIntake}
            onReject={handleRejectIntake}
            onRequireFollowup={handleRequireFollowup}
         />

         {/* Intake Details Modal */}
         {selectedIntake && (
            <IntakeDetailsModal
               intake={selectedIntake}
               isOpen={isDetailsModalOpen}
               onClose={() => setIsDetailsModalOpen(false)}
               onApprove={() => {
                  handleApproveIntake(selectedIntake);
                  setIsDetailsModalOpen(false);
               }}
               onReject={() => {
                  handleRejectIntake(selectedIntake);
                  setIsDetailsModalOpen(false);
               }}
               onRequireFollowup={() => {
                  handleRequireFollowup(selectedIntake);
                  setIsDetailsModalOpen(false);
               }}
            />
         )}
      </div>
   );
}
