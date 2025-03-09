/**
 * seedCategories.ts
 *
 * 1) npm install firebase-admin
 * 2) Place this file in your project root or a /scripts folder.
 * 3) Obtain your service account key JSON from the Firebase console
 *    and reference it in this file (e.g. './serviceAccountKey.json').
 * 4) Run: `npx ts-node seedCategories.ts`
 *    (or compile/run with Node, depending on your setup).
 */

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// Import your service account key (replace the path with yours)
import serviceAccount from "../serviceAccountKey.json";

// Initialize the admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Use the admin Firestore
const db = getFirestore();

// Put all your categories here
const categories = [
  { key: "coffee", label: "Coffee" },
  { key: "tea", label: "Tea" },
  { key: "soda", label: "Soda" },
  { key: "juice", label: "Juice" },
  { key: "water", label: "Water" },
  { key: "pastries", label: "Pastries" },
  { key: "menu", label: "Menu" },
];

// Main seeding function
async function seedCategories() {
  try {
    // For each category, set doc with docId === category.key
    for (const category of categories) {
      const docRef = db.collection("categories").doc(category.key);
      await docRef.set(category);
      console.log(`Seeded category "${category.key}"`);
    }

    console.log("All categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  } finally {
    // Ensure we exit the script
    process.exit(0);
  }
}

seedCategories();
