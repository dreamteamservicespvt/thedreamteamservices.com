import axios from "axios";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

export const getOptimizedImageUrl = (url: string, width = 500) => {
  if (!url) return '';
  
  // Check if it's a Cloudinary URL
  if (url.includes('cloudinary.com')) {
    // Insert transformation parameters
    return url.replace('/upload/', `/upload/w_${width},c_scale/`);
  }
  
  return url;
};
