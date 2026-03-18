// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local dev
  process.env.FRONTEND      // deployed frontend
];

// Global CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    console.log("Request Origin:", origin); // log for debugging
    if(!origin) return callback(null, true); // allow Postman / server-to-server
    if(allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "OPTIONS"], // include OPTIONS for preflight
  allowedHeaders: ["Content-Type"],     // allow content-type headers
  credentials: true
}));

// Handle OPTIONS preflight requests
app.options("*", cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));