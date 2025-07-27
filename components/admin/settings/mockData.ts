export interface SystemSettings {
   siteName: string;
   siteDescription: string;
   contactEmail: string;
   supportPhone: string;
   timezone: string;
   dateFormat: string;
   currency: string;
   maintenanceMode: boolean;
   allowRegistration: boolean;
   requireEmailVerification: boolean;
}

export interface NotificationSettings {
   emailNotifications: boolean;
   smsNotifications: boolean;
   pushNotifications: boolean;
   newUserAlerts: boolean;
   paymentAlerts: boolean;
   systemAlerts: boolean;
   marketingEmails: boolean;
   weeklyReports: boolean;
   monthlyReports: boolean;
}

export interface SecuritySettings {
   twoFactorAuth: boolean;
   sessionTimeout: number;
   passwordMinLength: number;
   requireSpecialChars: boolean;
   maxLoginAttempts: number;
   lockoutDuration: number;
   ipWhitelist: string[];
   allowedDomains: string[];
}

export interface IntegrationSettings {
   stripeEnabled: boolean;
   stripePublishableKey: string;
   stripeSecretKey: string;
   emailProvider: "sendgrid" | "mailgun" | "smtp";
   emailApiKey: string;
   emailFromAddress: string;
   smsProvider: "twilio" | "aws-sns";
   smsApiKey: string;
   smsFromNumber: string;
}

export const defaultSystemSettings: SystemSettings = {
   siteName: "CoachSaaS",
   siteDescription: "Professional coaching platform for health and wellness",
   contactEmail: "admin@coachsaas.com",
   supportPhone: "+1 (555) 123-4567",
   timezone: "America/New_York",
   dateFormat: "MM/DD/YYYY",
   currency: "USD",
   maintenanceMode: false,
   allowRegistration: true,
   requireEmailVerification: true,
};

export const defaultNotificationSettings: NotificationSettings = {
   emailNotifications: true,
   smsNotifications: false,
   pushNotifications: true,
   newUserAlerts: true,
   paymentAlerts: true,
   systemAlerts: true,
   marketingEmails: false,
   weeklyReports: true,
   monthlyReports: true,
};

export const defaultSecuritySettings: SecuritySettings = {
   twoFactorAuth: true,
   sessionTimeout: 30,
   passwordMinLength: 8,
   requireSpecialChars: true,
   maxLoginAttempts: 5,
   lockoutDuration: 15,
   ipWhitelist: [],
   allowedDomains: ["coachsaas.com", "admin.coachsaas.com"],
};

export const defaultIntegrationSettings: IntegrationSettings = {
   stripeEnabled: true,
   stripePublishableKey: "pk_test_...",
   stripeSecretKey: "sk_test_...",
   emailProvider: "sendgrid",
   emailApiKey: "SG...",
   emailFromAddress: "noreply@coachsaas.com",
   smsProvider: "twilio",
   smsApiKey: "AC...",
   smsFromNumber: "+1234567890",
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

export const dateFormatOptions = [
   { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
   { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
   { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
   { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
];

export const currencyOptions = [
   { value: "USD", label: "US Dollar ($)" },
   { value: "EUR", label: "Euro (€)" },
   { value: "GBP", label: "British Pound (£)" },
   { value: "CAD", label: "Canadian Dollar (C$)" },
   { value: "AUD", label: "Australian Dollar (A$)" },
   { value: "JPY", label: "Japanese Yen (¥)" },
];

export const emailProviderOptions = [
   { value: "sendgrid", label: "SendGrid" },
   { value: "mailgun", label: "Mailgun" },
   { value: "smtp", label: "SMTP" },
];

export const smsProviderOptions = [
   { value: "twilio", label: "Twilio" },
   { value: "aws-sns", label: "AWS SNS" },
];
