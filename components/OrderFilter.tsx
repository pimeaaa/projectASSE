import { StatusType } from "@/app/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../app/styles/orderStyles";

interface Props {
  selectedStatus: StatusType;
  setSelectedStatus: (status: StatusType) => void;
  availableStatuses: StatusType[]; // Only show available statuses
}

export function OrderFilter({
  selectedStatus,
  setSelectedStatus,
  availableStatuses,
}: Props) {
  const filters: {
    status: StatusType;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }[] = [
    { status: "paid", label: "Paid", icon: "check-circle" },
    { status: "unpaid", label: "Unpaid", icon: "money-off" },
    { status: "pending", label: "Pending", icon: "schedule" },
    { status: "canceled", label: "Canceled", icon: "block" },
  ];

  // Hide filters if there's no data
  if (availableStatuses.length <= 1) return null;

  return (
    <View style={styles.filterContainer}>
      {filters
        .filter(({ status }) => availableStatuses.includes(status)) // Only show active statuses
        .map(({ status, label, icon }) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              selectedStatus === status
                ? styles[`filter_${status}`]
                : styles.filterButtonUnselected,
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <MaterialIcons
              name={icon}
              size={18}
              color={styles[`filterText_${status}`]?.color}
            />
            <Text style={[styles.filterText]}>{label}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}
