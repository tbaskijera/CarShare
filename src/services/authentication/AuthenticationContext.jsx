import { useState, createContext } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth, db } from "@/firebase-config";
import { constants } from "@/constants";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const postUser = async (
    uid,
    name,
    surname,
    avatar = constants.DEFAULT_AVATAR
  ) => {
    await setDoc(doc(db, "users", uid), {
      name: name,
      surname: surname,
      avatar: avatar,
    });
  };

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
    }
  });

  const onLogin = async ({ email, password }) => {
    let usr = null;
    try {
      usr = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
    setUser(usr);
  };

  const onRegister = async ({ email, password, name, surname }) => {
    console.log(email, password, name, surname);
    let usr = null;
    try {
      usr = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
    postUser(usr.user.uid, name, surname);
  };

  const onLogout = () => {
    signOut(auth);
    setUser(null);
    setError(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        error,
        onLogin,
        onRegister,
        onLogout,
        postUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
