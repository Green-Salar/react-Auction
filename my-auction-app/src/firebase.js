// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcrYHbp2j5R3iLbHLKUwnUBwgOA33OIRM",
    authDomain: "rudebid-7b29d.firebaseapp.com",
    projectId: "rudebid-7b29d",
    storageBucket: "rudebid-7b29d.appspot.com",
    messagingSenderId: "149931495206",
    appId: "1:149931495206:web:0f866ff41b7e10463dbbe7",
    measurementId: "G-384GY3P08R"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };