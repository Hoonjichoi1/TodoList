// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtAPekqZYkkEDAmI3Dim0-qkUKMi01XMg",
  authDomain: "todolist-28944.firebaseapp.com",
  projectId: "todolist-28944",
  storageBucket: "todolist-28944.firebasestorage.app",
  messagingSenderId: "812417326133",
  appId: "1:812417326133:web:dd359857107190edee657c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)