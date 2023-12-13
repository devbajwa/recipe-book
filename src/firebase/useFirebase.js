// useFirebase.js
import firebaseApp from './firebaseConfig';

// TODO: import other Firebase services as needed (e.g. auth)

// Firestore
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(firebaseApp);


// Auth
// import { getAuth } from 'firebase/auth';
// const auth = getAuth(firebaseApp);

// A object with firebase services
const firebase = {
  db
  // auth,
};

export default function useFirebase() {
  return { firebase };
}
