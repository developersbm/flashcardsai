// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

// // Firebase configuration using environment variables
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGY7d20GYWxSDBKbWrCboFveJfLIdNY3c",
  authDomain: "flashcard-saas-9db55.firebaseapp.com",
  projectId: "flashcard-saas-9db55",
  storageBucket: "flashcard-saas-9db55.appspot.com",
  messagingSenderId: "579235375504",
  appId: "1:579235375504:web:f717d880a74a3dae756b15",
  measurementId: "G-1KQXNJYT12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Initialize Analytics if supported and only in the browser
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { firestore, analytics };