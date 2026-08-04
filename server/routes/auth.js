import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // same as registered in Google Console
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-with-secure-secret';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const client = new OAuth2Client(CLIENT_ID);

/**
 * POST /auth/google/code
 * Body: { code }
 */
router.post('/google/code', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Missing authorization code' });

    // Exchange code for tokens
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { id_token } = tokenRes.data;
    if (!id_token) return res.status(500).json({ message: 'No ID token returned from Google' });

    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Unable to verify Google ID token' });
    }

    if (!payload.email_verified) {
      return res.status(403).json({ message: 'Google account email not verified' });
    }

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email: payload.email }] });

    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
      });
    } else if (!user.googleId) {
      // Link GoogleId to an existing account using same email
      user.googleId = payload.sub;
      user.name = user.name || payload.name;
      user.avatar = user.avatar || payload.picture;
      await user.save();
    }

    // Create session JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ ok: true, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });

  } catch (err) {
    console.error('Google code exchange error', err?.response?.data || err.message || err);
    return res.status(500).json({ message: 'Failed to exchange code or verify token' });
  }
});

/**
 * GET /auth/me
 * Returns current authenticated user based on cookie token
 */
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ ok: false });

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select('-__v');
    if (!user) return res.status(401).json({ ok: false });

    res.json({ ok: true, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    return res.status(401).json({ ok: false });
  }
});

/**
 * POST /auth/logout
 * Clears the cookie
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ ok: true });
});

export default router;
