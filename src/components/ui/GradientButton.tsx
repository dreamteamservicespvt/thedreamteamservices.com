import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost" | "link";
  children: React.ReactNode;
  className?: string;
  /**
   * Define gradient direction
   * @default "horizontal"
   */
  gradientDirection?: "horizontal" | "diagonal" | "vertical";
  /**
   * Define gradient intensity 
   * @default "default"
   */
  intensity?: "default" | "subtle" | "strong";
  /**
   * Enable hover animation effects (scale, glow)
   * @default true
   */
  animated?: boolean;
  /**
   * Increase contrast for better accessibility
   * @default false
   */
  highContrast?: boolean;
}

/**
 * GradientButton component
 * 
 * A consistently styled button with customizable gradient effects,
 * ensuring consistent appearance across the application
 */
const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ 
    className, 
    size = "default", 
    variant = "default", 
    children, 
    gradientDirection = "horizontal", 
    intensity = "default",
    animated = true,
    highContrast = false,
    ...props 
  }, ref) => {
    // Base styling that's always applied
    const baseStyles = "text-white font-medium border-0 transition-all duration-300";
    
    // Gradient direction variants
    const directionStyles = {
      horizontal: "bg-gradient-to-r from-dts-purple to-dts-cyan hover:from-dts-purple/95 hover:to-dts-cyan/95",
      diagonal: "bg-gradient-to-br from-dts-purple to-dts-cyan hover:from-dts-purple/95 hover:to-dts-cyan/95",
      vertical: "bg-gradient-to-b from-dts-purple to-dts-cyan hover:from-dts-purple/95 hover:to-dts-cyan/95"
    };
    
    // Intensity variations
    const intensityStyles = {
      default: "",
      subtle: "opacity-90 hover:opacity-100",
      strong: "from-dts-purple-dark via-indigo-600 to-dts-cyan-dark"
    };
    
    // High contrast mode for accessibility
    const contrastStyles = highContrast ? 
      "from-dts-purple-dark to-dts-cyan-dark text-white drop-shadow-sm" : "";
    
    // Animation effects, conditionally applied
    const animationStyles = animated 
      ? "transform hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg hover:shadow-dts-purple/20 transition-transform duration-300"
      : "";

    return (
      <Button
        className={cn(
          baseStyles,
          directionStyles[gradientDirection],
          intensityStyles[intensity],
          contrastStyles,
          animationStyles,
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
