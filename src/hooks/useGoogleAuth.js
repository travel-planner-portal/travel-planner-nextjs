import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { storeUserData, verifyGoogleToken } from "../network/networkCalls";

export const useGoogleAuth = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);

      const response = await verifyGoogleToken(idToken);

      if (response.success) {
        if (response.isNewUser) {
          onSuccess({
            isNewUser: true,
            pendingUserData: {
              uid: response.pendingUserData.uid,
              email: response.pendingUserData.email,
              name: response.pendingUserData.name,
              photoURL: response.pendingUserData.photoURL,
            },
          });
        } else {
          storeUserData(response);
          onSuccess({
            isNewUser: false,
            token: response.token,
            user: response.user,
          });
        }
      } else {
        throw new Error(response.message || "Google authentication failed");
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        return;
      }
      onError?.(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading };
};
