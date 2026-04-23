const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

console.log("AUTH ROUTES FILE LOADED");

/* TEST ROUTE */
router.get("/test", (req, res) => {
  res.send("Auth routes working");
});

/* LOGIN ROUTE */
router.post("/login", authController.login);

module.exports = router;