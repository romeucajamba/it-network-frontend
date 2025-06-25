import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SidebarProvider>
          <main className={`h-screen bg-[#001329] flex flex-col`}>
            <Header/>
            {children}
          </main>
        </SidebarProvider>
    </>
  );
}