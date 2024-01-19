// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAEKrTusinBJ1id37jj8mkmojsm97v5wk",
  authDomain: "prueba-firebase-2a3a8.firebaseapp.com",
  projectId: "prueba-firebase-2a3a8",
  storageBucket: "prueba-firebase-2a3a8.appspot.com",
  messagingSenderId: "612418724302",
  appId: "1:612418724302:web:7fd43daf87ef4496bc4b9f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

