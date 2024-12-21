// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUHMnwrMJcBmizCchrqfmDU1jEr7Ov2iY",
    authDomain: "fazio-gym-tracker.firebaseapp.com",
    projectId: "fazio-gym-tracker",
    storageBucket: "fazio-gym-tracker.firebasestorage.app",
    messagingSenderId: "1027995780177",
    appId: "1:1027995780177:web:b8febabe34cb15c78ae470",
    measurementId: "G-B4QR8TVZ8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export {app, analytics, auth, db};
