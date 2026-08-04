import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS: allow your frontend origin (adjust for production)
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/meeet';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

app.use('/auth', authRouter);

app.get('/', (req, res) => res.send('MEEET backend running'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
