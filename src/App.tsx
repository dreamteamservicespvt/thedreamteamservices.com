import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/admin/AuthGuard";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminSettings from "./pages/admin/Settings";
import AdminTeam from "@/pages/admin/Team";
import AdminReviews from "@/pages/admin/Reviews";
import Pricing from "@/pages/Pricing";

// ScrollToTop component to ensure pages load at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="page-wrapper">
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/services" element={<Pricing />} /> {/* Redirect services to pricing page */}
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
              <Route path="/admin/projects" element={<AuthGuard><AdminProjects /></AuthGuard>} />
              <Route path="/admin/inquiries" element={<AuthGuard><AdminInquiries /></AuthGuard>} />
              <Route path="/admin/reviews" element={<AuthGuard><AdminReviews /></AuthGuard>} />
              <Route path="/admin/team" element={<AuthGuard><AdminTeam /></AuthGuard>} />
              <Route path="/admin/settings" element={<AuthGuard><AdminSettings /></AuthGuard>} />
              
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
