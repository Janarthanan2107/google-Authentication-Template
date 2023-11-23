// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// *****Note:**** //

// 1. getAuth is for authenticating the app for google firebase
// 2. signInWithPopup is sign in with a popup
// 3. GoogleAuthProvider will provide the googleAuth function for App

// fire store database
import { getFirestore } from "firebase/firestore";

// To create or overwrite a single document
import { doc, getDoc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-5xA7GqtAhhRojl2qV3Bap6nnfqPbbN8",
    authDomain: "practice-649fd.firebaseapp.com",
    projectId: "practice-649fd",
    storageBucket: "practice-649fd.appspot.com",
    messagingSenderId: "103084443162",
    appId: "1:103084443162:web:ab61931b30cc9209a033a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// clone the googleAuthProvider
const provider = new GoogleAuthProvider();

// signIn method accepts two arguments that initialized app and google provider
const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const createUserDocFromAuth = async (userAuth) => {
    if (!userAuth) return;
    // // check once your values are returning
    // console.log("user Name:", userAuth.displayName);
    // console.log("user email:", userAuth.email);
    // console.log("user photo:", userAuth.photoURL);

    const userDocRef = doc(db, "user", userAuth.uid)
    const { photoURL } = userAuth;
    const userSnapShot = await getDoc(userDocRef)

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                photoURL: photoURL || null, // Use photoURL if available, or null if not
                createdAt,
            });
        } catch (err) {
            console.log("Something went wrong!", err.message)
        }
    }

    return userDocRef;
}


export { signInWithGooglePopup, createUserDocFromAuth  }