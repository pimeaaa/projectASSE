// hooks/useInventoryActions.ts
import { db } from "@/app/config/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { InventoryItem } from "./useInventoryItems";

export function useInventoryActions(
  setItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
) {
  // Create a new item in Firestore
  const addItem = async (category: string, name: string, price: number) => {
    try {
      const newItem = {
        category,
        name,
        price,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "inventory"), newItem);
      // Update local state
      setItems((prev) => [{ id: docRef.id, ...newItem }, ...prev]);

      console.log("Item added:", docRef.id);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update an existing item in Firestore
  const updateItem = async (
    itemId: string,
    updated: Partial<Pick<InventoryItem, "name" | "price">>
  ) => {
    try {
      const itemRef = doc(db, "inventory", itemId);
      await updateDoc(itemRef, updated);

      // Update local state
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, ...updated } : item
        )
      );

      console.log("Item updated:", itemId);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item from Firestore
  const deleteItem = async (itemId: string) => {
    try {
      const itemRef = doc(db, "inventory", itemId);
      await deleteDoc(itemRef);

      // Update local state
      setItems((prev) => prev.filter((item) => item.id !== itemId));

      console.log("Item deleted:", itemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return { addItem, updateItem, deleteItem };
}
