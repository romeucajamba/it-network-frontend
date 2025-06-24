"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes"
import { usePathname } from 'next/navigation';
import Link from "next/link";
//Componente


export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar
    className={`h-screen border-none`}>
      <SidebarContent className="bg-[#001329] h-full overflow-hidden">
        <SidebarGroup>
             {/* Logo Section */}
          <SidebarGroupLabel className="flex justify-center items-center mb-8 mt-4 p-2"> 
          </SidebarGroupLabel>
                {/* Dynamic Menu Sections */}
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => {
                 const isActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.id} className="w-[14rem]">
                    <SidebarMenuButton asChild className="h-10 hover:text-[#4D44B5] cursor-pointer space-x-3 rounded-l-4xl">
                      <Link
                        href={item.url}
                        key={item.id}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-slate-700 hover:text-white"
                        }`}
                         aria-current={isActive ? "page" : undefined}
                      >
                        <item.icon size={24} />
                        <span className="flex-1">{item.title}</span>
                        {item.hasNotification && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
         </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>        
    </Sidebar>
  );
}
