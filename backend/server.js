const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/placements', require('./routes/placementRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// MongoDB Connection + Server Start (ONLY ONCE)
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });