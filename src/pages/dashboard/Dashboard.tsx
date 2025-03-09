
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Brain, Calendar, Map } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Home",
      path: "/dashboard",
      icon: Home,
      exact: true
    },
    {
      title: "AI Study Assistant",
      path: "/dashboard/study",
      icon: Brain,
    },
    {
      title: "Clubs & Events",
      path: "/dashboard/events",
      icon: Calendar,
    },
    {
      title: "Campus Navigate",
      path: "/dashboard/navigate",
      icon: Map,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-blue-50 to-white">
        <Sidebar className="border-r border-blue-200">
          <SidebarContent>
            <div className="p-4 mb-4">
              <h2 className="text-xl font-bold text-blue-900">SRM Campus Connect</h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-blue-700">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        className={
                          (item.exact && location.pathname === "/dashboard") || 
                          (!item.exact && location.pathname === item.path) 
                            ? "bg-blue-100 text-blue-900" 
                            : "text-blue-700 hover:bg-blue-50"
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4 text-blue-700 hover:text-blue-900" />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
