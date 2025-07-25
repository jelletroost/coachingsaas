import CoachDashboard from "@/components/layouts/CoachDashboard";

export default function CoachLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <CoachDashboard>{children}</CoachDashboard>;
}
