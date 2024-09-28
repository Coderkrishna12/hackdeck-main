// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app); // Initialize Firebase Analytics
const db = getFirestore(app);

export {auth,db}; 