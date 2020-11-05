import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyARfee-OLPClL0T-KgYVqISIUZEENLEIPw",
  authDomain: "store-online-e5c83.firebaseapp.com",
  databaseURL: "https://store-online-e5c83.firebaseio.com",
  projectId: "store-online-e5c83",
  storageBucket: "store-online-e5c83.appspot.com",
  messagingSenderId: "614819142437",
  appId: "1:614819142437:web:81ac74f2c6f965f435d8cc",
  measurementId: "G-YB0T9GLSGS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
