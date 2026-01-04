// src/components/app-layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"; // We will create this next
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-bold">Demination</h1>
          </div>
          {/* This is where Chapters 1-4 will appear */}
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
