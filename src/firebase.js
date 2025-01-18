// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Authentication

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyANJc4tIKqTBRA0VXNJGxyhmMg3BqxkEk8",
  authDomain: "login-firebase-auth-b82dd.firebaseapp.com",
  projectId: "login-firebase-auth-b82dd",
  storageBucket: "login-firebase-auth-b82dd.firebasestorage.app",
  messagingSenderId: "704943558942",
  appId: "1:704943558942:web:d22cf66c0e9d3e2faab90f",
  measurementId: "G-PPFT3JQLZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export auth so it can be used in other parts of your application
export { auth };
