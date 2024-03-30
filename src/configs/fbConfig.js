import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDc60H7GJk1iIk3bMz4mOSs-03RM4VsrM8",
  authDomain: "jugaad-notes.firebaseapp.com",
  projectId: "jugaad-notes",
  storageBucket: "jugaad-notes.appspot.com",
  messagingSenderId: "24762619550",
  appId: "1:24762619550:web:c4a60b5bb75b54e4494d8f",
  measurementId: "G-BQ457XQ58R"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;  



