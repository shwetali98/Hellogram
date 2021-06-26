import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDktEzJK9WyJdBT2vmNNvb0J2jQKV0bUxc",
  authDomain: "hellogram-f0932.firebaseapp.com",
  projectId: "hellogram-f0932",
  storageBucket: "hellogram-f0932.appspot.com",
  messagingSenderId: "1008958706188",
  appId: "1:1008958706188:web:29377ee3490bff721b1429",
  measurementId: "G-9PZXC7VT29",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
