// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics"; // Import Firebase Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeT1JLgD-Zwr-YpXtV2S1DawYoDv2Jt3o",
    authDomain: "hackdeck24.firebaseapp.com",
    projectId: "hackdeck24",
    storageBucket: "hackdeck24.appspot.com",
    messagingSenderId: "1054834822440",
    appId: "1:1054834822440:web:ef02ddc2a1b14f6613d41d",
    measurementId: "G-E0WEJWSCDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Storage, and Analytics
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); // Initialize Firebase Analytics

// Export Firestore and Storage
export { db, storage }; // Ensure to export both db and storage

