import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SidebarProvider>
          <AppSidebar  />
          <main className={`h-screen bg-[#001329]`}>
            
            {children}
          </main>
        </SidebarProvider>
    </>
  );
}