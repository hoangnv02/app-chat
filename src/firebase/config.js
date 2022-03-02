// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyDVU0Unrdm-eXacwXwHTlTxb_778iZUyn0",
  authDomain: "chattest-aefa4.firebaseapp.com",
  projectId: "chattest-aefa4",
  storageBucket: "chattest-aefa4.appspot.com",
  messagingSenderId: "1007967566230",
  appId: "1:1007967566230:web:6d5b30815324614e2d05b7",
  measurementId: "G-2D9HV7QMBC"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
