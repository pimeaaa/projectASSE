// hooks/useInventoryItems.ts
import { db } from "@/app/config/firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type InventoryItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  createdAt:
    | { seconds: number; nanoseconds: number }
    | import("firebase/firestore").FieldValue;
};

export function useInventoryItems(category: string) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Query inventory collection for this category, descending by createdAt
    const q = query(
      collection(db, "inventory"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || { seconds: 0, nanoseconds: 0 },
      })) as InventoryItem[];

      setItems(itemList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  return { items, setItems, loading };
}
