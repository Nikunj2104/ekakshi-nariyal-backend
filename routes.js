const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const contactController = require("./controllers/contactController");

// Authentication Routes
router.post("/auth/sign-up", authController.signUp);
router.post("/auth/sign-in", authController.signIn);

// Contact Us Route
router.post("/contact", contactController.submitContactForm);

// Example of a Protected Route
// router.get("/profile", authMiddleware.authenticate, (req, res) => {
//   res.json({ message: "Welcome to your profile", user: req.user });
// });

module.exports = router;
