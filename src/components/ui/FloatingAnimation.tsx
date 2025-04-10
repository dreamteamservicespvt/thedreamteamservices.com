
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: string;
  duration?: string;
  distance?: string;
}

const FloatingAnimation = ({
  children,
  className,
  delay = "0s",
  duration = "3s",
  distance = "10px",
}: FloatingAnimationProps) => {
  return (
    <div
      className={cn("animate-float", className)}
      style={{
        animationDelay: delay,
        animationDuration: duration,
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        animationName: "float",
        animationFillMode: "both",
        "--float-distance": distance,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default FloatingAnimation;
