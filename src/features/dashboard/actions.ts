"use server"
import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function createFolderAction(name: string, userId: string) {
  try {
    await addDoc(collection(db, "folders"), {
      name,
      content: "", 
      userId,
      parentId: null,
      createdAt: serverTimestamp(),
      color: "bg-indigo-500",
      items: 0,
      trend: "Just Started"
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (e) { return { success: false }; }
}

export async function updateFolderContentAction(folderId: string, content: string) {
  try {
    await updateDoc(doc(db, "folders", folderId), { 
      content, 
      updatedAt: serverTimestamp(),
      trend: "Recently Updated" 
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (e) { return { success: false }; }
}

export async function deleteFolderAction(folderId: string) {
  try {
    await deleteDoc(doc(db, "folders", folderId));
    revalidatePath("/dashboard");
    return { success: true };
  } catch (e) { return { success: false }; }
}

export async function seedSamplesAction(userId: string) {
  const samples = [
    { name: '2025 Vision', color: 'bg-indigo-500', items: 12, trend: '+2 this week' },
    { name: 'Startup Launch', color: 'bg-purple-500', items: 8, trend: 'Active' },
    { name: 'Personal Growth', color: 'bg-emerald-500', items: 5, trend: 'Updated' }
  ];

  try {
    for (const sample of samples) {
      await addDoc(collection(db, "folders"), {
        ...sample,
        userId,
        content: `Welcome to your ${sample.name} roadmap! This is a sample plan. Feel free to edit or delete it.`,
        parentId: null,
        createdAt: serverTimestamp(),
      });
    }
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}