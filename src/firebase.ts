// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {doc, getFirestore, onSnapshot, setDoc} from "firebase/firestore";
import {FirebaseDayTracking} from './types/FirebaseDayTracking';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUHMnwrMJcBmizCchrqfmDU1jEr7Ov2iY",
    authDomain: "poop.mfazio.dev",
    projectId: "fazio-gym-tracker",
    storageBucket: "fazio-gym-tracker.firebasestorage.app",
    messagingSenderId: "1027995780177",
    appId: "1:1027995780177:web:b8febabe34cb15c78ae470",
    measurementId: "G-B4QR8TVZ8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const saveData = async (userId: string, docId: string, data: unknown) => {
    console.log('Saving data', {userId, docId}, data);
    await setDoc(doc(db, userId, docId), data);
}

const saveTrackingDataForDay = async (userId: string, dateString: string, data: FirebaseDayTracking) => {
    return saveData(`stomach-tracker/users/${userId}`, dateString, data);
}

const getTrackingDataForDay = async (userId: string, dateString: string, onUpdate: (data: FirebaseDayTracking) => void) => {
    return onSnapshot(doc(db, `stomach-tracker/users/${userId}`, dateString), (doc) => {
        if (doc.exists()) {
            onUpdate(doc.data() as FirebaseDayTracking)
        } else {
            onUpdate({} as FirebaseDayTracking)
        }
    });
}

export {app, auth, db, saveData, getTrackingDataForDay, saveTrackingDataForDay};
