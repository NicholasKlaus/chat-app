import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyAob46dRhwy8NDCyM0pJSLSSpUa3Yjq6Ro",
  authDomain: "chat-app-f57b2.firebaseapp.com",
  projectId: "chat-app-f57b2",
  storageBucket: "chat-app-f57b2.appspot.com",
  messagingSenderId: "787039596148",
  appId: "1:787039596148:web:7a76688d2378d09c72eb21"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();