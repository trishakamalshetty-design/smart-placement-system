const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* ---------------- ROUTES ---------------- */
const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const placementRoutes = require("./routes/placementRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");

/* Safety check */
if (!studentRoutes || !companyRoutes || !placementRoutes || !reportRoutes || !authRoutes) {
  console.log("❌ One or more routes are undefined. Check route exports.");
}

app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);

/* ---------------- DEFAULT ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Smart Placement System API Running 🚀");
});

/* ---------------- MONGO CONNECTION ---------------- */
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });