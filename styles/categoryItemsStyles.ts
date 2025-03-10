import { StyleSheet } from "react-native";

export const categoryItemsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    // a bit of horizontal padding so card shadows aren't clipped
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // ============ HEADER ============
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 6,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    // fontWeight: "600",
    color: "#5C5C5C",
  },
  headerSeparator: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginVertical: 12,
    marginHorizontal: 6,
  },

  // "Add an item" button: white with box shadow
  addItemButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    // subtle box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addItemButtonText: {
    fontSize: 14,
    color: "#5C5C5C",
    fontWeight: "500",
  },

  // ============ EMPTY STATE ============
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 20,
    color: "#5C5C5C",
    marginBottom: 30,
  },

  // ============ ITEM CARD ============
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4, // ensures side shadow
    borderRadius: 12,
    // subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemIconWrapper: {
    width: 54,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    flexDirection: "column",
  },
  itemCategory: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  itemName: {
    fontSize: 16,
    color: "#5C5C5C",
  },
  itemPrice: {
    marginTop: 8,
    color: "#5C5C5C",
    fontWeight: "600",
    fontSize: 16,
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  actionButton: {
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  // vertical line between edit & delete
  actionSeparator: {
    width: 1,
    height: 28,
    backgroundColor: "#F2F2F2",
    marginHorizontal: 12,
  },

  // ============ MODAL ============
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWrapper: {
    // This container ensures the white card is centered
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // We use flex or just align content:
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalHeaderTitle: {
    fontSize: 20,
    color: "#5C5C5C",
    marginLeft: 6,
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#5C5C5C",
    marginBottom: 6,
  },
  errorText: {
    color: "#FF5252",
    fontSize: 14,
    marginBottom: 12,
  },
  validateButton: {
    width: 100,
    height: 50,
    backgroundColor: "#6AD15C", // green
    borderRadius: 6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 12,
  },
});
