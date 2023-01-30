// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6NfhbtAJRFJijDzi0xlWDX84514NjEYk",
  authDomain: "reddit-clone-9c710.firebaseapp.com",
  projectId: "reddit-clone-9c710",
  storageBucket: "reddit-clone-9c710.appspot.com",
  messagingSenderId: "641576315731",
  appId: "1:641576315731:web:7760c9ce12c3e9a3cb8fa6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };