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

const INQUIRIES_COLLECTION = "inquiries";

export const createInquiry = async (inquiryData: Omit<Inquiry, "id" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
      ...inquiryData,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...inquiryData, status: 'new' };
  } catch (error) {
    console.error("Error adding inquiry:", error);
    throw error;
  }
};

export const getInquiries = async (): Promise<Inquiry[]> => {
  try {
    const q = query(collection(db, INQUIRIES_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Inquiry[];
  } catch (error) {
    console.error("Error getting inquiries:", error);
    throw error;
  }
};

export const getInquiry = async (id: string): Promise<Inquiry> => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Inquiry;
    } else {
      throw new Error("Inquiry not found");
    }
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
};

export const updateInquiry = async (id: string, inquiryData: Partial<Inquiry>): Promise<Inquiry> => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await updateDoc(docRef, {
      ...inquiryData,
      updatedAt: serverTimestamp()
    });
    return { id, ...inquiryData } as Inquiry;
  } catch (error) {
    console.error("Error updating inquiry:", error);
    throw error;
  }
};

export const deleteInquiry = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    throw error;
  }
};

export const getInquiriesByStatus = async (status: string): Promise<Inquiry[]> => {
  try {
    const q = query(
      collection(db, INQUIRIES_COLLECTION),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Inquiry[];
  } catch (error) {
    console.error(`Error getting inquiries with status ${status}:`, error);
    throw error;
  }
};
