// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChjTfACus21XbqHVqe8YNaaee-Flbw0I8",
    authDomain: "skillstack-2efbc.firebaseapp.com",
    projectId: "skillstack-2efbc",
    storageBucket: "skillstack-2efbc.firebasestorage.app",
    messagingSenderId: "976870638789",
    appId: "1:976870638789:web:8a6663e7e160c02c495cac",
    measurementId: "G-VJVG3CK51Q"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
