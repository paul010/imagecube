import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFAhzSlzZUCt86KnIT_KFaSN9UuyLNh00",
  authDomain: "randomphonesnumbers.firebaseapp.com",
  projectId: "randomphonesnumbers",
  storageBucket: "randomphonesnumbers.firebasestorage.app",
  messagingSenderId: "47915203257",
  appId: "1:47915203257:web:083766d2173fabf7557968",
  measurementId: "G-26J976QTKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);

