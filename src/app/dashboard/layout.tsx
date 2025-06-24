import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      >
        <SidebarProvider>
          <AppSidebar  />
          <main className={`flex flex-col h-screen `}>
            
            {children}
          </main>
        </SidebarProvider>
    </div>
  );
}