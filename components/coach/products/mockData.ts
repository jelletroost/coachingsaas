export interface ProductCategory {
   id: string;
   name: string;
   description: string;
   color: string;
}

export interface Product {
   id: string;
   name: string;
   description: string;
   category:
      | "medication"
      | "supplement"
      | "consultation"
      | "program"
      | "equipment";
   subcategory?: string;
   sku: string;
   price: number;
   currency: string;
   status: "active" | "inactive" | "draft" | "discontinued";
   prescription: {
      required: boolean;
      type?: "controlled" | "non-controlled" | "otc";
   };
   specifications: {
      dosage?: string;
      strength?: string;
      form?: string;
      quantity?: number;
      unit?: string;
   };
   instructions?: string;
   images: string[];
   tags: string[];
   rating: number;
   reviewCount: number;
   createdAt: string;
   createdBy: string;
}

export const productCategories: ProductCategory[] = [
   {
      id: "medications",
      name: "Medications",
      description: "Prescription and over-the-counter medications",
      color: "bg-red-100 text-red-800",
   },
   {
      id: "supplements",
      name: "Supplements",
      description: "Vitamins, minerals, and nutritional supplements",
      color: "bg-blue-100 text-blue-800",
   },
   {
      id: "consultations",
      name: "Consultations",
      description: "Health coaching and consultation services",
      color: "bg-green-100 text-green-800",
   },
   {
      id: "programs",
      name: "Programs",
      description: "Health management programs and courses",
      color: "bg-purple-100 text-purple-800",
   },
   {
      id: "equipment",
      name: "Equipment",
      description: "Health monitoring devices and equipment",
      color: "bg-orange-100 text-orange-800",
   },
];

