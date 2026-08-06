import React, { useEffect, useState } from 'react';
import {
  auth,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOutUser
} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * AuthExample - minimal demonstration component
 * - Email sign-up / sign-in
 * - Google sign-in
 * - Sign out
 * - Shows auth state via onAuthStateChanged
 *
 * Notes:
 * - For production, move auth state into a Context or hook.
 * - Add form validation and nicer UI as needed.
 */

export default function AuthExample() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSignUp = async () => {
    setMessage(null);
    try {
      await signUpWithEmail(email, password);
      setMessage('Sign-up successful.');
    } catch (err) {
      setMessage(err.message || 'Sign-up error');
    }
  };

  const handleSignIn = async () => {
    setMessage(null);
    try {
      await signInWithEmail(email, password);
      setMessage('Sign-in successful.');
    } catch (err) {
      setMessage(err.message || 'Sign-in error');
    }
  };

  const handleGoogle = async () => {
    setMessage(null);
    try {
      await signInWithGoogle();
      setMessage('Google sign-in successful.');
    } catch (err) {
      setMessage(err.message || 'Google sign-in error');
    }
  };

  const handleSignOut = async () => {
    setMessage(null);
    try {
      await signOutUser();
      setMessage('Signed out.');
    } catch (err) {
      setMessage(err.message || 'Sign-out error');
    }
  };

  if (loading) return <div>Loading auth state...</div>;

  return (
    <div style={{ padding: 16, border: '1px solid #ddd', maxWidth: 420 }}>
      <h3>Auth Example</h3>

      {user ? (
        <div>
          <p>Signed in as: {user.email || user.displayName || user.uid}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 8 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              style={{ width: '100%', marginBottom: 6 }}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              style={{ width: '100%', marginBottom: 6 }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleSignIn}>Sign In</button>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>

          <div>
            <button onClick={handleGoogle}>Sign In with Google</button>
          </div>
        </div>
      )}

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
