"use client";

import { Button } from "@/components/ui/button";
import {
   ChevronLeft,
   ChevronRight,
   ChevronsLeft,
   ChevronsRight,
} from "lucide-react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
   totalItems: number;
   itemsPerPage: number;
   showItemsPerPage?: boolean;
   itemsPerPageOptions?: number[];
   onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export function Pagination({
   currentPage,
   totalPages,
   onPageChange,
   totalItems,
   itemsPerPage,
   showItemsPerPage = false,
   itemsPerPageOptions = [10, 20, 50, 100],
   onItemsPerPageChange,
}: PaginationProps) {
   const startItem = (currentPage - 1) * itemsPerPage + 1;
   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

   const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
         let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++
      ) {
         range.push(i);
      }

      if (currentPage - delta > 2) {
         rangeWithDots.push(1, "...");
      } else {
         rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
         rangeWithDots.push("...", totalPages);
      } else {
         rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
   };

   if (totalPages <= 1) {
      return null;
   }

   return (
      <div className="flex items-center justify-between px-2 py-4">
         <div className="flex items-center space-x-6">
            <div className="text-sm text-muted-foreground">
               Showing {startItem} to {endItem} of {totalItems} results
            </div>
            {showItemsPerPage && onItemsPerPageChange && (
               <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                     Items per page:
                  </span>
                  <select
                     value={itemsPerPage}
                     onChange={(e) =>
                        onItemsPerPageChange(Number(e.target.value))
                     }
                     className="border border-input bg-background px-2 py-1 text-sm rounded-md">
                     {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                           {option}
                        </option>
                     ))}
                  </select>
               </div>
            )}
         </div>

         <div className="flex items-center space-x-2">
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(1)}
               disabled={currentPage === 1}>
               <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(currentPage - 1)}
               disabled={currentPage === 1}>
               <ChevronLeft className="h-4 w-4" />
            </Button>

            {getVisiblePages().map((page, index) => (
               <div key={index}>
                  {page === "..." ? (
                     <span className="px-2 py-1 text-sm text-muted-foreground">
                        ...
                     </span>
                  ) : (
                     <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page as number)}
                        className="w-8 h-8 p-0">
                        {page}
                     </Button>
                  )}
               </div>
            ))}

            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(currentPage + 1)}
               disabled={currentPage === totalPages}>
               <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => onPageChange(totalPages)}
               disabled={currentPage === totalPages}>
               <ChevronsRight className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
}
