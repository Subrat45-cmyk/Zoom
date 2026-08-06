import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase initialization for the MEEET app.
 * - Guards against duplicate initialization (HMR/dev servers)
 * - Validates required environment variables and fails fast with clear messages
 * - Exports auth, db, helpers and default app
 */

// Required Vite env vars
const REQUIRED_ENV_VARS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID"
  // measurementId is optional
];

// Validate environment variables at startup
const missing = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key]);
if (missing.length) {
  throw new Error(
    `Missing required Firebase environment variables: ${missing.join(", ")}. ` +
      "Copy .env.example to .env.local and set these values. Do NOT commit .env.local."
  );
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined
};

// Guard against multiple initializations (HMR)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

// Providers
export const googleProvider = new GoogleAuthProvider();

// Friendly error messages for common Firebase Auth error codes
const AUTH_ERROR_MESSAGES = {
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "An account already exists with this email.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/weak-password": "The password is too weak. Use at least 6 characters.",
  "auth/popup-closed-by-user": "Sign-in popup was closed before completing the sign-in.",
  "auth/popup-blocked": "Sign-in popup was blocked. Try allowing popups or use redirect sign-in.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email but different sign-in credentials.",
  "auth/credential-already-in-use": "This credential is already associated with a different user.",
  "auth/operation-not-allowed": "This sign-in method is not enabled for your Firebase project."
};

function mapAuthError(error) {
  if (!error || !error.code) return { message: error?.message || "Authentication error", code: null };
  const friendly = AUTH_ERROR_MESSAGES[error.code];
  return { message: friendly || error.message || "Authentication error", code: error.code };
}

// Set default persistence for auth (optional; keep local by default)
setPersistence(auth, browserLocalPersistence).catch(() => {
  // ignore persistence errors for now; callers will still get auth results
});

// Auth helpers with improved error handling
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    const { message, code } = mapAuthError(error);
    const e = new Error(message);
    e.code = code;
    throw e;
  }
};

export const signUpWithEmail = async (email, password) => {
  if (!email || !password) throw new Error("Email and password are required");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    const { message, code } = mapAuthError(error);
    const e = new Error(message);
    e.code = code;
    throw e;
  }
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) throw new Error("Email and password are required");
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    const { message, code } = mapAuthError(error);
    const e = new Error(message);
    e.code = code;
    throw e;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const { message, code } = mapAuthError(error);
    const e = new Error(message);
    e.code = code;
    throw e;
  }
};
