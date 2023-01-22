import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDpdHCWru9FkkTI58R4UxgD6A1i9zgQMo",
  authDomain: "content-management-syste-7115b.firebaseapp.com",
  projectId: "content-management-syste-7115b",
  storageBucket: "content-management-syste-7115b.appspot.com",
  messagingSenderId: "853476992667",
  appId: "1:853476992667:web:620eb966f4249b2d7c483e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
