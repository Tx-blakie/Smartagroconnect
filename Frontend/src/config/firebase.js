// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNX6Magt0jzMTNXsYVNGUIUH35sjJxEYg",
  authDomain: "agroconnect-fff68.firebaseapp.com",
  projectId: "agroconnect-fff68",
  storageBucket: "agroconnect-fff68.appspot.com",
  messagingSenderId: "1044971643984",
  appId: "1:1044971643984:web:f657a369a184ca32be9d55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Note: Firebase authentication is now only used for email/password login
// Phone authentication has been removed

export { app, auth, db, storage }; 