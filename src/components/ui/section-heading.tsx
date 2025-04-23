import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  id?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/**
 * SectionHeading component for consistent section titles across the application
 * Includes accessibility features and responsive styling
 */
const SectionHeading = ({ 
  title, 
  subtitle, 
  className,
  align = "center",
  id,
  titleClassName,
  subtitleClassName
}: SectionHeadingProps) => {
  // Generate an ID if one isn't provided (for accessibility)
  const headingId = id || `heading-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const descriptionId = subtitle ? `${headingId}-description` : undefined;

  return (
    <div 
      className={cn(
        "mb-12", 
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      <h2 
        id={headingId}
        className={cn("text-3xl md:text-4xl font-bold mb-4", titleClassName)}
        tabIndex={0}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          id={descriptionId}
          className={cn("text-lg text-foreground/70 max-w-3xl mx-auto", subtitleClassName)}
          aria-labelledby={headingId}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
