import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ErrorState {
  hasError: boolean;
  message: string;
  details?: string;
}

export function useErrorHandler() {
  const { toast } = useToast();
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    message: '',
  });

  const handleError = useCallback((error: unknown, fallbackMessage = "An unexpected error occurred") => {
    console.error("Error caught by useErrorHandler:", error);
    
    let message = fallbackMessage;
    let details = '';
    
    if (error instanceof Error) {
      message = error.message || fallbackMessage;
      details = error.stack || '';
    } else if (typeof error === 'string') {
      message = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      // Handle API error objects
      message = String((error as any).message);
      if ('details' in error) {
        details = String((error as any).details);
      }
    }

    setErrorState({
      hasError: true,
      message,
      details
    });

    // Show a toast notification for the error
    toast({
      variant: "destructive",
      title: "Error",
      description: message.length > 100 ? message.substring(0, 97) + '...' : message,
    });

    return { message, details };
  }, [toast]);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      message: '',
    });
  }, []);

  return {
    ...errorState,
    handleError,
    clearError
  };
}
