import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project, ProjectFormData } from "@/types/project";
import { uploadToCloudinary } from "./cloudinaryService";

const COLLECTION_NAME = "projects";

// Get all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    
    const snapshot = await getDocs(projectsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
}

// Get a single project by ID
export async function getProject(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Project;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
}

// Create a new project with Cloudinary image upload
export async function createProject(projectData: ProjectFormData, imageFile?: File): Promise<Project> {
  try {
    let imageUrl = projectData.image;
    
    // If there's a new image file, upload to Cloudinary first
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile);
    }
    
    const newProjectData = {
      ...projectData,
      image: imageUrl,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newProjectData);
    
    return {
      id: docRef.id,
      ...newProjectData
    } as Project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Update an existing project with optional new Cloudinary image
export async function updateProject(id: string, projectData: Partial<ProjectFormData>, imageFile?: File): Promise<void> {
  try {
    const updates: Record<string, any> = { ...projectData };
    
    // If there's a new image file, upload to Cloudinary first
    if (imageFile) {
      updates.image = await uploadToCloudinary(imageFile);
    }
    
    updates.updatedAt = new Date();
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
