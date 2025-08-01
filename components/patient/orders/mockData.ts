import { Package, ShoppingCart, Truck, User } from "lucide-react";

// Order Statistics Data
export const orderStatsData = [
   {
      title: "Total Orders",
      value: "12",
      icon: ShoppingCart,
      description: "All time",
   },
   {
      title: "Processing",
      value: "2",
      icon: Package,
      description: "Currently processing",
   },
   {
      title: "Shipped",
      value: "1",
      icon: Truck,
      description: "In transit",
   },
   {
      title: "Delivered",
      value: "9",
      icon: User,
      description: "Successfully delivered",
   },
];

// Orders Data
export const ordersData = [
   {
      id: "1",
      orderNumber: "ORD-2024-001",
      orderDate: "2024-01-15",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 149.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567890",
      estimatedDelivery: "2024-01-20",
      deliveredDate: "2024-01-19",
      items: [
         {
            name: "Premium Health Supplements Pack",
            quantity: 1,
            price: 89.99,
         },
         {
            name: "Fitness Tracker",
            quantity: 1,
            price: 59.99,
         },
      ],
   },
   {
      id: "2",
      orderNumber: "ORD-2024-002",
      orderDate: "2024-01-10",
      status: "shipped" as "processing" | "shipped" | "delivered" | "cancelled",
      total: 79.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "2024-01-18",
      items: [
         {
            name: "Nutrition Guide Book",
            quantity: 1,
            price: 29.99,
         },
         {
            name: "Meal Prep Containers Set",
            quantity: 1,
            price: 49.99,
         },
      ],
   },
   {
      id: "3",
      orderNumber: "ORD-2024-003",
      orderDate: "2024-01-08",
      status: "processing" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 199.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      items: [
         {
            name: "Smart Scale",
            quantity: 1,
            price: 149.99,
         },
         {
            name: "Resistance Bands Set",
            quantity: 1,
            price: 49.99,
         },
      ],
   },
   {
      id: "4",
      orderNumber: "ORD-2024-004",
      orderDate: "2024-01-05",
      status: "processing" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 39.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      items: [
         {
            name: "Water Bottle with Timer",
            quantity: 1,
            price: 39.99,
         },
      ],
   },
   {
      id: "5",
      orderNumber: "ORD-2023-012",
      orderDate: "2023-12-20",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 129.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567892",
      deliveredDate: "2023-12-23",
      items: [
         {
            name: "Yoga Mat Premium",
            quantity: 1,
            price: 79.99,
         },
         {
            name: "Meditation Cushion",
            quantity: 1,
            price: 49.99,
         },
      ],
   },
   {
      id: "6",
      orderNumber: "ORD-2023-011",
      orderDate: "2023-12-15",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 89.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567893",
      deliveredDate: "2023-12-18",
      items: [
         {
            name: "Protein Powder - Vanilla",
            quantity: 1,
            price: 59.99,
         },
         {
            name: "Shaker Bottle",
            quantity: 1,
            price: 29.99,
         },
      ],
   },
   {
      id: "7",
      orderNumber: "ORD-2023-010",
      orderDate: "2023-12-10",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 159.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567894",
      deliveredDate: "2023-12-13",
      items: [
         {
            name: "Wireless Earbuds for Workouts",
            quantity: 1,
            price: 159.99,
         },
      ],
   },
   {
      id: "8",
      orderNumber: "ORD-2023-009",
      orderDate: "2023-12-05",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 69.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567895",
      deliveredDate: "2023-12-08",
      items: [
         {
            name: "Foam Roller Set",
            quantity: 1,
            price: 39.99,
         },
         {
            name: "Massage Ball Set",
            quantity: 1,
            price: 29.99,
         },
      ],
   },
   {
      id: "9",
      orderNumber: "ORD-2023-008",
      orderDate: "2023-11-30",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 119.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567896",
      deliveredDate: "2023-12-03",
      items: [
         {
            name: "Digital Food Scale",
            quantity: 1,
            price: 49.99,
         },
         {
            name: "Meal Prep Cookbook",
            quantity: 1,
            price: 69.99,
         },
      ],
   },
   {
      id: "10",
      orderNumber: "ORD-2023-007",
      orderDate: "2023-11-25",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 99.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567897",
      deliveredDate: "2023-11-28",
      items: [
         {
            name: "Jump Rope Professional",
            quantity: 1,
            price: 39.99,
         },
         {
            name: "Workout Gloves",
            quantity: 1,
            price: 29.99,
         },
         {
            name: "Gym Towel Set",
            quantity: 1,
            price: 29.99,
         },
      ],
   },
   {
      id: "11",
      orderNumber: "ORD-2023-006",
      orderDate: "2023-11-20",
      status: "delivered" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 179.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "1Z999AA1234567898",
      deliveredDate: "2023-11-23",
      items: [
         {
            name: "Bluetooth Heart Rate Monitor",
            quantity: 1,
            price: 179.99,
         },
      ],
   },
   {
      id: "12",
      orderNumber: "ORD-2023-005",
      orderDate: "2023-11-15",
      status: "cancelled" as
         | "processing"
         | "shipped"
         | "delivered"
         | "cancelled",
      total: 89.99,
      shippingAddress: "123 Main St, New York, NY 10001",
      items: [
         {
            name: "Vitamins and Minerals Pack",
            quantity: 1,
            price: 89.99,
         },
      ],
   },
];
