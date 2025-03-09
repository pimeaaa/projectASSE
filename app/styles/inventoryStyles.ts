import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#5C5C5C",
    marginBottom: 20,
  },

  row: {
    justifyContent: "flex-start", // Ensures last row aligns to start
    gap: 20, // Adds spacing between items
    margin: "auto",
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryWrapper: {
    flex: 1,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: 100,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lastItem: {
    flexBasis: "48%",
  },

  categoryText: {
    fontSize: 14,
    color: "#5C5C5C",
  },
});
