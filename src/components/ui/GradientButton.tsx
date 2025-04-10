import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
  children: React.ReactNode;
  className?: string;
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, size = "default", variant = "default", children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "bg-gradient-to-r from-purple-600 to-cyan-500",
          "hover:from-purple-700 hover:to-cyan-600",
          "text-white border-0 transition-all duration-300",
          "hover:shadow-lg hover:shadow-purple-600/30",
          className
        )}
        size={size}
        variant={variant}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
