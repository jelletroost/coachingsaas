export interface OrderItem {
   id: string;
   name: string;
   type: "medication" | "supplement" | "consultation" | "program";
   quantity: number;
   unitPrice: number;
   totalPrice: number;
   description?: string;
}

export interface Order {
   id: string;
   orderNumber: string;
   patientId: string;
   patientName: string;
   patientEmail: string;
   patientPhone?: string;
   coachId?: string;
   coachName?: string;
   status:
      | "pending"
      | "confirmed"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
      | "refunded";
   items: OrderItem[];
   subtotal: number;
   tax: number;
   shipping: number;
   total: number;
   currency: string;
   paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "insurance";
   paymentStatus: "pending" | "paid" | "failed" | "refunded";
   shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
   };
   billingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
   };
   notes?: string;
   createdAt: string;
   updatedAt: string;
   estimatedDelivery?: string;
   trackingNumber?: string;
   insuranceProvider?: string;
   prescriptionRequired: boolean;
   prescriptionStatus?: "pending" | "approved" | "rejected";
}

export interface OrderStats {
   total: number;
   pending: number;
   confirmed: number;
   processing: number;
   shipped: number;
   delivered: number;
   cancelled: number;
   refunded: number;
   totalRevenue: number;
   averageOrderValue: number;
   thisMonth: number;
   lastMonth: number;
}

export const orderStats: OrderStats = {
   total: 1247,
   pending: 23,
   confirmed: 45,
   processing: 67,
   shipped: 89,
   delivered: 987,
   cancelled: 12,
   refunded: 24,
   totalRevenue: 156789.5,
   averageOrderValue: 125.67,
   thisMonth: 156,
   lastMonth: 142,
};

