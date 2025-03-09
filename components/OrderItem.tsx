import { StatusType } from "@/app/types";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../app/styles/orderStyles";
import { Order } from "../hooks/useOrders";

interface Props {
  order: Order;
  updateOrderStatus: (
    id: string,
    status: StatusType,
    role: "manager" | "staff"
  ) => void;
  role: "manager" | "staff";
}

const buttonStylesMap: Record<StatusType, any> = {
  pending: styles.pendingButton,
  paid: styles.paidButton,
  unpaid: styles.unpaidButton,
  canceled: styles.canceledButton,
};

// Map order status to the correct icons
const statusIconMap: Record<StatusType, keyof typeof MaterialIcons.glyphMap> = {
  pending: "schedule",
  paid: "check-circle",
  unpaid: "money-off",
  canceled: "cancel",
};

// Order status transitions
const availableTransitionsMap: Record<
  StatusType,
  {
    status: StatusType;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }[]
> = {
  pending: [
    { status: "paid", label: "Paid", icon: "check-circle" },
    { status: "unpaid", label: "Unpaid", icon: "money-off" },
    { status: "canceled", label: "Cancel", icon: "cancel" },
  ],
  unpaid: [{ status: "paid", label: "Mark as Paid", icon: "check-circle" }],
  paid: [{ status: "unpaid", label: "Revert to Unpaid", icon: "money-off" }],
  canceled: [],
};

export function OrderItem({ order, updateOrderStatus, role }: Props) {
  let createdAt = order.createdAt?.seconds
    ? new Date(order.createdAt.seconds * 1000)
    : null;

  let formattedDate = createdAt ? format(createdAt, "dd/MM/yyyy") : "N/A";
  let formattedTime = createdAt ? format(createdAt, "HH:mm") : "N/A";

  const availableTransitions = availableTransitionsMap[order.status] || [];

  return (
    <View style={styles.orderCard}>
      {/* Order status */}
      <View style={styles.orderHeader}>
        <View
          style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}
        >
          <MaterialIcons
            name={statusIconMap[order.status]}
            size={16}
            color="#fff"
          />
          <Text style={styles.statusText}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
        <MaterialIcons name="more-horiz" size={20} color="#3E2723" />
      </View>

      {/* Metadata */}
      <View style={styles.orderMetadata}>
        <View style={styles.metadataItem}>
          <MaterialIcons name="receipt" size={16} color="#5C5C5C" />
          <Text style={styles.metadataText}>{order.orderId}</Text>
        </View>
        <View style={styles.metadataItem}>
          <MaterialIcons name="schedule" size={14} color="#5C5C5C" />
          <Text style={styles.metadataText}>{formattedTime}</Text>
        </View>
        <View style={styles.metadataItem}>
          <MaterialIcons name="event" size={14} color="#5C5C5C" />
          <Text style={styles.metadataText}>{formattedDate}</Text>
        </View>
      </View>

      {/* List of order items */}
      <FlatList
        data={order.items}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.orderItem}>
            • {item.quantity}x {item.name}
          </Text>
        )}
      />

      {/* Footer */}
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotalLabel}>Total</Text>
        <Text style={styles.orderTotal}>{order.total.toFixed(2)} MAD</Text>
      </View>

      {/* Order actions */}
      {availableTransitions.length > 0 && (
        <View style={styles.buttonContainer}>
          {availableTransitions.map(({ status, label, icon }) => (
            <TouchableOpacity
              key={status}
              style={[styles.actionButton, buttonStylesMap[status]]}
              onPress={() => updateOrderStatus(order.id, status, role)}
            >
              <MaterialIcons name={icon} size={16} color="#fff" />
              <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
