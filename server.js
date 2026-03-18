import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

// Allow only your frontend URLs
const allowedOrigins = [
  "https://akshay-portfolio-frontend-v427.onrender.com",
  "https://akshay-portfolio-frontends.onrender.com",
  "http://localhost:5173" // for local testing
];

// Global CORS
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like Postman
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Error handler (so server doesn't crash on CORS or other errors)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));