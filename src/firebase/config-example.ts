import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDm6YT8g5zTEs9enxtQCj4VW0mzZzmcmu0",
  authDomain: "cobacoba-ef355.firebaseapp.com",
  projectId: "cobacoba-ef355",
  storageBucket: "cobacoba-ef355.firebasestorage.app",
  messagingSenderId: "31296103083",
  appId: "1:31296103083:web:4d472a06551e7cded20dee",
  measurementId: "G-7DDJYMCBJ8"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
