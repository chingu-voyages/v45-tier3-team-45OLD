// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkQ0FKHEPhS_IASkMEV8x0EUrX7gr_lQo",
  authDomain: "fir-auth-8b3cc.firebaseapp.com",
  projectId: "fir-auth-8b3cc",
  storageBucket: "fir-auth-8b3cc.appspot.com",
  messagingSenderId: "1021796458065",
  appId: "1:1021796458065:web:44f720ee33a780d586e270",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
