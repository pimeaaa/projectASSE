import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACEnc3jxIm3R7NlMFsG43Ilz8M05oga-8",
  authDomain: "projectasse-69063.firebaseapp.com",
  projectId: "projectasse-69063",
  storageBucket: "projectasse-69063.firebasestorage.app",
  messagingSenderId: "920250963403",
  appId: "1:920250963403:web:83a9d4e575b8d3b6d0d24e",
  measurementId: "G-9XLW00RQRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
