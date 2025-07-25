import MainDashboard from "@/components/layouts/MainDashboard";

export default function HomeLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <section>
         <MainDashboard>{children}</MainDashboard>
      </section>
   );
}
