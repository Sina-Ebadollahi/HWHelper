import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCaucjxp7qfqvG0bSXxHKOQIOUY7fQgTW0",
  authDomain: "hwhelper-a007f.firebaseapp.com",
  projectId: "hwhelper-a007f",
  storageBucket: "hwhelper-a007f.appspot.com",
  messagingSenderId: "167277915319",
  appId: "1:167277915319:web:568e920a4403d0b26c3132",
};
firebase.initializeApp(firebaseConfig);
// firestore database service
const firestore = firebase.firestore();
// firestore Authentication service
const firebaseAuth = firebase.auth();
// timestamp
const timestamp = firebase.firestore.Timestamp;
// firebase storage service
const firestoreStorage = firebase.storage();
export { firestore, firebaseAuth, timestamp, firestoreStorage };
