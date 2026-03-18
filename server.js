import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

// List all allowed frontend URLs
const allowedOrigins = [
  "https://akshay-portfolio-frontends.onrender.com/",
  "https://akshay-portfolio-frontend-v427.onrender.com",
  "http://localhost:5173"
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

// Handle preflight requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));