import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDywY414Ter8U0MPaC7j3T-vkODFriiZaw",
  authDomain: "meeet-ed79e.firebaseapp.com",
  projectId: "meeet-ed79e",
  storageBucket: "meeet-ed79e.firebasestorage.app",
  messagingSenderId: "1031422415604",
  appId: "1:1031422415604:web:7c4ba057379bfd157d84a1",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

enableNetwork(db);

export { db };