import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyA587UstW4aFs55MFVBirZIWskKzUhhAow",
    authDomain: "hikingapp-af497.firebaseapp.com",
    databaseURL: "https://hikingapp-af497.firebaseio.com",
    projectId: "hikingapp-af497",
    storageBucket: "hikingapp-af497.appspot.com",
    messagingSenderId: "512342864707",
    appId: "1:512342864707:web:de181d1bf57d3b070bf5f6",
    measurementId: "G-PJN653PND3"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default}