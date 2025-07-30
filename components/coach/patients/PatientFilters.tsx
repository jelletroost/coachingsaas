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
   searchTerm: string;
}

interface PatientFiltersProps {
   filters: Filters;
   onFiltersChange: (filters: Filters) => void;
}

export function PatientFilters({
   filters,
   onFiltersChange,
}: PatientFiltersProps) {
   const handleFilterChange = (key: keyof Filters, value: string) => {
      onFiltersChange({
         ...filters,
         [key]: value,
      });
   };

   const clearFilters = () => {
      onFiltersChange({
         status: "all",
         searchTerm: "",
      });
   };

   const hasActiveFilters =
      filters.status !== "all" ||
      filters.searchTerm !== "";

   return (
      <Card>
         <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
               {/* Search */}
               <div className="flex-1">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                     <Input
                        placeholder="Search patients by name or email..."
                        value={filters.searchTerm}
                        onChange={(e) =>
                           handleFilterChange("searchTerm", e.target.value)
                        }
                        className="pl-10"
                     />
                  </div>
               </div>

               {/* Status Filter */}
               <div className="w-full sm:w-48">
                  <Select
                     value={filters.status}
                     onValueChange={(value) =>
                        handleFilterChange("status", value)
                     }>
                     <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Patients</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {/* Clear Filters */}
               {hasActiveFilters && (
                  <Button
                     variant="outline"
                     onClick={clearFilters}
                     className="w-full sm:w-auto">
                     <X className="h-4 w-4 mr-2" />
                     Clear Filters
                  </Button>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
