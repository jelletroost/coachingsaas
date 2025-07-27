/* eslint-disable no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { filterOptions } from "./mockData";

interface Filters {
   status: string;
   questionnaireType: string;
   priority: string;
   dateRange: string;
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
      onFiltersChange({ ...filters, [key]: value });
   };

   const clearFilters = () => {
      onFiltersChange({
         status: "all",
         questionnaireType: "all",
         priority: "all",
         dateRange: "all",
         searchTerm: "",
      });
   };

   const hasActiveFilters = Object.values(filters).some(
      (value) => value !== "all" && value !== ""
   );

   return (
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
         {/* Search */}
         <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
               placeholder="Search patients, emails, or IDs..."
               value={filters.searchTerm}
               onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
               }
               className="pl-10 w-64"
            />
         </div>

         {/* Status Filter */}
         <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-40">
               <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
               {filterOptions.status.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                     {option.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {/* Questionnaire Type Filter */}
         <Select
            value={filters.questionnaireType}
            onValueChange={(value) =>
               handleFilterChange("questionnaireType", value)
            }>
            <SelectTrigger className="w-40">
               <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
               {filterOptions.questionnaireType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                     {option.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {/* Priority Filter */}
         <Select
            value={filters.priority}
            onValueChange={(value) => handleFilterChange("priority", value)}>
            <SelectTrigger className="w-40">
               <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
               {filterOptions.priority.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                     {option.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {/* Date Range Filter */}
         <Select
            value={filters.dateRange}
            onValueChange={(value) => handleFilterChange("dateRange", value)}>
            <SelectTrigger className="w-40">
               <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
               {filterOptions.dateRange.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                     {option.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {/* Clear Filters */}
         {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
               <X className="h-4 w-4 mr-2" />
               Clear Filters
            </Button>
         )}
      </div>
   );
}
