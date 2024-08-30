import {getAuth}from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
  apiKey: "AIzaSyCmG47v7D7bzBbvTxTm2XetAOlqVJCiwDw",
  authDomain: "weather-application-e3414.firebaseapp.com",
  projectId: "weather-application-e3414",
  storageBucket: "weather-application-e3414.appspot.com",
  messagingSenderId: "150086700557",
  appId: "1:150086700557:web:6600618d90304e48110f44"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore(app)
export default app;
export const baseURL = firebaseConfig.authDomain;