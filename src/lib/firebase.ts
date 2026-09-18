import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ1JUpzpWIZL1wIbjJetbDzG4sVr3EatE",
  authDomain: "la-picasso-18839.firebaseapp.com",
  projectId: "la-picasso-18839",
  storageBucket: "la-picasso-18839.firebasestorage.app",
  messagingSenderId: "256340377609",
  appId: "1:256340377609:web:37654c14ecfcd10c3a78d8",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
