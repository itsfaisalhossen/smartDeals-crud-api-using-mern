import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { auth } from "../../src/firebase/firebase.init";
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileFunc = async (displayName, photoURL) => {
    try {
      setLoading(true);
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser({
        ...auth.currentUser,
        displayName,
        photoURL,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInUserFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutFunc = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("currentUSer", currentUser);

      if (currentUser) {
        const loggedUser = { email: currentUser?.email };
        fetch("http://localhost:5000/getToken", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after geting token", data.token);
            localStorage.setItem("token", data.token);
          });
      } else {
        localStorage.removeItem("token");
      }
    });
    setLoading(false);
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUserFunc,
    user,
    setUser,
    setLoading,
    loading,
    signOutFunc,
    updateProfileFunc,
    signInUserFunc,
    signInWithGoogleFunc,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