export const mockOrders: Order[] = [
   {
      id: "1",
      orderNumber: "ORD-2024-001",
      patientId: "patient_1",
      patientName: "Sarah Johnson",
      patientEmail: "sarah.johnson@email.com",
      patientPhone: "+1 (555) 123-4567",
      coachId: "coach_1",
      coachName: "Dr. Emily Rodriguez",
      status: "delivered",
      items: [
         {
            id: "item_1",
            name: "Metformin 500mg",
            type: "medication",
            quantity: 30,
            unitPrice: 25.0,
            totalPrice: 750.0,
            description: "Diabetes medication - 30 tablets",
         },
         {
            id: "item_2",
            name: "Nutrition Consultation",
            type: "consultation",
            quantity: 1,
            unitPrice: 150.0,
            totalPrice: 150.0,
            description: "60-minute nutrition consultation",
         },
      ],
      subtotal: 900.0,
      tax: 72.0,
      shipping: 0.0,
      total: 972.0,
      currency: "USD",
      paymentMethod: "credit_card",
      paymentStatus: "paid",
      shippingAddress: {
         street: "123 Main Street",
         city: "New York",
         state: "NY",
         zipCode: "10001",
         country: "USA",
      },
      billingAddress: {
         street: "123 Main Street",
         city: "New York",
         state: "NY",
         zipCode: "10001",
         country: "USA",
      },
      notes: "Patient prefers morning delivery",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-18T14:20:00Z",
      estimatedDelivery: "2024-01-20",
      trackingNumber: "TRK123456789",
      prescriptionRequired: true,
      prescriptionStatus: "approved",
   },
   {
      id: "2",
      orderNumber: "ORD-2024-002",
      patientId: "patient_2",
      patientName: "Michael Chen",
      patientEmail: "michael.chen@email.com",
      patientPhone: "+1 (555) 234-5678",
      coachId: "coach_2",
      coachName: "Dr. James Wilson",
      status: "shipped",
      items: [
         {
            id: "item_3",
            name: "Omega-3 Supplement",
            type: "supplement",
            quantity: 60,
            unitPrice: 35.0,
            totalPrice: 2100.0,
            description: "High-quality fish oil supplement",
         },
         {
            id: "item_4",
            name: "Heart Health Program",
            type: "program",
            quantity: 1,
            unitPrice: 299.0,
            totalPrice: 299.0,
            description: "3-month heart health coaching program",
         },
      ],
      subtotal: 2399.0,
      tax: 191.92,
      shipping: 15.0,
      total: 2605.92,
      currency: "USD",
      paymentMethod: "paypal",
      paymentStatus: "paid",
      shippingAddress: {
         street: "456 Oak Avenue",
         city: "Los Angeles",
         state: "CA",
         zipCode: "90210",
         country: "USA",
      },
      billingAddress: {
         street: "456 Oak Avenue",
         city: "Los Angeles",
         state: "CA",
         zipCode: "90210",
         country: "USA",
      },
      createdAt: "2024-01-16T09:15:00Z",
      updatedAt: "2024-01-19T11:45:00Z",
      estimatedDelivery: "2024-01-22",
      trackingNumber: "TRK987654321",
      prescriptionRequired: false,
   },
   {
      id: "3",
      orderNumber: "ORD-2024-003",
      patientId: "patient_3",
      patientName: "Jennifer Davis",
      patientEmail: "jennifer.davis@email.com",
      patientPhone: "+1 (555) 345-6789",
      status: "processing",
      items: [
         {
            id: "item_5",
            name: "Lisinopril 10mg",
            type: "medication",
            quantity: 90,
            unitPrice: 18.5,
            totalPrice: 1665.0,
            description: "Blood pressure medication - 90 tablets",
         },
      ],
      subtotal: 1665.0,
      tax: 133.2,
      shipping: 0.0,
      total: 1798.2,
      currency: "USD",
      paymentMethod: "insurance",
      paymentStatus: "pending",
      insuranceProvider: "Blue Cross Blue Shield",
      shippingAddress: {
         street: "789 Pine Street",
         city: "Chicago",
         state: "IL",
         zipCode: "60601",
         country: "USA",
      },
      billingAddress: {
         street: "789 Pine Street",
         city: "Chicago",
         state: "IL",
         zipCode: "60601",
         country: "USA",
      },
      createdAt: "2024-01-17T14:20:00Z",
      updatedAt: "2024-01-19T16:30:00Z",
      prescriptionRequired: true,
      prescriptionStatus: "approved",
   },
   {
      id: "4",
      orderNumber: "ORD-2024-004",
      patientId: "patient_4",
      patientName: "Robert Thompson",
      patientEmail: "robert.thompson@email.com",
      patientPhone: "+1 (555) 456-7890",
      coachId: "coach_3",
      coachName: "Dr. Lisa Martinez",
      status: "confirmed",
      items: [
         {
            id: "item_6",
            name: "Vitamin D3 2000IU",
            type: "supplement",
            quantity: 120,
            unitPrice: 22.0,
            totalPrice: 2640.0,
            description: "Vitamin D supplement for bone health",
         },
         {
            id: "item_7",
            name: "Weight Management Consultation",
            type: "consultation",
            quantity: 1,
            unitPrice: 200.0,
            totalPrice: 200.0,
            description: "90-minute weight management consultation",
         },
      ],
      subtotal: 2840.0,
      tax: 227.2,
      shipping: 0.0,
      total: 3067.2,
      currency: "USD",
      paymentMethod: "credit_card",
      paymentStatus: "paid",
      shippingAddress: {
         street: "321 Elm Street",
         city: "Houston",
         state: "TX",
         zipCode: "77001",
         country: "USA",
      },
      billingAddress: {
         street: "321 Elm Street",
         city: "Houston",
         state: "TX",
         zipCode: "77001",
         country: "USA",
      },
      createdAt: "2024-01-18T11:45:00Z",
      updatedAt: "2024-01-19T09:30:00Z",
      prescriptionRequired: false,
   },
   {
      id: "5",
      orderNumber: "ORD-2024-005",
      patientId: "patient_5",
      patientName: "Amanda Wilson",
      patientEmail: "amanda.wilson@email.com",
      patientPhone: "+1 (555) 567-8901",
      status: "pending",
      items: [
         {
            id: "item_8",
            name: "Atorvastatin 20mg",
            type: "medication",
            quantity: 30,
            unitPrice: 28.0,
            totalPrice: 840.0,
            description: "Cholesterol medication - 30 tablets",
         },
      ],
      subtotal: 840.0,
      tax: 67.2,
      shipping: 0.0,
      total: 907.2,
      currency: "USD",
      paymentMethod: "bank_transfer",
      paymentStatus: "pending",
      shippingAddress: {
         street: "654 Maple Drive",
         city: "Phoenix",
         state: "AZ",
         zipCode: "85001",
         country: "USA",
      },
      billingAddress: {
         street: "654 Maple Drive",
         city: "Phoenix",
         state: "AZ",
         zipCode: "85001",
         country: "USA",
      },
      createdAt: "2024-01-19T08:30:00Z",
      updatedAt: "2024-01-19T08:30:00Z",
      prescriptionRequired: true,
      prescriptionStatus: "pending",
   },
   {
      id: "6",
      orderNumber: "ORD-2024-006",
      patientId: "patient_6",
      patientName: "David Brown",
      patientEmail: "david.brown@email.com",
      patientPhone: "+1 (555) 678-9012",
      coachId: "coach_1",
      coachName: "Dr. Emily Rodriguez",
      status: "cancelled",
      items: [
         {
            id: "item_9",
            name: "Diabetes Management Program",
            type: "program",
            quantity: 1,
            unitPrice: 399.0,
            totalPrice: 399.0,
            description: "6-month diabetes management program",
         },
      ],
      subtotal: 399.0,
      tax: 31.92,
      shipping: 0.0,
      total: 430.92,
      currency: "USD",
      paymentMethod: "credit_card",
      paymentStatus: "refunded",
      shippingAddress: {
         street: "987 Cedar Lane",
         city: "Miami",
         state: "FL",
         zipCode: "33101",
         country: "USA",
      },
      billingAddress: {
         street: "987 Cedar Lane",
         city: "Miami",
         state: "FL",
         zipCode: "33101",
         country: "USA",
      },
      notes: "Cancelled by patient - scheduling conflict",
      createdAt: "2024-01-15T16:45:00Z",
      updatedAt: "2024-01-16T10:20:00Z",
      prescriptionRequired: false,
   },
   {
      id: "7",
      orderNumber: "ORD-2024-007",
      patientId: "patient_7",
      patientName: "Lisa Garcia",
      patientEmail: "lisa.garcia@email.com",
      patientPhone: "+1 (555) 789-0123",
      coachId: "coach_2",
      coachName: "Dr. James Wilson",
      status: "delivered",
      items: [
         {
            id: "item_10",
            name: "Probiotic Supplement",
            type: "supplement",
            quantity: 60,
            unitPrice: 45.0,
            totalPrice: 2700.0,
            description: "High-quality probiotic for gut health",
         },
         {
            id: "item_11",
            name: "Gut Health Consultation",
            type: "consultation",
            quantity: 1,
            unitPrice: 175.0,
            totalPrice: 175.0,
            description: "45-minute gut health consultation",
         },
      ],
      subtotal: 2875.0,
      tax: 230.0,
      shipping: 0.0,
      total: 3105.0,
      currency: "USD",
      paymentMethod: "credit_card",
      paymentStatus: "paid",
      shippingAddress: {
         street: "147 Birch Road",
         city: "Seattle",
         state: "WA",
         zipCode: "98101",
         country: "USA",
      },
      billingAddress: {
         street: "147 Birch Road",
         city: "Seattle",
         state: "WA",
         zipCode: "98101",
         country: "USA",
      },
      createdAt: "2024-01-14T13:20:00Z",
      updatedAt: "2024-01-17T15:45:00Z",
      estimatedDelivery: "2024-01-17",
      trackingNumber: "TRK456789123",
      prescriptionRequired: false,
   },
   {
      id: "8",
      orderNumber: "ORD-2024-008",
      patientId: "patient_8",
      patientName: "Thomas Anderson",
      patientEmail: "thomas.anderson@email.com",
      patientPhone: "+1 (555) 890-1234",
      status: "shipped",
      items: [
         {
            id: "item_12",
            name: "Amlodipine 5mg",
            type: "medication",
            quantity: 60,
            unitPrice: 20.0,
            totalPrice: 1200.0,
            description: "Blood pressure medication - 60 tablets",
         },
         {
            id: "item_13",
            name: "Blood Pressure Monitor",
            type: "supplement",
            quantity: 1,
            unitPrice: 89.0,
            totalPrice: 89.0,
            description: "Digital blood pressure monitor",
         },
      ],
      subtotal: 1289.0,
      tax: 103.12,
      shipping: 12.0,
      total: 1404.12,
      currency: "USD",
      paymentMethod: "paypal",
      paymentStatus: "paid",
      shippingAddress: {
         street: "258 Spruce Street",
         city: "Denver",
         state: "CO",
         zipCode: "80201",
         country: "USA",
      },
      billingAddress: {
         street: "258 Spruce Street",
         city: "Denver",
         state: "CO",
         zipCode: "80201",
         country: "USA",
      },
      createdAt: "2024-01-16T12:10:00Z",
      updatedAt: "2024-01-19T14:30:00Z",
      estimatedDelivery: "2024-01-23",
      trackingNumber: "TRK789123456",
      prescriptionRequired: true,
      prescriptionStatus: "approved",
   },
];
