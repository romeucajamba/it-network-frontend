import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header/>
      <main className={`bg-[#001329] w-screen`}>      
        {children}
      </main>
        
    </>
  );
}