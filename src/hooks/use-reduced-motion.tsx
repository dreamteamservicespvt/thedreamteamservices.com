import { useEffect, useState } from "react";

/**
 * Hook to determine if reduced motion should be enabled
 * This considers both user preferences and device performance
 * 
 * @returns boolean indicating if animations should be reduced
 */
export function useReducedMotion(): boolean {
  // Check for prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  // Check for low-end device (simplified heuristic)
  const [isLowEndDevice, setIsLowEndDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    // Basic device performance check
    const checkDevicePerformance = () => {
      // Check number of logical processors as one simple metric
      const lowMemory = (navigator as any).deviceMemory !== undefined && 
                        (navigator as any).deviceMemory < 4;
                        
      const lowCores = navigator.hardwareConcurrency !== undefined && 
                     navigator.hardwareConcurrency <= 4;
                     
      // Use a simple rendering test to check for GPU capability
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      const hasWeakGPU = !gl || gl.getSupportedExtensions()?.length < 10;
      
      // Determine if it's a low-end device
      setIsLowEndDevice(lowMemory || lowCores || hasWeakGPU);
    };
    
    checkDevicePerformance();
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Return true if either user prefers reduced motion or device is low-end
  return prefersReducedMotion || isLowEndDevice;
}
