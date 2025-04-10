import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  getDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ContactInquiry } from "@/types/contact";

const INQUIRIES_COLLECTION = "contactInquiries";

export const submitContactForm = async (formData: Omit<ContactInquiry, "id" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
      ...formData,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { id: docRef.id, ...formData, status: 'new' as const };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const getInquiries = async (filterStatus?: string): Promise<ContactInquiry[]> => {
  try {
    let q = query(collection(db, INQUIRIES_COLLECTION), orderBy("createdAt", "desc"));
    
    if (filterStatus && filterStatus !== 'all') {
      q = query(
        collection(db, INQUIRIES_COLLECTION), 
        where("status", "==", filterStatus),
        orderBy("createdAt", "desc")
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContactInquiry[];
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }
};

export const getInquiry = async (id: string): Promise<ContactInquiry> => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Inquiry not found");
    }
    
    return { 
      id: docSnap.id, 
      ...docSnap.data() 
    } as ContactInquiry;
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    throw error;
  }
};

export const updateInquiryStatus = async (id: string, status: 'new' | 'in-progress' | 'resolved') => {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { id, status };
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    throw error;
  }
};
