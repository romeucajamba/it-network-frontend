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
          <main className={`h-screen bg-[#001329] flex flex-col space-y-8`}>
            <Header/>
            {children}
          </main>
        </SidebarProvider>
    </>
  );
}