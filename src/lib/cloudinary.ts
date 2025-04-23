import axios, { AxiosError } from "axios";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

type CloudinaryUploadOptions = {
  maxSizeMB?: number;
  maxRetries?: number;
}

class CloudinaryError extends Error {
  status?: number;
  details?: string;

  constructor(message: string, status?: number, details?: string) {
    super(message);
    this.name = 'CloudinaryError';
    this.status = status;
    this.details = details;
  }
}

export const uploadToCloudinary = async (
  file: File, 
  options: CloudinaryUploadOptions = {}
): Promise<string> => {
  const { maxSizeMB = 10, maxRetries = 2 } = options;
  
  // Validate file
  if (!file) {
    throw new CloudinaryError("No file provided for upload");
  }
  
  // Validate file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    throw new CloudinaryError(
      `File size exceeds the maximum limit of ${maxSizeMB}MB`,
      413,
      `File size: ${fileSizeMB.toFixed(2)}MB`
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  let attempts = 0;
  let lastError: unknown;

  while (attempts < maxRetries) {
    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      
      if (!response.data || !response.data.secure_url) {
        throw new CloudinaryError(
          "Invalid response from Cloudinary",
          response.status,
          "Response did not contain the expected secure_url"
        );
      }
      
      return response.data.secure_url;
    } catch (error) {
      attempts++;
      lastError = error;
      
      if (attempts < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }

  // Format the error for consistent handling
  if (lastError instanceof AxiosError) {
    const status = lastError.response?.status;
    const details = lastError.response?.data?.error?.message || lastError.message;
    
    throw new CloudinaryError(
      "Failed to upload image to Cloudinary",
      status,
      details
    );
  }
  
  throw new CloudinaryError(
    "Failed to upload image after multiple attempts",
    500,
    lastError instanceof Error ? lastError.message : String(lastError)
  );
};

export const getOptimizedImageUrl = (url: string, options?: {
  width?: number;
  height?: number;
  format?: 'webp' | 'auto' | 'jpg' | 'png';
  quality?: number;
}) => {
  if (!url) return '';
  
  try {
    const {
      width = 800,
      height,
      format = 'webp',
      quality = 80
    } = options || {};
    
    // Check if it's a Cloudinary URL
    if (url.includes('cloudinary.com')) {
      let transformations = `f_${format},q_${quality},dpr_auto`;
      
      if (width) {
        transformations += `,w_${width}`;
      }
      
      if (height) {
        transformations += `,h_${height}`;
      }
      
      // Insert transformation parameters
      return url.replace('/upload/', `/upload/${transformations}/`);
    }
    
    return url;
  } catch (error) {
    console.error("Error optimizing image URL:", error);
    return url; // Return original URL in case of error
  }
};
