
import { initializeApp } from "firebase/app";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyLz0UwDNJQXPwULCzUplblfJwneECytE",
  authDomain: "hdlanguages-49d7f.firebaseapp.com",
  projectId: "hdlanguages-49d7f",
  storageBucket: "hdlanguages-49d7f.firebasestorage.app",
  messagingSenderId: "655647157331",
  appId: "1:655647157331:web:5fad60b3b67c79c102aaa6"
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

export const authReady = setPersistence(
  auth,
  browserLocalPersistence
);

// Cloud Firestore Database
export const db = getFirestore(app);
