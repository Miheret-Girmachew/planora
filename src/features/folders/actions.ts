"use server"
import { db } from "@/lib/firebase";
import { revalidatePath } from "next/cache"; 
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";

export async function createFolderAction(name: string, userId: string) {
  try {
    const docRef = await addDoc(collection(db, "folders"), {
      name,
      content: "",
      userId,
      parentId: null, 
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      color: "bg-indigo-500",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating folder:", error);
    return { success: false };
  }
}

export async function updateFolderContentAction(folderId: string, content: string) {
  try {
    const folderRef = doc(db, "folders", folderId);
    await updateDoc(folderRef, { 
      content, 
      updatedAt: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteFolderAction(folderId: string) {


  try {
    const folderRef = doc(db, "folders", folderId);
    await deleteDoc(folderRef);

    revalidatePath("/dashboard"); 

    return { success: true, message: "Folder deleted successfully" };
  } catch (error) {
    return { success: false, error: "Failed to delete folder. Please try again." };
  }

}