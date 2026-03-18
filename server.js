import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

dotenv.config();
const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",                        // local dev
  "https://akshay-portfolio-frontend-v427.onrender.com"  // deployed frontend
];

// Global CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    console.log("Request Origin:", origin);
    if(!origin) return callback(null, true); // allow Postman / server-to-server
    if(allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));