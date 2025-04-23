class ApiError extends Error {
  status?: number;
  data?: any;
  
  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use text instead
      errorData = await response.text();
    }
    
    throw new ApiError(
      errorData?.message || `API request failed with status ${response.status}`,
      response.status,
      errorData
    );
  }
  
  try {
    return await response.json() as T;
  } catch (error) {
    throw new ApiError(
      'Failed to parse API response',
      response.status,
      error instanceof Error ? error.message : String(error)
    );
  }
};

export const fetchWithErrorHandling = async <T>(
  url: string, 
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    return await handleApiResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Network request failed',
      0,
      error instanceof Error ? error.message : String(error)
    );
  }
};

// Utility function to safely extract error messages from any error type
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object') {
    if ('message' in error) {
      return String((error as any).message);
    }
  }
  
  return 'An unknown error occurred';
};
