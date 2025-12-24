import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const authService = {
  signUp: (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass),
  signIn: (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass),
  logout: () => signOut(auth),
  signInWithGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),
};