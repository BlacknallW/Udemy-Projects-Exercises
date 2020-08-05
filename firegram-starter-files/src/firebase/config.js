import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA1n8nNIfBxtyqUc1zP-_NopFO5fhZtNDw",
    authDomain: "firegram-65937.firebaseapp.com",
    databaseURL: "https://firegram-65937.firebaseio.com",
    projectId: "firegram-65937",
    storageBucket: "firegram-65937.appspot.com",
    messagingSenderId: "96278403852",
    appId: "1:96278403852:web:7776c5c7df7109b5a04729",
    measurementId: "G-3LLTWRQVBF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
