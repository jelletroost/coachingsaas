export interface CoachProfileSettings {
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   bio: string;
   specialization: string[];
   yearsOfExperience: number;
   certifications: string[];
   profileImage: string;
   timezone: string;
   availability: {
      monday: { start: string; end: string; available: boolean };
      tuesday: { start: string; end: string; available: boolean };
      wednesday: { start: string; end: string; available: boolean };
      thursday: { start: string; end: string; available: boolean };
      friday: { start: string; end: string; available: boolean };
      saturday: { start: string; end: string; available: boolean };
      sunday: { start: string; end: string; available: boolean };
   };
}

export interface CoachNotificationSettings {
   emailNotifications: boolean;
   smsNotifications: boolean;
   pushNotifications: boolean;
   newPatientAlerts: boolean;
   appointmentReminders: boolean;
   messageNotifications: boolean;
   paymentNotifications: boolean;
   weeklyReports: boolean;
   marketingEmails: boolean;
}

export interface CoachSecuritySettings {
   twoFactorAuth: boolean;
   sessionTimeout: number;
   passwordMinLength: number;
   requireSpecialChars: boolean;
   maxLoginAttempts: number;
   lockoutDuration: number;
}

export interface CoachAppointmentSettings {
   appointmentDuration: number; // in minutes
   bufferTime: number; // in minutes
   maxPatientsPerDay: number;
   allowSameDayBookings: boolean;
   requireAdvanceNotice: number; // in hours
   cancellationPolicy: string;
   autoConfirmAppointments: boolean;
   reminderTiming: number; // in hours before appointment
}

export const defaultCoachProfileSettings: CoachProfileSettings = {
   firstName: "Dr. Sarah",
   lastName: "Johnson",
   email: "sarah.johnson@coachsaas.com",
   phone: "+1 (555) 123-4567",
   bio: "Experienced health coach specializing in nutrition and wellness programs.",
   specialization: ["Nutrition", "Weight Loss", "Wellness"],
   yearsOfExperience: 8,
   certifications: ["Certified Health Coach", "Nutrition Specialist"],
   profileImage: "",
   timezone: "America/New_York",
   availability: {
      monday: { start: "09:00", end: "17:00", available: true },
      tuesday: { start: "09:00", end: "17:00", available: true },
      wednesday: { start: "09:00", end: "17:00", available: true },
      thursday: { start: "09:00", end: "17:00", available: true },
      friday: { start: "09:00", end: "17:00", available: true },
      saturday: { start: "10:00", end: "14:00", available: false },
      sunday: { start: "10:00", end: "14:00", available: false },
   },
};

export const defaultCoachNotificationSettings: CoachNotificationSettings = {
   emailNotifications: true,
   smsNotifications: true,
   pushNotifications: true,
   newPatientAlerts: true,
   appointmentReminders: true,
   messageNotifications: true,
   paymentNotifications: true,
   weeklyReports: true,
   marketingEmails: false,
};

export const defaultCoachSecuritySettings: CoachSecuritySettings = {
   twoFactorAuth: true,
   sessionTimeout: 30,
   passwordMinLength: 8,
   requireSpecialChars: true,
   maxLoginAttempts: 5,
   lockoutDuration: 15,
};

export const defaultCoachAppointmentSettings: CoachAppointmentSettings = {
   appointmentDuration: 60,
   bufferTime: 15,
   maxPatientsPerDay: 8,
   allowSameDayBookings: true,
   requireAdvanceNotice: 2,
   cancellationPolicy: "24 hours notice required for cancellation",
   autoConfirmAppointments: false,
   reminderTiming: 24,
};

export const timezoneOptions = [
   { value: "America/New_York", label: "Eastern Time (ET)" },
   { value: "America/Chicago", label: "Central Time (CT)" },
   { value: "America/Denver", label: "Mountain Time (MT)" },
   { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
   { value: "Europe/London", label: "London (GMT)" },
   { value: "Europe/Paris", label: "Paris (CET)" },
   { value: "Asia/Tokyo", label: "Tokyo (JST)" },
   { value: "Australia/Sydney", label: "Sydney (AEST)" },
];

export const specializationOptions = [
   "Nutrition",
   "Weight Loss",
   "Wellness",
   "Fitness",
   "Mental Health",
   "Stress Management",
   "Sleep",
   "Chronic Disease",
   "Preventive Care",
   "Sports Nutrition",
   "Women's Health",
   "Men's Health",
   "Senior Health",
   "Pediatric Nutrition",
   "Plant-Based Nutrition",
];

export const appointmentDurationOptions = [
   { value: 30, label: "30 minutes" },
   { value: 45, label: "45 minutes" },
   { value: 60, label: "1 hour" },
   { value: 90, label: "1.5 hours" },
   { value: 120, label: "2 hours" },
];
