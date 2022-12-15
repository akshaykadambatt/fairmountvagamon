import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/analytics';
import { getStorage } from 'firebase/storage';
// import { getFunctions } from 'firebase/functions';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
};

const aapp = firebase.initializeApp(config)
// window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
export const auth = aapp.auth()
export default aapp
export const db = getFirestore(aapp);
// export const storage = getStorage(aapp);
// export const functions = getFunctions(aapp);