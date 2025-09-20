import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/services/cloudinaryService';
import { Review, CreateReviewData, UpdateReviewData, ReviewStatus, ReviewFilters } from '@/types/review';

const COLLECTION_NAME = 'reviews';

// Convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp;
};

// Upload image to Cloudinary
export const uploadReviewImage = async (file: File): Promise<string> => {
  try {
    const imageUrl = await uploadToCloudinary(file);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading review image:', error);
    throw new Error('Failed to upload image');
  }
};

// Create a new review (for client submission)
export const createReview = async (reviewData: CreateReviewData, imageFile?: File): Promise<string> => {
  try {
    const docData = {
      ...reviewData,
      status: 'pending' as ReviewStatus,
      submittedAt: serverTimestamp(),
      isPublic: false,
      image: reviewData.image || '', // Will be updated if image is uploaded
      tags: []
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    
    // Upload image if provided
    if (imageFile) {
      const imageUrl = await uploadReviewImage(imageFile);
      await updateDoc(docRef, { image: imageUrl });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to submit review');
  }
};

// Create review from admin (already approved)
export const createAdminReview = async (reviewData: CreateReviewData, imageFile?: File): Promise<string> => {
  try {
    const docData = {
      ...reviewData,
      status: 'approved' as ReviewStatus,
      submittedAt: serverTimestamp(),
      reviewedAt: serverTimestamp(),
      reviewedBy: 'admin',
      isPublic: true,
      image: reviewData.image || '',
      tags: []
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    
    // Upload image if provided
    if (imageFile) {
      const imageUrl = await uploadReviewImage(imageFile);
      await updateDoc(docRef, { image: imageUrl });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating admin review:', error);
    throw new Error('Failed to create review');
  }
};

// Get all reviews with optional filters
export const getReviews = async (filters?: ReviewFilters): Promise<Review[]> => {
  try {
    let q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));

    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters?.rating) {
      q = query(q, where('rating', '==', filters.rating));
    }

    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data,
        submittedAt: convertTimestamp(data.submittedAt),
        reviewedAt: data.reviewedAt ? convertTimestamp(data.reviewedAt) : undefined,
      } as Review);
    });

    // Apply client-side filtering for search and project type
    let filteredReviews = reviews;

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredReviews = filteredReviews.filter(review =>
        review.name.toLowerCase().includes(searchLower) ||
        review.company.toLowerCase().includes(searchLower) ||
        review.content.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.projectType) {
      filteredReviews = filteredReviews.filter(review =>
        review.projectType === filters.projectType
      );
    }

    return filteredReviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};

// Get approved reviews for public display
export const getApprovedReviews = async (): Promise<Review[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('status', '==', 'approved'),
      where('isPublic', '==', true),
      orderBy('reviewedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data,
        submittedAt: convertTimestamp(data.submittedAt),
        reviewedAt: data.reviewedAt ? convertTimestamp(data.reviewedAt) : undefined,
      } as Review);
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    throw new Error('Failed to fetch approved reviews');
  }
};

// Get single review by ID
export const getReview = async (id: string): Promise<Review | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        submittedAt: convertTimestamp(data.submittedAt),
        reviewedAt: data.reviewedAt ? convertTimestamp(data.reviewedAt) : undefined,
      } as Review;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching review:', error);
    throw new Error('Failed to fetch review');
  }
};

// Update review
export const updateReview = async (
  id: string, 
  updateData: UpdateReviewData, 
  imageFile?: File,
  removeImage: boolean = false
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    
    // Handle image updates
    if (removeImage) {
      updateData.image = '';
    } else if (imageFile) {
      const imageUrl = await uploadReviewImage(imageFile);
      updateData.image = imageUrl;
    }

    // Add review metadata if status is being changed to approved
    if (updateData.status === 'approved') {
      updateData.reviewedAt = serverTimestamp() as any;
      updateData.reviewedBy = 'admin';
      updateData.isPublic = true;
    } else if (updateData.status === 'rejected') {
      updateData.reviewedAt = serverTimestamp() as any;
      updateData.reviewedBy = 'admin';
      updateData.isPublic = false;
    }

    await updateDoc(docRef, updateData as any);
  } catch (error) {
    console.error('Error updating review:', error);
    throw new Error('Failed to update review');
  }
};

// Delete review
export const deleteReview = async (id: string): Promise<void> => {
  try {
    // No need to delete images from Cloudinary manually - they can be managed through Cloudinary dashboard
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error('Failed to delete review');
  }
};

// Approve review
export const approveReview = async (id: string): Promise<void> => {
  await updateReview(id, { status: 'approved' });
};

// Reject review
export const rejectReview = async (id: string): Promise<void> => {
  await updateReview(id, { status: 'rejected' });
};

// Get review statistics
export const getReviewStats = async () => {
  try {
    const reviews = await getReviews();
    
    const stats = {
      total: reviews.length,
      pending: reviews.filter(r => r.status === 'pending').length,
      approved: reviews.filter(r => r.status === 'approved').length,
      rejected: reviews.filter(r => r.status === 'rejected').length,
      averageRating: reviews.length > 0 
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
        : 0
    };

    return stats;
  } catch (error) {
    console.error('Error getting review stats:', error);
    throw new Error('Failed to get review statistics');
  }
};