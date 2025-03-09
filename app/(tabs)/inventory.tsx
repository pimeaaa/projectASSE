import { InventoryCategory } from "@/components/InventoryCategory";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../styles/common";
import { styles } from "../styles/inventoryStyles"; // Reuse styles if applicable

const categories = [
  { key: "coffee", label: "Coffee" },
  { key: "tea", label: "Tea" },
  { key: "soda", label: "Soda" },
  { key: "juice", label: "Juice" },
  { key: "water", label: "Water" },
  { key: "pastries", label: "Pastries" },
  { key: "menu", label: "Menu" },
];

export default function InventoryScreen() {
  return (
    <View style={commonStyles.container}>
      <Text style={styles.title}>Choose a Category</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.key}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={
              (styles.item,
              index === categories.length - 1 ? styles.lastItem : {})
            }
          >
            <InventoryCategory category={item.key as any} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
