import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDYaiivfgcE-uVJBmySEvN9l1NhrqYYT-E",
    authDomain: "fir-demoproject-e2353.firebaseapp.com",
    databaseURL: "https://fir-demoproject-e2353-default-rtdb.firebaseio.com",
    projectId: "fir-demoproject-e2353",
    storageBucket: "fir-demoproject-e2353.appspot.com",
    messagingSenderId: "38289747172",
    appId: "1:38289747172:web:f3951d7f8ab27fd085d0f1",
    measurementId: "G-KQJ8GTT0F7"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
