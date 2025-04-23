import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
}

export function ErrorDisplay({
  title = "Something went wrong",
  message,
  details,
  onRetry,
  className,
  compact = false
}: ErrorDisplayProps) {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-destructive p-2 rounded-md border border-destructive/20 bg-destructive/10", className)}>
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
        {onRetry && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-1 ml-auto" 
            onClick={onRetry}
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("p-4 rounded-md border border-destructive/20 bg-destructive/10", className)}>
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <h3 className="font-medium text-destructive">{title}</h3>
      </div>
      <p className="text-destructive/90 mb-2">{message}</p>
      {details && (
        <details className="mt-2 text-sm text-destructive/70">
          <summary className="cursor-pointer">Technical details</summary>
          <pre className="mt-2 whitespace-pre-wrap text-xs bg-destructive/5 p-2 rounded overflow-auto max-h-40">
            {details}
          </pre>
        </details>
      )}
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 border-destructive/30 text-destructive hover:bg-destructive/10" 
          onClick={onRetry}
        >
          <RefreshCw className="h-3 w-3 mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
}
