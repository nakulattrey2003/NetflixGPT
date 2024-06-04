// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzmXVmCyv_biePPnyNmkXLWoL8GBeBVUA",
  authDomain: "netflixgpt-2d118.firebaseapp.com",
  projectId: "netflixgpt-2d118",
  storageBucket: "netflixgpt-2d118.appspot.com",
  messagingSenderId: "700577532856",
  appId: "1:700577532856:web:eaf36492c1aa67f161dd4d",
  measurementId: "G-5XRRN3RFG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);