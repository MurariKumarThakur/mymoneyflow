import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyDd4fxqK7qj3EwZf8k9PvcwJnEj-lzWDS0",
  authDomain: "mymoneyflow-d0617.firebaseapp.com",
  projectId: "mymoneyflow-d0617",
  storageBucket: "mymoneyflow-d0617.appspot.com",
  messagingSenderId: "414447377281",
  appId: "1:414447377281:web:438f08cccb030ccd226680",
  measurementId: "G-YHF438MS1G"
});
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
// export const storage=firebase.storage()
