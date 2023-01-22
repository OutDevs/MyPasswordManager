// Calling the firebase library, to be able to conect to the app
import * as firebase from 'firebase'
import 'firebase/storage'

// Variables imported from firebase
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialing the app, conecting it to the firebase storage
firebase.initializeApp(firebaseConfig)

// Exporting it to be able to use it in other components
export default firebase;