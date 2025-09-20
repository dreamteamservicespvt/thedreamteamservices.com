import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileImage, 
  MessageSquare, 
  Settings, 
  Menu,
  LogOut,
  Users,
  X,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/admin", 
      icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
    },
    { 
      name: "Projects", 
      path: "/admin/projects", 
      icon: <FileImage className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
    },
    { 
      name: "Inquiries", 
      path: "/admin/inquiries", 
      icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
    },
    { 
      name: "Reviews", 
      path: "/admin/reviews", 
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
    },
    { 
      name: "Team", 
      path: "/admin/team", 
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
    },
    { 
      name: "Settings", 
      path: "/admin/settings", 
      icon: <Settings className="w-5 h-5 mr-2" /> 
    }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  // Close mobile menu when clicking a navigation item
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 flex-col bg-card border-r h-screen fixed">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
            <span className="ml-2 font-semibold">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Mobile Sidebar - Show when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative flex flex-col w-full max-w-xs bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center" onClick={handleNavClick}>
                <Logo size="sm" />
                <span className="ml-2 font-semibold">Admin</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                  onClick={handleNavClick}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="pt-4 border-t mt-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="lg:pl-64 w-full">
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <h1 className="ml-4 text-xl font-semibold">{title}</h1>
          </div>
        </header>
      
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
