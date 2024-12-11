// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-a9252.firebaseapp.com",
  projectId: "chatapp-a9252",
  storageBucket: "chatapp-a9252.appspot.com",
  messagingSenderId: "930101035664",
  appId: "1:930101035664:web:ad6caf5bc273d1c8ca0e15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const db = getFirestore();
export const storage = getStorage();