import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AdminDashboardLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/jc-login" replace />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <SidebarTrigger />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
