import { useState } from "react";
import { Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

const AdminProjects = () => {
  return (
    <AdminLayout title="Projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Projects</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg border text-center">
          <h2 className="text-xl font-semibold mb-4">No Projects Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start by adding your first project to the portfolio.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Project
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
