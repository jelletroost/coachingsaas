"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Download, FileText, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IntakeDetailsModal } from "./IntakeDetailsModal";
import { IntakeFilters } from "./IntakeFilters";
import { IntakeTable } from "./IntakeTable";
import {
   coaches,
   intakeStats,
   mockIntakes,
   type IntakeRecord,
} from "./mockData";

export function IntakeManagement() {
   const [intakes, setIntakes] = useState<IntakeRecord[]>(mockIntakes);
   const [selectedIntake, setSelectedIntake] = useState<IntakeRecord | null>(
      null
   );
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
   const [filters, setFilters] = useState({
      status: "all",
      questionnaireType: "all",
      priority: "all",
      dateRange: "all",
      searchTerm: "",
   });

   const handleViewDetails = (intake: IntakeRecord) => {
      setSelectedIntake(intake);
      setIsDetailsModalOpen(true);
   };

   const handleApproveIntake = (intake: IntakeRecord) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id ? { ...i, status: "approved" as const } : i
         )
      );
      toast.success(`Intake ${intake.id} has been approved`);
   };

   const handleRejectIntake = (intake: IntakeRecord) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id ? { ...i, status: "rejected" as const } : i
         )
      );
      toast.success(`Intake ${intake.id} has been rejected`);
   };

   const handleAssignCoach = (intake: IntakeRecord, coach: string) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id ? { ...i, assignedCoach: coach } : i
         )
      );
      toast.success(`Coach ${coach} assigned to intake ${intake.id}`);
   };

   const handleUpdateIntake = (
      intake: IntakeRecord,
      updates: Partial<IntakeRecord>
   ) => {
      setIntakes((prev) =>
         prev.map((i) =>
            i.id === intake.id
               ? { ...i, ...updates, lastUpdated: new Date().toISOString() }
               : i
         )
      );
      toast.success(`Intake ${intake.id} has been updated`);
   };

   const handleExportData = () => {
      toast.success("Export functionality coming soon!");
   };

   const filteredIntakes = intakes.filter((intake) => {
      const matchesSearch =
         intake.patientName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
         intake.patientEmail
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
         intake.id.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesStatus =
         filters.status === "all" || intake.status === filters.status;
      const matchesType =
         filters.questionnaireType === "all" ||
         intake.questionnaireType === filters.questionnaireType;
      const matchesPriority =
         filters.priority === "all" || intake.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesType && matchesPriority;
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
                     All submitted questionnaires
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
                     Awaiting approval
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
                     Successfully processed
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     This Week
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {intakeStats.thisWeek}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     New submissions
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Filters and Actions */}
         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <IntakeFilters filters={filters} onFiltersChange={setFilters} />

            <div className="flex gap-2">
               <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
               </Button>
            </div>
         </div>

         {/* Intake Table */}
         <IntakeTable
            intakes={filteredIntakes}
            onViewDetails={handleViewDetails}
            onApproveIntake={handleApproveIntake}
            onRejectIntake={handleRejectIntake}
            onAssignCoach={handleAssignCoach}
            coaches={coaches}
         />

         {/* Details Modal */}
         {selectedIntake && (
            <IntakeDetailsModal
               intake={selectedIntake}
               isOpen={isDetailsModalOpen}
               onClose={() => setIsDetailsModalOpen(false)}
               onUpdate={handleUpdateIntake}
               coaches={coaches}
            />
         )}
      </div>
   );
}
