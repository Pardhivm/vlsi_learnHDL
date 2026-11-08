
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

import { auth, authReady } from "./firebase.js";

// Create Google authentication provider
const googleProvider = new GoogleAuthProvider();

// Ask the user to select their Google account
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// GOOGLE SIGN-IN
export const googleLogin = async () => {
  try {
    // Wait until Firebase persistence is configured
    await authReady;

    // Open Google sign-in popup
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const user = result.user;

    console.log("Google login successful!");
    console.log("Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("Photo:", user.photoURL);
    console.log("UID:", user.uid);

    return user;

  } catch (error) {
    console.error("Google login failed:", error);

    throw error;
  }
};

// GOOGLE LOGOUT
export const googleLogout = async () => {
  try {
    await authReady;

    await signOut(auth);

    console.log("User logged out successfully!");

  } catch (error) {
    console.error("Logout failed:", error);

    throw error;
  }
};
