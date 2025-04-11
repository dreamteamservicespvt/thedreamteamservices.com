import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TeamMember, TeamMemberFormData } from "@/types/team";
import { uploadToCloudinary } from "./cloudinaryService";

const COLLECTION_NAME = "team-members";

// Get all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamMembersQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    
    const snapshot = await getDocs(teamMembersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TeamMember));
  } catch (error) {
    console.error("Error getting team members:", error);
    throw error;
  }
}

// Get a single team member by ID
export async function getTeamMember(id: string): Promise<TeamMember | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as TeamMember;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting team member:", error);
    throw error;
  }
}

// Create a new team member with Cloudinary image upload
export async function createTeamMember(teamMemberData: TeamMemberFormData, imageFile?: File): Promise<TeamMember> {
  try {
    let imageUrl = teamMemberData.image;
    
    // If an image file is provided, upload it to Cloudinary
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile);
    }
    
    const teamMember = {
      ...teamMemberData,
      image: imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), teamMember);
    
    return {
      id: docRef.id,
      ...teamMember
    };
  } catch (error) {
    console.error("Error creating team member:", error);
    throw error;
  }
}

// Update an existing team member with optional new Cloudinary image
export async function updateTeamMember(id: string, teamMemberData: Partial<TeamMemberFormData>, imageFile?: File): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    let updateData = { ...teamMemberData, updatedAt: new Date() };
    
    // If an image file is provided, upload it to Cloudinary
    if (imageFile) {
      const imageUrl = await uploadToCloudinary(imageFile);
      updateData.image = imageUrl;
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating team member:", error);
    throw error;
  }
}

// Delete a team member
export async function deleteTeamMember(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
}
