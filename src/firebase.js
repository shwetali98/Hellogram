import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyC3olYikHAkOUWNzG_ygueJsB1_QuwBlyc",
    authDomain: "my-react-app-a52ca.firebaseapp.com",
    projectId: "my-react-app-a52ca",
    storageBucket: "my-react-app-a52ca.appspot.com",
    messagingSenderId: "106030874110",
    appId: "1:106030874110:web:1794ef2d4926b9238a14af",
    measurementId: "G-Z72R99558Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();

  export default firebase;
 