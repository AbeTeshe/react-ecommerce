import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCn2jkYruOhVF6qHul1ly993VsFHvuv5kg",
    authDomain: "react-ecommerce-25f0e.firebaseapp.com",
    projectId: "react-ecommerce-25f0e",
    storageBucket: "react-ecommerce-25f0e.appspot.com",
    messagingSenderId: "184914259066",
    appId: "1:184914259066:web:3d795d4274b5d114b61fc3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};