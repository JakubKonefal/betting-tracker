// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCbq0aMTiZg7c0KUsOq1uOEbZ_h-K5BL3U',
  authDomain: 'betting-app-abb95.firebaseapp.com',
  projectId: 'betting-app-abb95',
  storageBucket: 'betting-app-abb95.appspot.com',
  messagingSenderId: '340078312615',
  appId: '1:340078312615:web:26f9b2f5d3795e2de3af82',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
