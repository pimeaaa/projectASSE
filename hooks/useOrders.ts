import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";

export type Order = {
  id: string;
  orderId: string;
  status: "pending" | "paid" | "unpaid" | "canceled";
  items: { name: string; quantity: number }[];
  total: number;
  archived: boolean;
  createdAt: { seconds: number; nanoseconds: number }; // Firestore Timestamp
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || { seconds: 0, nanoseconds: 0 }, // Default if missing
      })) as Order[];
      setOrders(orderList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { orders, setOrders, loading };
}
