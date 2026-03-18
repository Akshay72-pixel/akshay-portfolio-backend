// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js'; // Import the contact route

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND, // your Vite frontend
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));