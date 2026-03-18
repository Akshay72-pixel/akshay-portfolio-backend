import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
  "https://akshay-portfolio-frontends.onrender.com",
  "https://akshay-portfolio-frontend-v427.onrender.com",
  "http://localhost:5173"
];

// Global CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Body parser
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));