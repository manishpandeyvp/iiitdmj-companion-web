import React from 'react';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAM83mdh6AfP1mUYYlyEkyZG79bk-w4zR4",
    authDomain: "iiitdmj-companion-web.firebaseapp.com",
    databaseURL: "https://iiitdmj-companion-web.firebaseio.com",
    projectId: "iiitdmj-companion-web",
    storageBucket: "iiitdmj-companion-web.appspot.com",
    messagingSenderId: "176049730442",
    appId: "1:176049730442:web:c376b780e3e35707a84e73"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
