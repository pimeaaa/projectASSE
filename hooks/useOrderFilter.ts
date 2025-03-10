import { StatusType } from "@/config/types";
import { useState } from "react";
import { Order } from "./useOrders";

export function useOrderFilter(orders: Order[]) {
  // Dynamically determine available statuses
  const availableStatuses: StatusType[] = [
    ...new Set(orders.map((order) => order.status)),
  ];

  // If there's only one status, default to it
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(
    availableStatuses.length > 0 ? availableStatuses[0] : "pending"
  );

  const filteredOrders = orders.filter(
    (order) => order.status === selectedStatus
  );

  return {
    selectedStatus,
    setSelectedStatus,
    filteredOrders,
    availableStatuses, // Only show available filters
  };
}
