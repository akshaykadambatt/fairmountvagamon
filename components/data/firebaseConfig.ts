import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/analytics';
import { getStorage } from 'firebase/storage';
// import { getFunctions } from 'firebase/functions';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = firebase.initializeApp(config)
// window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
export const auth = app.auth()
export default app
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const functions = getFunctions(app);