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
import { Link, NavLink } from "react-router-dom";
import { div } from "three/src/nodes/math/OperatorNode.js";

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
    title: "certificates",
    url: "/certificates",
  },
];

export function AppSidebar() {
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
    </Sidebar>
  );
}
