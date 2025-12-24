"use client"
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export function useFolders(userId: string | undefined, authLoading: boolean) {
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      setLoading(false);
      return;
    }

    console.log("Fetching folders for UID:", userId);

    const q = query(
      collection(db, "folders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const folderData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFolders(folderData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore Listener Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, authLoading]);

  return { folders, loading };
}