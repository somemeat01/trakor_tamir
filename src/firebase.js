import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBi5CxlA8wUUkNtbWRa_E5a7F8QNvhOjNE",
    authDomain: "proje-11425.firebaseapp.com",
    projectId: "proje-11425",
    storageBucket: "proje-11425.appspot.com",
    messagingSenderId: "348647799177",
    appId: "1:348647799177:web:bf70a07cf70609aa2ac958",
    measurementId: "G-VGWX2S3SG1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
export const storage =getStorage(app);