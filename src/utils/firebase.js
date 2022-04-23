// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-FtqNiAyCZ-REceugy_0IE4QGZZQHbx0",
  authDomain: "clothing-store-94baf.firebaseapp.com",
  projectId: "clothing-store-94baf",
  storageBucket: "clothing-store-94baf.appspot.com",
  messagingSenderId: "401615588117",
  appId: "1:401615588117:web:a2163a6ea39d7c3715b71c",
};

// Initialize Firebase (locally)
const firebaseApp = initializeApp(firebaseConfig);

// Google provider instance
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Authentication instance and helper functions
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// Email/Password provider instance
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // code logic protection
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // code logic protection
  return await signInWithEmailAndPassword(auth, email, password);
};

// Firestore database instance
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCollectionAndDocuments = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};

// Using above database with NoSQL document utility functions
export const createUserDocFromAuth = async (userAuth, otherData) => {
  if (!userAuth) return; // code logic protection

  const userDocRef = doc(db, "users", userAuth.uid); // document instance
  const userSnapShot = await getDoc(userDocRef); // reads above document reference

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, date, ...otherData });
    } catch (error) {
      console.log("error creating user: ", error.message);
    }
  }
  return userDocRef;
};
