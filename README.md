# MEEET (Zoom) - Firebase setup

This project uses Firebase for authentication. The client-side Firebase configuration is initialized in `src/firebase.js` and expects environment variables in a Vite-compatible `.env.local` file.

## Setup

1. Install dependencies

```bash
npm install
# or
# yarn
```

2. Create environment file

Copy the provided `.env.example` to `.env.local` and fill in your Firebase project's configuration values:

```bash
cp .env.example .env.local
```

Do NOT commit `.env.local` — it contains secrets.

3. Configure Firebase in the Console

- Create a Firebase project at https://console.firebase.google.com/
- Enable Authentication → Sign-in methods → Email/Password and Google
- Register a web app and copy the config values into your `.env.local` file

4. Run the dev server

```bash
npm run dev
```

## Environment variables

The following Vite-prefixed environment variables are required (already included in `.env.example`):

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

## Authentication

The Firebase helpers are available at `src/firebase.js` and include:

- signInWithGoogle()
- signUpWithEmail(email, password)
- signInWithEmail(email, password)
- signOutUser()

Use these functions in your React components to add authentication flows.

## Notes

This PR only adds authentication setup and documentation. Video conferencing, WebRTC, room management, transcription, and other meeting features will be implemented in subsequent PRs.
