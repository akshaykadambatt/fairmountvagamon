import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/analytics';
import { getStorage } from 'firebase/storage';
// import { getFunctions } from 'firebase/functions';

const config = {
    apiKey: "AIzaSyA9ojLeMwtCxn27_MOWCEvG8HZHe_04YmY",
  authDomain: "fairmountvagamonweb.firebaseapp.com",
  projectId: "fairmountvagamonweb",
  storageBucket: "fairmountvagamonweb.appspot.com",
  messagingSenderId: "719645493551",
  appId: "1:719645493551:web:3163418be0ccb7b88c39da",
  measurementId: "G-9C3J4CY5NH"
};

const aapp = firebase.initializeApp(config)
// window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
export const auth = aapp.auth()
export default aapp
export const db = getFirestore(aapp);
// export const storage = getStorage(aapp);
// export const functions = getFunctions(aapp);