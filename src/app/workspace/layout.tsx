import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider className="bg-red-500">
        <AppSidebar  />
        <main className={`h-screen`}> 
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}