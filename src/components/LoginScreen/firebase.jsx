// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwx2Mr5WtNxxfegeu15d-6rjuGKpEyj9E",
  authDomain: "codevista-login.firebaseapp.com",
  projectId: "codevista-login",
  storageBucket: "codevista-login.firebasestorage.app",
  messagingSenderId: "1057538903681",
  appId: "1:1057538903681:web:0c9fcd5f33a961b7b00780",
  measurementId: "G-ZF3ZFR8J6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;