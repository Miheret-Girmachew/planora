import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const authService = {
  signIn: async (email: string, pass: string) => {
    return await signInWithEmailAndPassword(auth, email, pass);
  },

  signUp: async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  },

  logout: async () => {
    return await signOut(auth);
  }
};