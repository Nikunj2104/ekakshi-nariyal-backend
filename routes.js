const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");

// Authentication Routes
router.post("/auth/sign-up", authController.signUp);
router.post("/auth/sign-in", authController.signIn);

// Example of a Protected Route
// router.get("/profile", authMiddleware.authenticate, (req, res) => {
//   res.json({ message: "Welcome to your profile", user: req.user });
// });

module.exports = router;