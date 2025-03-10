import dotenv from "dotenv";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";

dotenv.config();

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!serviceAccount.privateKey || !serviceAccount.clientEmail) {
  throw new Error("Missing Firebase service account environment variables.");
}

const app = initializeApp({
  credential: cert(serviceAccount),
});

export default app;
