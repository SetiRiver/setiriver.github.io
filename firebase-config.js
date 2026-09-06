// Firebase configuration - Seti RiverSide Resort Admin Panel
const firebaseConfig = {
    apiKey: "AIzaSyDvwxmIQHAGLx7Lt6r38rHFLQVUznHvJp8",
    authDomain: "seti-river-resort.firebaseapp.com",
    databaseURL: "https://seti-river-resort-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "seti-river-resort",
    storageBucket: "seti-river-resort.firebasestorage.app",
    messagingSenderId: "652103463409",
    appId: "1:652103463409:web:9b293fd6c6a980487fd450"
};

const app = firebase.initializeApp(firebaseConfig);
window.firebaseAuth = firebase.auth();
window.firebaseDB = firebase.database();

// Optional client-side allow-list. Put your Firebase Auth UID here after
// creating the one admin account. Security rules should also enforce it.
window.ADMIN_UIDS = ["YOUR_ADMIN_UID_1", "YOUR_ADMIN_UID_2"];
