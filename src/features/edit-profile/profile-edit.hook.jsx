import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";

export const useProfileEdit = () => {
  const { user, postUser } = useContext(AuthenticationContext);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImage } = useFirebase();
  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };
    getUserData();
  }, []);

  const changeName = (text) => {
    setUserData((prev) => ({ ...prev, name: text }));
  };

  const changeSurname = (text) => {
    setUserData((prev) => ({ ...prev, surname: text }));
  };

  const submitChanges = async (name, blob) => {
    setIsLoading(true);
    let url;
    if (name && blob) {
      url = await uploadImage(name, blob);
    } else {
      url = userData.avatar;
    }
    await postUser(user.uid, userData.name, userData.surname, url);
    setIsLoading(false);
  };

  return {
    userData,
    isLoading,
    setIsLoading,
    submitChanges,
    changeName,
    changeSurname,
  };
};
