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
  Timestamp, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/project";

const PROJECTS_COLLECTION = "projects";

export const createProject = async (projectData: Omit<Project, "id">) => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...projectData };
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProject = async (id: string): Promise<Project> => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Project not found");
    }
    
    return { 
      id: docSnap.id, 
      ...docSnap.data() 
    } as Project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id, ...data };
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