export const mockProducts: Product[] = [
   {
      id: "1",
      name: "Metformin 500mg",
      description:
         "Oral diabetes medication that helps control blood sugar levels",
      category: "medication",
      subcategory: "Diabetes",
      sku: "MED-MET-500",
      price: 45.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: true,
         type: "non-controlled",
      },
      specifications: {
         dosage: "500mg",
         strength: "500mg",
         form: "tablet",
         quantity: 30,
         unit: "tablets",
      },
      instructions:
         "Take with meals to reduce stomach upset. Start with 500mg twice daily.",
      images: ["/products/metformin-500mg.jpg"],
      tags: ["diabetes", "blood sugar", "oral medication"],
      rating: 4.2,
      reviewCount: 156,
      createdAt: "2024-01-15T10:30:00Z",
      createdBy: "admin_1",
   },
   {
      id: "2",
      name: "Omega-3 Fish Oil Supplement",
      description:
         "High-quality fish oil supplement rich in EPA and DHA for heart and brain health",
      category: "supplement",
      subcategory: "Omega-3",
      sku: "SUP-OMG-1000",
      price: 35.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: false,
         type: "otc",
      },
      specifications: {
         dosage: "1000mg",
         strength: "1000mg",
         form: "softgel",
         quantity: 60,
         unit: "softgels",
      },
      instructions:
         "Take 1-2 softgels daily with meals. Refrigerate after opening.",
      images: ["/products/omega3-fish-oil.jpg"],
      tags: ["omega-3", "heart health", "brain health", "fish oil"],
      rating: 4.5,
      reviewCount: 234,
      createdAt: "2024-01-10T09:15:00Z",
      createdBy: "admin_2",
   },
   {
      id: "3",
      name: "Nutrition Consultation",
      description:
         "60-minute personalized nutrition consultation with certified nutritionist",
      category: "consultation",
      subcategory: "Nutrition",
      sku: "CON-NUT-60",
      price: 150.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: false,
         type: "otc",
      },
      specifications: {
         dosage: "60 minutes",
         form: "virtual consultation",
         quantity: 1,
         unit: "session",
      },
      instructions:
         "Schedule your consultation through the patient portal. Prepare your health history and goals.",
      images: ["/products/nutrition-consultation.jpg"],
      tags: ["nutrition", "consultation", "diet", "health coaching"],
      rating: 4.8,
      reviewCount: 89,
      createdAt: "2024-01-05T14:20:00Z",
      createdBy: "admin_1",
   },
   {
      id: "4",
      name: "Heart Health Program",
      description:
         "3-month comprehensive heart health management program with coaching and monitoring",
      category: "program",
      subcategory: "Cardiovascular",
      sku: "PRG-HRT-90",
      price: 299.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: false,
         type: "otc",
      },
      specifications: {
         dosage: "90 days",
         form: "program",
         quantity: 1,
         unit: "program",
      },
      instructions:
         "Complete program includes weekly coaching sessions, meal plans, and progress tracking.",
      images: ["/products/heart-health-program.jpg"],
      tags: ["heart health", "program", "coaching", "cardiovascular"],
      rating: 4.6,
      reviewCount: 67,
      createdAt: "2024-01-12T11:45:00Z",
      createdBy: "admin_3",
   },
   {
      id: "5",
      name: "Blood Pressure Monitor",
      description:
         "Digital automatic blood pressure monitor with irregular heartbeat detection",
      category: "equipment",
      subcategory: "Monitoring",
      sku: "EQP-BPM-001",
      price: 89.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: false,
         type: "otc",
      },
      specifications: {
         form: "digital monitor",
         quantity: 1,
         unit: "device",
      },
      instructions:
         "Wrap cuff around upper arm, press start button, remain still during measurement.",
      images: ["/products/blood-pressure-monitor.jpg"],
      tags: ["blood pressure", "monitor", "equipment", "digital"],
      rating: 4.3,
      reviewCount: 123,
      createdAt: "2024-01-08T08:30:00Z",
      createdBy: "admin_2",
   },
   {
      id: "6",
      name: "Vitamin D3 2000IU",
      description:
         "High-potency vitamin D3 supplement for bone health and immune support",
      category: "supplement",
      subcategory: "Vitamins",
      sku: "SUP-VIT-D3",
      price: 22.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: false,
         type: "otc",
      },
      specifications: {
         dosage: "2000IU",
         strength: "2000IU",
         form: "softgel",
         quantity: 120,
         unit: "softgels",
      },
      instructions:
         "Take 1 softgel daily with a meal containing fat for better absorption.",
      images: ["/products/vitamin-d3.jpg"],
      tags: ["vitamin d", "bone health", "immune support", "vitamin"],
      rating: 4.4,
      reviewCount: 189,
      createdAt: "2024-01-14T13:20:00Z",
      createdBy: "admin_1",
   },
   {
      id: "7",
      name: "Lisinopril 10mg",
      description:
         "ACE inhibitor medication for treating high blood pressure and heart failure",
      category: "medication",
      subcategory: "Cardiovascular",
      sku: "MED-LIS-10",
      price: 28.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: true,
         type: "non-controlled",
      },
      specifications: {
         dosage: "10mg",
         strength: "10mg",
         form: "tablet",
         quantity: 30,
         unit: "tablets",
      },
      instructions: "Take once daily, preferably at the same time each day.",
      images: ["/products/lisinopril-10mg.jpg"],
      tags: ["blood pressure", "ace inhibitor", "cardiovascular"],
      rating: 4.1,
      reviewCount: 98,
      createdAt: "2024-01-11T16:45:00Z",
      createdBy: "admin_2",
   },
   {
      id: "8",
      name: "Weight Management Consultation",
      description:
         "90-minute comprehensive weight management consultation with personalized plan",
      category: "consultation",
      subcategory: "Weight Management",
      sku: "CON-WGT-90",
      price: 200.0,
      currency: "USD",
      status: "active",
      prescription: {
         required: false,
         type: "otc",
      },
      specifications: {
         dosage: "90 minutes",
         form: "virtual consultation",
         quantity: 1,
         unit: "session",
      },
      instructions:
         "Complete health assessment required before consultation. Bring current weight and goals.",
      images: ["/products/weight-management-consultation.jpg"],
      tags: ["weight loss", "consultation", "diet", "fitness"],
      rating: 4.7,
      reviewCount: 45,
      createdAt: "2024-01-13T10:15:00Z",
      createdBy: "admin_3",
   },
];
