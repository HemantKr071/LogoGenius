// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "logogenius-07.firebaseapp.com",
  projectId: "logogenius-07",
  storageBucket: "logogenius-07.firebasestorage.app",
  messagingSenderId: "204083825758",
  appId: "1:204083825758:web:ca27ff6d10a26b40c5f8cf",
  measurementId: "G-WFTLMXMXPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);