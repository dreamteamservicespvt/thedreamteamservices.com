import { cn } from "@/lib/utils";

interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function FormLayout({ children, className }: FormLayoutProps) {
  return (
    <div 
      className={cn(
        "grid gap-6 py-4", 
        "sm:grid-cols-1 lg:grid-cols-2 lg:gap-x-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function FormSection({ children, className, fullWidth = false }: FormLayoutProps & { fullWidth?: boolean }) {
  return (
    <div 
      className={cn(
        "space-y-4",
        fullWidth && "lg:col-span-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function FormField({ children, className, label }: FormLayoutProps & { label?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium block">{label}</label>}
      {children}
    </div>
  );
}
