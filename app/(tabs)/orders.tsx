import { OrderFilter } from "@/components/OrderFilter";
import { OrderItem } from "@/components/OrderItem";
import { useOrderActions } from "@/hooks/useOrderActions";
import { useOrderFilter } from "@/hooks/useOrderFilter";
import { useOrders } from "@/hooks/useOrders";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../styles/common";
import { styles } from "../styles/orderStyles";

export default function OrdersScreen() {
  const { orders, setOrders, loading } = useOrders();
  const { addOrder, updateOrderStatus } = useOrderActions(setOrders);
  const {
    selectedStatus,
    setSelectedStatus,
    filteredOrders,
    availableStatuses,
  } = useOrderFilter(orders);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={commonStyles.container}>
      <OrderFilter
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        availableStatuses={availableStatuses}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            updateOrderStatus={updateOrderStatus}
            role="staff"
          />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={addOrder}>
        <MaterialIcons name="add" size={30} color="#F4E1C1" />
      </TouchableOpacity>
    </View>
  );
}
