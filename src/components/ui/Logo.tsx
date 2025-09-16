import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "md", 
  alt = "Dream Team Services Logo" 
}) => {
  const sizeClasses = {
    sm: "h-8", // 32px
    md: "h-12", // 48px  
    lg: "h-16", // 64px
    xl: "h-20", // 80px
  };

  return (
    <img 
      src="/images/Untitled design (26).png" 
      alt={alt}
      className={cn(
        "w-auto object-contain transition-all duration-300",
        sizeClasses[size],
        className
      )}
    />
  );
};

export default Logo;