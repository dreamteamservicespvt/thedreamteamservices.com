import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileImage, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/services/projectService";
import { getInquiries } from "@/services/inquiryService";

const AdminDashboard = () => {
  // Use React Query to fetch projects
  const { 
    data: projects = [],
    isLoading: projectsLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  // Use React Query to fetch inquiries
  const { 
    data: inquiries = [],
    isLoading: inquiriesLoading,
  } = useQuery({
    queryKey: ["inquiries"],
    queryFn: () => getInquiries()
  });

  // Calculate counts
  const newInquiries = inquiries.filter(inquiry => inquiry.status === "new");

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects stat card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Projects</CardTitle>
              <CardDescription>Projects in portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileImage className="mr-4 text-primary h-8 w-8" />
                <div>
                  <div className="text-3xl font-bold">
                    {projectsLoading ? (
                      <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded"></span>
                    ) : (
                      projects.length
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inquiries stat card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">New Inquiries</CardTitle>
              <CardDescription>Unread contact messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageSquare className="mr-4 text-primary h-8 w-8" />
                <div>
                  <div className="text-3xl font-bold">
                    {inquiriesLoading ? (
                      <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded"></span>
                    ) : (
                      newInquiries.length
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Latest additions to your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No projects yet. Add your first project!</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-auto">
                  {projects.slice(0, 5).map(project => (
                    <li key={project.id} className="border-b pb-2">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground">{project.category}</div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {inquiriesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
                  ))}
                </div>
              ) : inquiries.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No inquiries yet.</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-auto">
                  {inquiries.slice(0, 5).map(inquiry => (
                    <li key={inquiry.id} className="border-b pb-2">
                      <div className="font-medium">{inquiry.subject}</div>
                      <div className="text-sm text-muted-foreground">From: {inquiry.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Status: <span className={inquiry.status === "new" ? "text-primary" : ""}>{inquiry.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
