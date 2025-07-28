"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   CheckCircle,
   Edit,
   Eye,
   MoreHorizontal,
   Package,
   Plus,
   Search,
   TrendingUp,
   XCircle,
} from "lucide-react";
import { useState } from "react";
import { Product } from "./mockData";

interface ProductTableProps {
   products: Product[];
   onViewDetails: (product: Product) => void;
   onEditProduct: (product: Product) => void;
   onAddProduct: () => void;
   onUpdateStatus: (product: Product, status: Product["status"]) => void;
   onExportProducts: () => void;
}

// Status
const getStatusIcon = (status: Product["status"]) => {
   switch (status) {
      case "active":
         return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
         return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
         return <Package className="h-4 w-4 text-gray-500" />;
   }
};

// Status Badge Variant
const getStatusBadgeVariant = (status: Product["status"]) => {
   switch (status) {
      case "active":
         return "default";
      case "inactive":
         return "secondary";
      default:
         return "secondary";
   }
};

// Category Badge Variant
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

// Stock Status Badge Variant
const getStockStatusBadgeVariant = (
   inStock: number,
   lowStockThreshold: number
) => {
   if (inStock === 0) return "destructive";
   if (inStock <= lowStockThreshold) return "secondary";
   return "default";
};

// Stock Status Text
const getStockStatusText = (inStock: number, lowStockThreshold: number) => {
   if (inStock === 0) return "Out of Stock";
   if (inStock <= lowStockThreshold) return "Low Stock";
   return "In Stock";
};

// Product Table
export function ProductTable({
   products,
   onViewDetails,
   onEditProduct,
   onAddProduct,
   onUpdateStatus,
   onExportProducts,
}: ProductTableProps) {
   // Search Term
   const [searchTerm, setSearchTerm] = useState("");
   const [categoryFilter, setCategoryFilter] = useState<string>("all");
   const [statusFilter, setStatusFilter] = useState<string>("all");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);

   // Filtered Products
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

   // Total Pages
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
               <CardTitle>Products ({filteredProducts.length})</CardTitle>
               <div className="flex items-center space-x-2">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={onExportProducts}>
                     <TrendingUp className="h-4 w-4 mr-2" />
                     Export
                  </Button>
                  <Button size="sm" onClick={onAddProduct}>
                     <Plus className="h-4 w-4 mr-2" />
                     Add Product
                  </Button>
               </div>
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
                     <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Types</SelectItem>
                     <SelectItem value="medication">Medication</SelectItem>
                     <SelectItem value="supplement">Supplement</SelectItem>
                     <SelectItem value="consultation">Consultation</SelectItem>
                     <SelectItem value="program">Program</SelectItem>
                     <SelectItem value="equipment">Equipment</SelectItem>
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
                           Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Price
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                           Stock
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
                           </td>
                           <td className="px-4 py-3">
                              <div className="font-medium">
                                 {product.inventory.inStock}
                              </div>
                              <Badge
                                 variant={getStockStatusBadgeVariant(
                                    product.inventory.inStock,
                                    product.inventory.lowStockThreshold
                                 )}
                                 className="text-xs">
                                 {getStockStatusText(
                                    product.inventory.inStock,
                                    product.inventory.lowStockThreshold
                                 )}
                              </Badge>
                           </td>
                           <td className="px-4 py-3">
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                       <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                       onClick={() => onViewDetails(product)}>
                                       <Eye className="mr-2 h-4 w-4" />
                                       View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       onClick={() => onEditProduct(product)}>
                                       <Edit className="mr-2 h-4 w-4" />
                                       Edit Product
                                    </DropdownMenuItem>
                                    {product.status === "active" && (
                                       <DropdownMenuItem
                                          onClick={() =>
                                             onUpdateStatus(product, "inactive")
                                          }>
                                          <XCircle className="mr-2 h-4 w-4" />
                                          Deactivate
                                       </DropdownMenuItem>
                                    )}
                                    {product.status === "inactive" && (
                                       <DropdownMenuItem
                                          onClick={() =>
                                             onUpdateStatus(product, "active")
                                          }>
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Activate
                                       </DropdownMenuItem>
                                    )}
                                 </DropdownMenuContent>
                              </DropdownMenu>
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
