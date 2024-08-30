// authService.js
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc,getDoc } from "firebase/firestore"
import {  db } from "../firebase/Configuration";



export const login = async (auth,email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};


export const fetchUserData = async (uid) => {
  try {
  console.log(db,"database")
    const userDoc = doc(db, 'Users', uid);
    console.log(userDoc,"userDoc")
    const docSnap = await getDoc(userDoc);
    console.log(docSnap,"docSnap")

    if (docSnap.exists()) {
      console.log("hellooooo")
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};