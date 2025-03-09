import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../app/config/firebaseConfig";
import { Order } from "./useOrders";

// Function to generate the next order ID
async function generateOrderId(): Promise<string> {
  const counterRef = doc(db, "metadata", "orderCounter");

  try {
    const counterSnap = await getDoc(counterRef);
    let nextOrderId = 1000; // Default starting order number

    if (counterSnap.exists()) {
      const currentOrderId = counterSnap.data().lastOrderId || 1000;
      nextOrderId = currentOrderId + 1;
    }

    await setDoc(counterRef, { lastOrderId: nextOrderId }, { merge: true });

    return `#${String(nextOrderId).padStart(6, "0")}`; // Format: #001000, #001001...
  } catch (error) {
    console.error("Error generating order ID:", error);
    return "#ERROR";
  }
}

export function useOrderActions(
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
) {
  const addOrder = async () => {
    try {
      const orderId = await generateOrderId(); // Fetch the next order ID

      const newOrder: Omit<Order, "id"> = {
        orderId, // Store incremental order ID
        status: "pending",
        items: [
          { name: "Cappuccino", quantity: 1 },
          { name: "Croissant", quantity: 2 },
        ],
        total: 42.99,
        archived: false,
        createdAt: serverTimestamp() as any,
      };

      const docRef = await addDoc(collection(db, "orders"), newOrder);

      setOrders((prevOrders) => [
        { id: docRef.id, ...newOrder },
        ...prevOrders,
      ]);

      console.log("Order added successfully:", docRef.id);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: "pending" | "paid" | "unpaid" | "canceled",
    role: "manager" | "staff"
  ) => {
    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      console.log(`Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return { addOrder, updateOrderStatus };
}
