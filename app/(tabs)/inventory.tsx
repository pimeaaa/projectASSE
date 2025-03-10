import { InventoryCategory } from "@/components/InventoryCategory";
import { useCategories } from "@/hooks/useCategories";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../../styles/common";
import { styles } from "../../styles/inventoryStyles"; // Reuse styles if applicable

export default function InventoryScreen() {
  const router = useRouter();

  const { categories, loading } = useCategories();

  if (loading)
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <>
      <Stack.Screen
        options={{ title: "Inventory", headerTitleAlign: "center" }}
      />

      <View style={commonStyles.container}>
        <Text style={styles.title}>Choose a Category</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          numColumns={2}
          keyExtractor={(_item, index) => index.toString()}
          columnWrapperStyle={styles.row}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.item,
                index === categories.length - 1 ? styles.lastItem : {},
              ]}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/category-items",
                  params: { category: item.key },
                })
              }
            >
              <InventoryCategory category={item.key as any} />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
