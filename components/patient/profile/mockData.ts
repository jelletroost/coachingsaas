// Patient Profile Data
export const patientProfileData = {
   id: "1",
   firstName: "John",
   lastName: "Doe",
   email: "john.doe@example.com",
   phone: "+1 (555) 123-4567",
   dateOfBirth: "1985-03-15",
   gender: "Male",
   address: "123 Main Street, Apt 4B\nNew York, NY 10001",
   avatar: "/avatars/john-doe.jpg",
   status: "Active",
   allergies: "Peanuts, Shellfish",
   medications: "None",
   medicalConditions: "Hypertension (controlled)",
   emergencyContact: {
      name: "Jane Doe",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
   },
   preferences: {
      communication: "email" as "email" | "phone" | "text",
      appointmentReminders: true,
      progressUpdates: true,
      marketingEmails: false,
   },
};

// Health Metrics Data
export const healthMetricsData = {
   height: "5'10\" (178 cm)",
   weight: "165 lbs (75 kg)",
   bmi: "23.5",
   bloodType: "O+",
   bloodPressure: "120/80",
   heartRate: "72 bpm",
   lastUpdated: "2024-01-10",
};
