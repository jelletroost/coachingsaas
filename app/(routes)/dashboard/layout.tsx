import PatientDashboard from "@/components/layouts/PatientDashboard";

export default function PatientLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <PatientDashboard>{children}</PatientDashboard>;
}
