// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAauEuuO_ZQ8brxV8PX0ld4hwY5zikA7YI",
  authDomain: "appflix-bc7de.firebaseapp.com",
  projectId: "appflix-bc7de",
  storageBucket: "appflix-bc7de.appspot.com",
  messagingSenderId: "290668361797",
  appId: "1:290668361797:web:9ab402e03cd8c4e11f4b2c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }