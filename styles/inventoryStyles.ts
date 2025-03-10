// styles/inventoryStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    color: "#5C5C5C",
    textAlign: "center",
    marginBottom: 20,
  },

  // Grid row
  row: {
    // Make sure this has space around tiles
    justifyContent: "space-between",
    marginBottom: 12,
  },

  // Each tile
  item: {
    flex: 1,
    marginHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // Light shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    margin: 6,
    width: 100,
    height: 100,
  },
  lastItem: {
    // Not strictly needed if you're using flexbox.
    // You can remove if the old logic caused style issues
  },

  // Inside each tile:
  categoryWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    color: "#5C5C5C",
    // marginTop: 16,
  },
});
