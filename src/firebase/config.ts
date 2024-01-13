// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDPMYZFvX45qcilActHnXc3V6SjTzx1Rs",
    authDomain: "react-courses-bbb17.firebaseapp.com",
    projectId: "react-courses-bbb17",
    storageBucket: "react-courses-bbb17.appspot.com",
    messagingSenderId: "47967993561",
    appId: "1:47967993561:web:61b50598ceb2a25f7b48c8",
    measurementId: "G-Q2X33MKMHD"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)