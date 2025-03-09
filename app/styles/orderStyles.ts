import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Filters
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 10,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
  },
  filterTextSelected: {
    color: "#fff",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  filterButtonSelected: { borderWidth: 2 },
  filterButtonUnselected: { borderColor: "transparent" },
  filter_paid: { backgroundColor: "#E8F5E9" },
  filter_unpaid: { backgroundColor: "#FDECEA" },
  filter_pending: { backgroundColor: "#FFF8E1" },
  filter_canceled: { backgroundColor: "#F5F5F5" },
  filterText_paid: { color: "#4CAF50" },
  filterText_unpaid: { color: "#F44336" },
  filterText_pending: { color: "#FFA000" },
  filterText_canceled: { color: "#9E9E9E" },

  // Order Card
  orderCard: {
    padding: 14,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "white",
  },

  // Order Header
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  // Status Badge
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  statusBadge_pending: { backgroundColor: "#FFB973" },
  statusBadge_paid: { backgroundColor: "#6AD15C" },
  statusBadge_unpaid: { backgroundColor: "#FE5F5F" },
  statusBadge_canceled: { backgroundColor: "grey" },

  // Metadata
  orderMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    marginVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#F2F2F2",
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metadataText: {
    fontSize: 14,
    color: "#5C5C5C",
    fontWeight: "300",
  },

  // Items
  orderItemsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderItem: {
    fontSize: 16,
    color: "#5C5C5C",
    marginBottom: 6,
    fontWeight: "400",
  },

  // Footer
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    paddingTop: 12,
  },
  orderTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5C5C5C",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5C5C5C",
  },

  // Floating Action Button
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#3E2723",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  // Buttons
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    gap: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Buttons for different statuses
  pendingButton: { backgroundColor: "#FFB973" }, // Orange for Pending
  paidButton: { backgroundColor: "#6AD15C" }, // Green for Paid
  unpaidButton: { backgroundColor: "#FE5F5F" }, // Yellow for Unpaid
  canceledButton: { backgroundColor: "grey" }, // Red for Canceled
});
