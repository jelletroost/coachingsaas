import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface Filters {
   status: string;
   priority: string;
   questionnaireType: string;
   searchTerm: string;
}

interface IntakeFiltersProps {
   filters: Filters;
   onFiltersChange: (filters: Filters) => void;
}

export function IntakeFilters({
   filters,
   onFiltersChange,
}: IntakeFiltersProps) {
   const handleFilterChange = (key: keyof Filters, value: string) => {
      onFiltersChange({
         ...filters,
         [key]: value,
      });
   };

   const clearFilters = () => {
      onFiltersChange({
         status: "all",
         priority: "all",
         questionnaireType: "all",
         searchTerm: "",
      });
   };

   const hasActiveFilters =
      filters.status !== "all" ||
      filters.priority !== "all" ||
      filters.questionnaireType !== "all" ||
      filters.searchTerm !== "";

   return (
      <Card>
         <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
               {/* Search */}
               <div className="flex-1">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                     <Input
                        placeholder="Search by patient name, email, or intake ID..."
                        value={filters.searchTerm}
                        onChange={(e) =>
                           handleFilterChange("searchTerm", e.target.value)
                        }
                        className="pl-10"
                     />
                  </div>
               </div>

               {/* Status Filter */}
               <div className="w-full lg:w-48">
                  <Select
                     value={filters.status}
                     onValueChange={(value) =>
                        handleFilterChange("status", value)
                     }>
                     <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="requires_followup">
                           Requires Follow-up
                        </SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {/* Priority Filter */}
               <div className="w-full lg:w-48">
                  <Select
                     value={filters.priority}
                     onValueChange={(value) =>
                        handleFilterChange("priority", value)
                     }>
                     <SelectTrigger>
                        <SelectValue placeholder="Filter by priority" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {/* Questionnaire Type Filter */}
               <div className="w-full lg:w-48">
                  <Select
                     value={filters.questionnaireType}
                     onValueChange={(value) =>
                        handleFilterChange("questionnaireType", value)
                     }>
                     <SelectTrigger>
                        <SelectValue placeholder="Filter by type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="initial">Initial Intake</SelectItem>
                        <SelectItem value="follow_up">Follow-up</SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {/* Clear Filters */}
               {hasActiveFilters && (
                  <Button
                     variant="outline"
                     onClick={clearFilters}
                     className="w-full lg:w-auto">
                     <X className="h-4 w-4 mr-2" />
                     Clear Filters
                  </Button>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
