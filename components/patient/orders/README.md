# Patient Order Management Components

This directory contains components for managing patient orders, tracking shipments, and viewing order history in the health coaching platform.

## Components

### Core Components

-  **OrderManagement** - Main order management interface
-  **mockData** - Order history and statistics data

## Usage

```tsx
import { OrderManagement } from "@/components/patient/orders/OrderManagement";

export default function PatientOrdersPage() {
   return (
      <div className="p-6">
         <OrderManagement />
      </div>
   );
}
```

## Features

### Order Overview

-  **Order Statistics** - Total orders, processing, shipped, delivered counts
-  **Search Functionality** - Search orders by order number or item name
-  **Filter Options** - Filter by order status (all, processing, shipped, delivered, cancelled)
-  **Export Capability** - Export order history for record keeping

### Order Details

-  **Order Information** - Order number, date, status, total amount
-  **Item Details** - Product names, quantities, individual and total prices
-  **Shipping Information** - Shipping address, tracking numbers, delivery dates
-  **Status Tracking** - Real-time order status updates

### Order Management

-  **Order History** - Complete order history with detailed information
-  **Status Tracking** - Track orders from processing to delivery
-  **Invoice Downloads** - Download invoices for all orders
-  **Tracking Integration** - Track packages with shipping carriers

## Data Structure

### Order Statistics

```typescript
interface OrderStats {
   title: string;
   value: string;
   icon: React.ComponentType;
   description: string;
}
```

### Order Data

```typescript
interface Order {
   id: string;
   orderNumber: string;
   orderDate: string;
   status: "processing" | "shipped" | "delivered" | "cancelled";
   total: number;
   shippingAddress: string;
   trackingNumber?: string;
   estimatedDelivery?: string;
   deliveredDate?: string;
   items: OrderItem[];
}
```

### Order Item

```typescript
interface OrderItem {
   name: string;
   quantity: number;
   price: number;
}
```

## Order Status Types

### Processing

-  Order has been placed and is being prepared
-  Items are being picked and packed
-  Payment has been processed
-  Shipping label is being generated

### Shipped

-  Order has been shipped
-  Tracking number is available
-  Estimated delivery date is provided
-  Package is in transit

### Delivered

-  Order has been successfully delivered
-  Delivery date is recorded
-  Order is complete
-  Customer satisfaction can be tracked

### Cancelled

-  Order has been cancelled
-  Refund process may be initiated
-  Order is no longer active
-  Reason for cancellation may be provided

## Order Features

### Search and Filter

-  **Search by Order Number** - Quick order lookup
-  **Search by Item Name** - Find orders containing specific items
-  **Status Filtering** - Filter by order status
-  **Date Range Filtering** - Filter by order date range

### Order Tracking

-  **Real-time Updates** - Live order status updates
-  **Tracking Numbers** - Direct links to carrier tracking
-  **Delivery Estimates** - Expected delivery dates
-  **Delivery Confirmations** - Actual delivery dates

### Invoice Management

-  **PDF Downloads** - Download invoices in PDF format
-  **Invoice History** - Complete invoice archive
-  **Tax Information** - Tax details for each order
-  **Receipt Management** - Digital receipt storage

## Order Statistics

### Overview Metrics

-  **Total Orders** - Complete order count
-  **Processing Orders** - Currently being prepared
-  **Shipped Orders** - In transit
-  **Delivered Orders** - Successfully completed

### Analytics

-  **Order Trends** - Order frequency patterns
-  **Spending Analysis** - Total spending over time
-  **Popular Items** - Most frequently ordered items
-  **Delivery Performance** - On-time delivery rates

## Shipping Features

### Tracking Integration

-  **Multiple Carriers** - Support for various shipping carriers
-  **Real-time Tracking** - Live package location updates
-  **Delivery Notifications** - Status change alerts
-  **Estimated Delivery** - Expected delivery dates

### Shipping Information

-  **Shipping Addresses** - Multiple address support
-  **Shipping Methods** - Different shipping options
-  **Shipping Costs** - Transparent shipping pricing
-  **International Shipping** - Global shipping support

## Order Actions

### Available Actions

-  **View Details** - Detailed order information
-  **Track Package** - Direct tracking links
-  **Download Invoice** - PDF invoice downloads
-  **Reorder** - Quick reorder functionality
-  **Contact Support** - Order-related support

### Order Management

-  **Order Cancellation** - Cancel orders when possible
-  **Order Modifications** - Modify orders before shipping
-  **Return Processing** - Initiate returns for delivered orders
-  **Refund Requests** - Request refunds for issues

## Product Categories

### Health Supplements

-  Vitamins and minerals
-  Protein powders
-  Health supplements
-  Wellness products

### Fitness Equipment

-  Workout equipment
-  Fitness trackers
-  Exercise accessories
-  Training gear

### Nutrition Products

-  Meal prep containers
-  Food scales
-  Nutrition guides
-  Healthy snacks

### Wellness Products

-  Yoga mats
-  Meditation cushions
-  Stress relief products
-  Wellness books

## Integration Points

### E-commerce Platform

-  Product catalog integration
-  Inventory management
-  Pricing synchronization
-  Product availability

### Payment Processing

-  Secure payment processing
-  Multiple payment methods
-  Refund processing
-  Payment security

### Shipping Carriers

-  Real-time tracking
-  Shipping rate calculation
-  Label generation
-  Delivery confirmation

### Customer Support

-  Order-related support
-  Issue resolution
-  Return processing
-  Customer feedback

## Security Features

### Data Protection

-  Encrypted order data
-  Secure payment processing
-  PCI compliance
-  Data privacy protection

### Access Control

-  User authentication
-  Order ownership verification
-  Secure API communication
-  Audit logging

## Future Enhancements

Planned features for order management:

-  **Subscription Orders** - Recurring order management
-  **Bulk Ordering** - Multiple item orders
-  **Order Scheduling** - Future order scheduling
-  **Gift Orders** - Gift wrapping and messaging
-  **Order Sharing** - Share orders with family
-  **Advanced Analytics** - Detailed order insights
-  **Mobile App** - Native mobile order management
-  **Voice Orders** - Voice-activated ordering
-  **AR Product Preview** - Augmented reality product viewing
-  **Social Shopping** - Social media integration
