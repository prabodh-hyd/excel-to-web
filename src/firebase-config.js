// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);


// Export the auth object to use it in other parts of your app
export { auth };
