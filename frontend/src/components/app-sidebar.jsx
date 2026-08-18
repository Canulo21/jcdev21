import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import apiFetch from "@/lib/api";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const menus = [
  {
    title: "dashboard",
    url: "/dashboard",
  },
  {
    title: "projects",
    url: "/projects",
  },
  {
    title: "experiences",
    url: "/experiences",
  },
  {
    title: "certificates",
    url: "/certificates",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiFetch("logout", {
        method: "POST",
      });

      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed.");
    } finally {
      localStorage.removeItem("token");
      navigate("/jc-login", { replace: true });
    }
  };
  return (
    <Sidebar>
      <SidebarContent className="border-t-4 border-[var(--bg-secondary)]">
        <SidebarGroup>
          <Link
            className="text-[var(--text-primary)] text-3xl md:text-5xl font-bold text-center py-5"
            to="/dashboard"
          >
            JC <span className="text-[var(--text-secondary)]">Dev.</span>
          </Link>

          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `w-full block uppercase font-medium py-3 px-4 hover:opacity-95 mb-2 ${
                        isActive
                          ? "!bg-[var(--bg-secondary)] text-white"
                          : "!bg-[var(--bg-primary)] text-white"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* LOGOUT */}
      <SidebarFooter>
        <button
          onClick={handleLogout}
          className="w-full uppercase font-medium py-3 px-4 text-white bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
        >
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
