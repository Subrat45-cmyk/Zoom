import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useToast } from '../../components/common/Toast';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const API = import.meta.env.VITE_API_URL || '';

export default function GoogleCodeSignIn({ text = 'Continue with Google' }) {
  const toast = useToast();
  const navigate = useNavigate();
  const codeClientRef = useRef(null);

  useEffect(() => {
    if (!window.google || !CLIENT_ID) return;

    // Initialize the code client that will open a popup and return an authorization code
    try {
      codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: 'openid email profile',
        ux_mode: 'popup',
        callback: async (response) => {
          const { code } = response || {};
          if (!code) {
            toast.error('Google Sign-in failed', 'No authorization code returned');
            return;
          }

          try {
            // Send code to backend to exchange for tokens & create session
            if (!API) {
              toast.error('Backend not configured', 'Set VITE_API_URL to enable server-side exchange');
              return;
            }

            await axios.post(`${API}/auth/google/code`, { code }, { withCredentials: true });
            toast.success('Signed in', 'Welcome back!');
            navigate('/dashboard');
          } catch (err) {
            console.error(err);
            toast.error('Sign-in error', err?.response?.data?.message || 'Unable to sign in with Google');
          }
        },
      });
    } catch (err) {
      console.error('Failed to init Google code client', err);
    }
  }, [navigate, toast]);

  const openGooglePopup = () => {
    if (!codeClientRef.current) {
      toast.error('Google not configured', 'Set VITE_GOOGLE_CLIENT_ID and ensure google script is loaded');
      return;
    }
    codeClientRef.current.requestCode();
  };

  return (
    <Button
      className="meeet-btn-primary w-full flex items-center justify-center gap-3"
      onClick={openGooglePopup}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M17.64 9.2c0-.63-.06-1.25-.18-1.84H9v3.5h4.84c-.21 1.15-.86 2.12-1.84 2.77v2.3h2.97c1.74-1.6 2.73-4 2.73-6.73z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.97-2.3c-.82.55-1.87.88-2.99.88-2.3 0-4.25-1.55-4.95-3.63H1.98v2.28C3.46 15.93 6.06 18 9 18z" fill="#34A853"/>
        <path d="M4.05 10.78a5.4 5.4 0 010-3.56V4.94H1.98a9.01 9.01 0 000 8.12l2.07-2.28z" fill="#FBBC05"/>
        <path d="M9 3.58c1.33 0 2.54.46 3.49 1.36l2.62-2.62C13.47.85 11.43 0 9 0 6.06 0 3.46 2.07 1.98 4.94l2.07 2.28C4.75 5.13 6.7 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
      <span>{text}</span>
    </Button>
  );
}
