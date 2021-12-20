import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// firebase config
const firebaseConfig = {
  //config
};
firebase.initializeApp(firebaseConfig);
// firestore database service
const firestore = firebase.firestore();
// firestore Authentication service
const firebaseAuth = firebase.auth();
// timestamp
const timestamp = firebase.firestore.Timestamp;
export { firestore, firebaseAuth, timestamp };
