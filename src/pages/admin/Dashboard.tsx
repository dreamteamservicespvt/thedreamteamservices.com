import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileImage, MessageSquare, CheckCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { Inquiry } from "@/types/inquiry";

// This is a placeholder until we implement the actual services
const mockProjects: Project[] = [];
const mockInquiries: Inquiry[] = [];

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [newInquiries, setNewInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);

  // Will be implemented when Firebase is set up
  useEffect(() => {
    // Placeholder for actual data fetching
    setLoading(false);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FileImage className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : projects.length}</div>
              <p className="text-xs text-muted-foreground">Projects in portfolio</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : inquiries.length}</div>
              <p className="text-xs text-muted-foreground">Messages received</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : inquiries.filter(i => i.status === 'resolved').length}</div>
              <p className="text-xs text-muted-foreground">Resolved inquiries</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
