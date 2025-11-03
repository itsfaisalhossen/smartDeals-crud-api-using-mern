// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCweOPko7X-w_bXKO0IyebafoauFRwse2U",
  authDomain: "smart-deals-5b0a4.firebaseapp.com",
  projectId: "smart-deals-5b0a4",
  storageBucket: "smart-deals-5b0a4.firebasestorage.app",
  messagingSenderId: "757244369444",
  appId: "1:757244369444:web:c3dfe2461225fa5f3b96b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
