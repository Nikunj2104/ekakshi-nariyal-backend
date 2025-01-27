const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// MongoDB Connection
const connectDB = async () => {
  try {
    const uri = `${process.env.MONGO_URI}`;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
connectDB();

// Default Route
app.get("/", (req, res) => {
  res.status(200).send("GET API is working.");
});
app.post("/api/auth/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Respond with token and user information
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
  res.status(200).send("POST API is working. /api/auth/sign-in");
});
app.post("/api/auth/sign-in3", (req, res) => {
  res.status(200).send("POST API is working. /api/auth/sign-in3");
});

// Routes
const authRoutes = require("./routes/Auth");
const User = require("./models/User");
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
