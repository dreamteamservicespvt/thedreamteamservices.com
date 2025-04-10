
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative group overflow-hidden transition-all duration-300",
          variant === "default" && "bg-button-gradient hover:shadow-lg hover:shadow-dts-purple/20",
          variant === "outline" && "border border-dts-purple hover:border-dts-cyan",
          variant === "ghost" && "hover:bg-muted",
          className
        )}
        variant={variant === "default" ? "default" : variant}
        size={size}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === "default" && (
          <span className="absolute inset-0 bg-button-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x" />
        )}
      </Button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
