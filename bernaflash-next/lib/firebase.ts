// Firebase v9+ Modular SDK Configuration
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBmUhP2LdVReR9gRDX5el0lpUfgqE7Jt6A",
    authDomain: "bernavocab.firebaseapp.com",
    databaseURL: "https://bernavocab-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bernavocab",
    storageBucket: "bernavocab.firebasestorage.app",
    messagingSenderId: "234781292902",
    appId: "1:234781292902:web:617492bb14db69363cf0a7",
    measurementId: "G-048H1LQCC0"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

export { app, database };
