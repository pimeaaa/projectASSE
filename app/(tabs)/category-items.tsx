import { useInventoryActions } from "@/hooks/useInventoryActions";
import { useInventoryItems } from "@/hooks/useInventoryItems";
import { categoryItemsStyles as styles } from "@/styles/categoryItemsStyles";
import { commonStyles } from "@/styles/common";

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
import ValidatedTextInput from "@/components/ValidationTextInput";
import { useValidation } from "@/hooks/useValidation";

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
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const safeCategory = category ?? "unknown";
  const { items, setItems, loading } = useInventoryItems(safeCategory);
  const { addItem, updateItem, deleteItem } = useInventoryActions(setItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const {
    nameError,
    priceError,
    validateName,
    validatePrice,
    setNameError,
    setPriceError,
  } = useValidation();

  if (!category) {
    return (
      <>
        <Stack.Screen
          options={{ title: "Inventory", headerTitleAlign: "center" }}
        />
        <View style={styles.centered}>
          <Text>No category provided!</Text>
        </View>
      </>
    );
  }

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
        setNameError={setNameError}
        setPriceError={setPriceError}
        nameError={nameError}
        validateName={validateName}
        validatePrice={validatePrice}
        priceError={priceError}
        itemName={itemName}
        setItemName={setItemName}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
      />
    </>
  );
}

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
  setNameError: React.Dispatch<React.SetStateAction<string>>;
  setPriceError: React.Dispatch<React.SetStateAction<string>>;
  nameError: string;
  priceError: string;
  itemName: string;
  validateName: (name: string) => boolean;
  validatePrice: (name: string) => boolean;
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
    setNameError,
    setPriceError,
    nameError,
    priceError,
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
    validateName,
    validatePrice,
  } = props;

  function resetForm() {
    setItemName("");
    setItemPrice("");
    setCurrentItemId(null);
    setIsEditing(false);
    setNameError("");
    setPriceError("");
  }

  function handleAddNew() {
    resetForm();
    setModalVisible(true);
  }

  function handleConfirmAdd() {
    if (!validateName(itemName) || !validatePrice(itemPrice)) {
      return;
    }

    const priceValue = parseFloat(itemPrice);
    addItem(category, itemName.trim(), priceValue);
    setModalVisible(false);
  }

  function handleEdit(id: string, name: string, price: number) {
    setCurrentItemId(id);
    setItemName(name);
    setItemPrice(String(price));
    setIsEditing(true);
    setModalVisible(true);
  }

  function handleConfirmEdit() {
    if (
      !validateName(itemName) ||
      !validatePrice(itemPrice) ||
      !currentItemId
    ) {
      return;
    }

    const priceValue = parseFloat(itemPrice);
    updateItem(currentItemId, {
      name: itemName.trim(),
      price: priceValue,
    });
    setModalVisible(false);
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
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isEmpty = items.length === 0;
  const HeaderSVG = iconsMap[category] || MenuIcon;

  return (
    <View style={styles.container}>
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
          keyExtractor={(item, index) => item.id || index.toString()} // Fallback to index if id is missing
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      )}

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetForm(); // Ensure form fields and errors are cleared
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
            resetForm();
          }}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
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
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
                style={styles.closeButton}
              >
                <CloseIcon width={24} height={24} color="#5C5C5C" />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <ValidatedTextInput
                placeholder="eg. Espresso"
                value={itemName}
                onChangeText={(text) => {
                  setItemName(text);
                  validateName(text);
                }}
                error={nameError}
                onBlur={() => validateName(itemName)}
              />

              <ValidatedTextInput
                placeholder="12 MAD"
                keyboardType="numeric"
                value={itemPrice}
                onChangeText={(text) => {
                  setItemPrice(text);
                  validatePrice(text);
                }}
                error={priceError}
                onBlur={() => validatePrice(itemPrice)}
              />
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
