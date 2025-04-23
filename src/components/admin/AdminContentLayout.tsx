import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminContentLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  actionButton?: {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
  };
  isLoading?: boolean;
  className?: string;
}

/**
 * Reusable layout component for admin content pages
 * Provides consistent header, loading states, and action buttons
 */
const AdminContentLayout = ({
  title,
  description,
  children,
  actionButton,
  isLoading = false,
  className
}: AdminContentLayoutProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>

        {actionButton && (
          <Button onClick={actionButton.onClick}>
            {actionButton.icon && (
              <span className="mr-2">{actionButton.icon}</span>
            )}
            {actionButton.label}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-8">
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
          <p className="text-center text-muted-foreground mt-4">Loading...</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default AdminContentLayout;
