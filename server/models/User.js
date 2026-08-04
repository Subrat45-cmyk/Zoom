import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, index: true, unique: true, sparse: true },
  name: { type: String },
  email: { type: String, index: true, unique: true, sparse: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  // add other fields you need (roles, preferences, etc.)
});

const User = mongoose.model('User', userSchema);
export default User;
