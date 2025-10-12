import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  onError?: (error: Error) => void;
  showErrorOverlay?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc,
  width,
  height,
  onError,
  showErrorOverlay = true,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(null);
    setFallbackAttempted(false);

    // Validate src before proceeding
    if (!src || src.trim() === '') {
      console.warn('OptimizedImage: Empty or missing image source', { alt, src });
      
      // Try fallback immediately if available
      if (fallbackSrc && fallbackSrc.trim() !== '') {
        setFallbackAttempted(true);
        setImgSrc(fallbackSrc);
        return;
      }
      
      const error = new Error("Image source is missing or empty");
      setError(error);
      setIsLoading(false);
      if (onError) onError(error);
      return;
    }

    try {
      // Convert to WebP if it's a Cloudinary URL
      if (src.includes('cloudinary.com')) {
        const webPSrc = src.replace('/upload/', '/upload/f_webp,q_auto,dpr_auto/');
        setImgSrc(webPSrc);
      } else {
        setImgSrc(src);
      }
    } catch (err) {
      console.error('OptimizedImage: Failed to process image URL', { src, alt, error: err });
      const error = err instanceof Error ? err : new Error("Failed to process image URL");
      setError(error);
      setIsLoading(false);
      if (onError) onError(error);
    }
  }, [src, fallbackSrc, alt, onError]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('OptimizedImage: Image load error', { 
      src: imgSrc, 
      alt, 
      fallbackAttempted,
      fallbackSrc 
    });
    
    // Try fallback image if available and not already attempted
    if (fallbackSrc && !fallbackAttempted && fallbackSrc.trim() !== '') {
      console.log('OptimizedImage: Attempting fallback image', { fallbackSrc, alt });
      setFallbackAttempted(true);
      setImgSrc(fallbackSrc);
      setError(null); // Clear error when trying fallback
      return;
    }

    const errorMessage = fallbackAttempted 
      ? "Both primary and fallback images failed to load" 
      : "Image failed to load";
      
    const error = new Error(errorMessage);
    setError(error);
    setIsLoading(false);
    
    console.error('OptimizedImage: Final error state', { errorMessage, alt, src: imgSrc });
    if (onError) onError(error);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />
      )}
      
      {error && showErrorOverlay && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 rounded-md p-2">
          <AlertCircle className="h-6 w-6 text-destructive mb-1" />
          <p className="text-xs text-center text-destructive/90">
            {error.message}
          </p>
        </div>
      )}
      
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onError={handleImageError}
          onLoad={handleLoad}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full h-auto object-contain transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      )}
    </div>
  );
}
