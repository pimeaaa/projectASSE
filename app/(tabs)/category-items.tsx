import { categoryItemsStyles as styles } from "@/app/styles/categoryItemsStyles";
import { useInventoryActions } from "@/hooks/useInventoryActions";
import { useInventoryItems } from "@/hooks/useInventoryItems";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Category SVGs
import CloseIcon from "@/assets/icons/close.svg";
import CoffeeIcon from "@/assets/icons/coffee.svg";
import JuiceIcon from "@/assets/icons/juice.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import PastriesIcon from "@/assets/icons/pasteries.svg";
import SodaIcon from "@/assets/icons/soda.svg";
import TeaIcon from "@/assets/icons/tea.svg";
import DeleteIcon from "@/assets/icons/trash.svg";
import WaterIcon from "@/assets/icons/water.svg";
import EditIcon from "@/assets/icons/write.svg";

const iconsMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  coffee: CoffeeIcon,
  tea: TeaIcon,
  soda: SodaIcon,
  juice: JuiceIcon,
  water: WaterIcon,
  pastries: PastriesIcon,
  menu: MenuIcon,
};

export default function CategoryItemsScreen() {
  // 1) Always call hooks in the same order
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();

  // Provide a fallback so the hooks below never get skipped
  // (This prevents a conditional hook order mismatch.)
  const safeCategory = category ?? "unknown";

  // Firestore data
  const { items, setItems, loading } = useInventoryItems(safeCategory);
  const { addItem, updateItem, deleteItem } = useInventoryActions(setItems);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  // Form fields
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // If category was truly not passed, we show a placeholder
  if (!category) {
    return (
      <>
        {/* 2) We declare a Stack.Screen to set the top bar’s title */}
        <Stack.Screen
          options={{ title: "Inventory", headerTitleAlign: "center" }}
        />
        <View style={styles.centered}>
          <Text>No category provided!</Text>
        </View>
      </>
    );
  }

  // Hooks are already called above, so no mismatch.

  // 2) We set the screen title with <Stack.Screen>
  //    instead of router.setOptions:
  return (
    <>
      <Stack.Screen
        options={{ title: "Inventory", headerTitleAlign: "center" }}
      />

      <CategoryItemsContent
        category={category}
        items={items}
        loading={loading}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentItemId={currentItemId}
        setCurrentItemId={setCurrentItemId}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        itemName={itemName}
        setItemName={setItemName}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
      />
    </>
  );
}

/**
 * Extracted the main UI into a child component so we can still
 * conditionally render above (for the "no category" case)
 * without messing up the hooks order.
 */
function CategoryItemsContent(props: {
  category: string;
  items: any[];
  loading: boolean;
  addItem: (cat: string, name: string, price: number) => Promise<void>;
  updateItem: (id: string, data: any) => Promise<void>;
  deleteItem: (id: string) => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  currentItemId: string | null;
  setCurrentItemId: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  itemName: string;
  setItemName: React.Dispatch<React.SetStateAction<string>>;
  itemPrice: string;
  setItemPrice: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    category,
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    modalVisible,
    setModalVisible,
    isEditing,
    setIsEditing,
    currentItemId,
    setCurrentItemId,
    setErrorMessage,
    errorMessage,
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
  } = props;

  // Helpers
  function resetForm() {
    setItemName("");
    setItemPrice("");
    setCurrentItemId(null);
    setIsEditing(false);
  }

  function handleAddNew() {
    resetForm();
    setModalVisible(true);
  }

  function handleConfirmAdd() {
    if (!itemName.trim()) {
      setErrorMessage("Please enter a name.");
      return;
    }
    if (!itemPrice.trim()) {
      setErrorMessage("Please enter a price.");
      return;
    }

    if (!itemName.trim() || !itemPrice.trim()) {
      Alert.alert("Error", "Please enter name and price");
      return;
    }
    // close modal immediately, then add
    setModalVisible(false);
    addItem(category, itemName.trim(), parseFloat(itemPrice));
  }

  function handleEdit(id: string, name: string, price: number) {
    setCurrentItemId(id);
    setItemName(name);
    setItemPrice(String(price));
    setIsEditing(true);
    setModalVisible(true);
  }

  function handleConfirmEdit() {
    if (!itemName.trim()) {
      setErrorMessage("Please enter a name.");
      return;
    }
    if (!itemPrice.trim()) {
      setErrorMessage("Please enter a price.");
      return;
    }

    if (!itemName.trim() || !itemPrice.trim() || !currentItemId) {
      Alert.alert("Error", "Please enter valid name and price");
      return;
    }
    // close modal immediately, then update
    setModalVisible(false);
    updateItem(currentItemId, {
      name: itemName.trim(),
      price: parseFloat(itemPrice),
    });
  }

  function handleDelete(id: string) {
    Alert.alert("Confirm", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => deleteItem(id),
      },
    ]);
  }

  const CategorySVG = iconsMap[category] || MenuIcon;

  // item card
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemIconWrapper}>
          <CategorySVG width={32} height={32} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemCategory}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price} MAD</Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(item.id, item.name, item.price)}
          >
            <EditIcon width={24} height={24} color="#5C5C5C" />
          </TouchableOpacity>
          {/* vertical separator */}
          <View style={styles.actionSeparator} />
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(item.id)}
          >
            <DeleteIcon width={24} height={24} color="#5C5C5C" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isEmpty = items.length === 0;
  const HeaderSVG = iconsMap[category] || MenuIcon;

  return (
    <View style={styles.container}>
      {/* Category Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <HeaderSVG width={18} height={18} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </View>

        {!isEmpty && (
          <TouchableOpacity style={styles.addItemButton} onPress={handleAddNew}>
            <MaterialIcons
              name="add"
              size={24}
              color="#5C5C5C"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.addItemButtonText}>Add an item</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.headerSeparator} />

      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>You have 0 items</Text>
          <TouchableOpacity style={styles.addItemButton} onPress={handleAddNew}>
            <MaterialIcons
              name="add"
              size={24}
              color="#5C5C5C"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.addItemButtonText}>Add an item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      )}

      {/* Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            {/* Header: Icon, Title, and X button */}
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CategorySVG
                  width={24}
                  height={24}
                  style={{ marginRight: 8 }}
                />

                <Text style={styles.modalHeaderTitle}>
                  {category?.charAt(0).toUpperCase() + category?.slice(1)}
                </Text>
              </View>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <CloseIcon width={24} height={24} color="#5C5C5C" />
              </Pressable>
            </View>

            {/* Body / Form */}
            <View style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholder="eg. Espresso"
                placeholderTextColor="#B8B8B8"
                value={itemName}
                onChangeText={setItemName}
              />
              <TextInput
                style={styles.input}
                placeholder="12 MAD"
                placeholderTextColor="#B8B8B8"
                keyboardType="numeric"
                value={itemPrice}
                onChangeText={setItemPrice}
              />

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              {/* Validate Button */}
              <TouchableOpacity
                style={styles.validateButton}
                onPress={isEditing ? handleConfirmEdit : handleConfirmAdd}
              >
                <MaterialIcons name="check" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
