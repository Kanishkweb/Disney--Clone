import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSh5msC3OD_-QrAPiCM4gYOiu8syrY8CA",
  authDomain: "disneyplus-clone-b9659.firebaseapp.com",
  projectId: "disneyplus-clone-b9659",
  storageBucket: "disneyplus-clone-b9659.appspot.com",
  messagingSenderId: "860601653030",
  appId: "1:860601653030:web:03dea2b152c951de0093e7",
  measurementId: "G-QT2HCZ92G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 
const storage = getStorage(app);
export { auth , provider,storage, db} 
export default db;