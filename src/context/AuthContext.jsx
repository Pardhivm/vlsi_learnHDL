
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth, authReady } from "../utils/firebase.js";
import {
  googleLogin,
  googleLogout
} from "../utils/auth.js";

import { saveUserProfile } from "../utils/firestore.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    let active = true;

    const initializeAuth = async () => {
      try {
        await authReady;

        if (!active) return;

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          setLoading(false);

          if (currentUser) {
            try {
              await saveUserProfile(currentUser);
              console.log("User profile saved to Firestore.");
            } catch (error) {
              console.error(
                "Failed to save user profile:",
                error
              );
            }
          }
        });
      } catch (error) {
        console.error(
          "Authentication initialization error:",
          error
        );

        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    return await googleLogin();
  };

  const signOut = async () => {
    return await googleLogout();
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
