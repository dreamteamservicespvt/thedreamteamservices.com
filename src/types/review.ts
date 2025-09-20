export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number; // 1-5 stars
  status: ReviewStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  isPublic: boolean;
  tags?: string[]; // e.g., ['web-development', 'mobile-app']
  projectType?: string; // type of service they received
}

export interface CreateReviewData {
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
  projectType?: string;
}

export interface UpdateReviewData {
  name?: string;
  position?: string;
  company?: string;
  content?: string;
  image?: string;
  rating?: number;
  status?: ReviewStatus;
  isPublic?: boolean;
  tags?: string[];
  projectType?: string;
  reviewedAt?: any; // Firebase serverTimestamp
  reviewedBy?: string;
}

export interface ReviewFilters {
  status?: ReviewStatus;
  rating?: number;
  projectType?: string;
  search?: string;
}