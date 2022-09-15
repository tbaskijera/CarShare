import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// staviti u .env prvo stavljanja na github
const firebaseConfig = {
  apiKey: "AIzaSyDiOxBTkmERvlORk9dUSY3pbGgPEPt_hmY",
  authDomain: "carshare-3e03c.firebaseapp.com",
  databaseURL: "https://carshare-3e03c-default-rtdb.firebaseio.com",
  projectId: "carshare-3e03c",
  storageBucket: "carshare-3e03c.appspot.com",
  messagingSenderId: "648374954388",
  appId: "1:648374954388:web:72ea020b3172c8fbbcc781",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
