// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-SN2wOA2Ib-o29Ti2X8bUyiulbrQdnv4",
    authDomain: "library-app-3e02c.firebaseapp.com",
    databaseURL: "https://library-app-3e02c.firebaseio.com",
    projectId: "library-app-3e02c",
    storageBucket: "library-app-3e02c.appspot.com",
    messagingSenderId: "973255477930",
    appId: "1:973255477930:web:89c3136c654004d6f55ed3",
    measurementId: "G-PGGDPCHTM2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let storageService = firebase.storage();
let storageRef = storageService.ref();
firebase.analytics();