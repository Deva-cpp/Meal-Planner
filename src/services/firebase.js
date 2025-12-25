import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ??
    "AIzaSyATvUDd3CgHmQGR05aXAs9eNINQFFtzfNM",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ??
    "meal-planner-b88cb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "meal-planner-b88cb",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ??
    "meal-planner-b88cb.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "766451302716",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ??
    "1:766451302716:web:680d165a59f2e5f7cfde39",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-D13NJ851TG",
};

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const analyticsPromise = isSupported()
  .then((supported) => (supported ? getAnalytics(app) : null))
  .catch(() => null);
