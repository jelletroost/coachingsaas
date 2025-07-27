"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Eye, Package, Search, Star, XCircle } from "lucide-react";
import { useState } from "react";
import { Product, productCategories } from "./mockData";

interface CoachProductTableProps {
   products: Product[];
   onViewDetails: (product: Product) => void;
}

const getStatusIcon = (status: Product["status"]) => {
   switch (status) {
      case "active":
         return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
         return <XCircle className="h-4 w-4 text-gray-500" />;
      case "draft":
         return <Package className="h-4 w-4 text-yellow-500" />;
      case "discontinued":
         return <XCircle className="h-4 w-4 text-red-500" />;
      default:
         return <Package className="h-4 w-4 text-gray-500" />;
   }
};

const getStatusBadgeVariant = (status: Product["status"]) => {
   switch (status) {
      case "active":
         return "default";
      case "inactive":
         return "secondary";
      case "draft":
         return "outline";
      case "discontinued":
         return "destructive";
      default:
         return "secondary";
   }
};

const getCategoryBadgeVariant = (category: Product["category"]) => {
   switch (category) {
      case "medication":
         return "destructive";
      case "supplement":
         return "default";
      case "consultation":
         return "secondary";
      case "program":
         return "default";
      case "equipment":
         return "outline";
      default:
         return "secondary";
   }
};

export function CoachProductTable({
   products,
   onViewDetails,
}: CoachProductTableProps) {
   const [searchTerm, setSearchTerm] = useState("");
   const [categoryFilter, setCategoryFilter] = useState<string>("all");
   const [statusFilter, setStatusFilter] = useState<string>("all");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);

   const filteredProducts = products.filter((product) => {
      const matchesSearch =
         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
         );

      const matchesCategory =
         categoryFilter === "all" || product.category === categoryFilter;
      const matchesStatus =
         statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
   });

   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentProducts = filteredProducts.slice(startIndex, endIndex);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
   };

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle>
                  Available Products ({filteredProducts.length})
               </CardTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search products..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10"
                  />
               </div>
               <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                     <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Categories</SelectItem>
                     {productCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                           {category.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                     <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Statuses</SelectItem>
                     <SelectItem value="active">Active</SelectItem>
                     <SelectItem value="inactive">Inactive</SelectItem>
                     <SelectItem value="draft">Draft</SelectItem>
                     <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-muted/50">
                     <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Product
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Category
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Price
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Rating
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y">
                     {currentProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-muted/50">
                           <td className="px-4 py-3">
                              <div className="space-y-1">
                                 <div className="font-medium">
                                    {product.name}
                                 </div>
                                 <div className="text-sm text-muted-foreground">
                                    SKU: {product.sku}
                                 </div>
                                 <div className="text-sm text-muted-foreground line-clamp-2">
                                    {product.description}
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <Badge
                                 variant={getCategoryBadgeVariant(
                                    product.category
                                 )}>
                                 {product.category}
                              </Badge>
                              {product.subcategory && (
                                 <div className="text-xs text-muted-foreground mt-1">
                                    {product.subcategory}
                                 </div>
                              )}
                           </td>
                           <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                 {getStatusIcon(product.status)}
                                 <Badge
                                    variant={getStatusBadgeVariant(
                                       product.status
                                    )}>
                                    {product.status}
                                 </Badge>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <div className="font-medium">
                                 ${product.price.toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                 {product.currency}
                              </div>
                              {product.prescription.required && (
                                 <div className="text-xs text-orange-600">
                                    Prescription Required
                                 </div>
                              )}
                           </td>
                           <td className="px-4 py-3">
                              <div className="flex items-center space-x-1">
                                 <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                 <span className="font-medium">
                                    {product.rating}
                                 </span>
                                 <span className="text-sm text-muted-foreground">
                                    ({product.reviewCount})
                                 </span>
                              </div>
                           </td>
                           <td className="px-4 py-3">
                              <button
                                 onClick={() => onViewDetails(product)}
                                 className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                 <Eye className="h-4 w-4" />
                                 <span>View Details</span>
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {currentProducts.length === 0 && (
               <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products found</p>
               </div>
            )}

            {totalPages > 1 && (
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  showItemsPerPage={true}
                  onItemsPerPageChange={handleItemsPerPageChange}
               />
            )}
         </CardContent>
      </Card>
   );
}
