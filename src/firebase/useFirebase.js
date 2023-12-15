// useFirebase.js
import firebaseApp from './firebaseConfig';

// TODO: import other Firebase services as needed (e.g. auth)

// Firestore
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(firebaseApp);


//Auth, Google
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

// A object with firebase services
const firebase = {
  db,
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
};

export default function useFirebase() {
  return { firebase };
}
