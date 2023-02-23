// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9zpC0XaB1ep-vIx7pBW99uCW8MsBpgvM",
  authDomain: "vue-3-2023-f2064.firebaseapp.com",
  projectId: "vue-3-2023-f2064",
  storageBucket: "vue-3-2023-f2064.appspot.com",
  messagingSenderId: "1050117065335",
  appId: "1:1050117065335:web:77ca9f46f34c31f60e5472"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export {auth};