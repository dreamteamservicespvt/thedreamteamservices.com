import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  getDoc, 
  serverTimestamp,
  where 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Inquiry } from "@/types/inquiry";

const COLLECTION_NAME = "inquiries";

// Create a new inquiry from contact form
export async function createInquiry(inquiry: Omit<Inquiry, "id" | "status" | "createdAt">): Promise<Inquiry> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...inquiry,
    status: "new",
    createdAt: new Date()
  });
  
  return {
    id: docRef.id,
    ...inquiry,
    status: "new",
    createdAt: new Date()
  } as Inquiry;
}

// Helper function to safely convert Firestore timestamps
const convertTimestamp = (timestamp: any): Date | null => {
  if (!timestamp) return null;
  
  // Handle Firestore Timestamp objects
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  
  // Handle serialized timestamps or Date objects
  if (timestamp instanceof Date || (typeof timestamp === 'object' && 'seconds' in timestamp)) {
    try {
      // Try to construct a date from seconds and nanoseconds if available
      if ('seconds' in timestamp && 'nanoseconds' in timestamp) {
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      }
      // Otherwise treat as Date
      return new Date(timestamp);
    } catch (e) {
      console.error('Error converting timestamp:', e);
      return null;
    }
  }
  
  // Handle string dates
  if (typeof timestamp === 'string') {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? null : date;
  }
  
  return null;
};

// Get all inquiries with optional filtering
export async function getInquiries(status?: string): Promise<Inquiry[]> {
  let inquiriesQuery;
  
  if (status && status !== "all") {
    inquiriesQuery = query(
      collection(db, COLLECTION_NAME),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
  } else {
    inquiriesQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
  }
  
  const snapshot = await getDocs(inquiriesQuery);
  return snapshot.docs.map(doc => {
    // Type assertion to solve the TypeScript errors
    const data = doc.data() as Record<string, any>;
    const createdAtDate = convertTimestamp(data.createdAt);
    const updatedAtDate = convertTimestamp(data.updatedAt);
    
    return {
      id: doc.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      status: data.status || 'new',
      createdAt: createdAtDate || new Date(),
      updatedAt: updatedAtDate || null,
    } as Inquiry;
  });
}

// Get a single inquiry by ID
export async function getInquiry(id: string): Promise<Inquiry | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    // Type assertion to solve the TypeScript errors
    const data = docSnap.data() as Record<string, any>;
    const createdAtDate = convertTimestamp(data.createdAt);
    const updatedAtDate = convertTimestamp(data.updatedAt);
    
    return {
      id: docSnap.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      status: data.status || 'new',
      createdAt: createdAtDate || new Date(),
      updatedAt: updatedAtDate || null,
    } as Inquiry;
  }
  
  return null;
}

// Update inquiry status
export async function updateInquiryStatus(id: string, status: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    status,
    updatedAt: new Date()
  });
}

// Add this function to match the import in Inquiries.tsx
export async function updateInquiry(id: string, updates: { status?: string, response?: string }): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  
  const updateData = {
    ...updates,
    updatedAt: new Date()
  };
  
  await updateDoc(docRef, updateData);
}

export const deleteInquiry = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    throw error;
  }
};
