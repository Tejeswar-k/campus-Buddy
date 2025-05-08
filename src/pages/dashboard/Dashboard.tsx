
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
import { Home, Brain, Calendar, Map, LogOut, User, ListTodo } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const menuItems = [
    {
      title: "Home",
      path: "/dashboard",
      icon: Home,
      exact: true
    },
    {
      title: "Tasks",
      path: "/dashboard/tasks",
      icon: ListTodo,
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem signing out",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-blue-50 to-white">
        <Sidebar className="border-r border-blue-200">
          <SidebarContent>
            <div className="p-4 mb-4">
              <h2 className="text-xl font-bold text-blue-900">SRM Campus Connect</h2>
            </div>

            {user && (
              <div className="px-4 py-2 mb-4 flex items-center">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <User size={16} />
                  <div className="truncate">{user.email}</div>
                </div>
              </div>
            )}

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

            <div className="mt-auto p-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
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
