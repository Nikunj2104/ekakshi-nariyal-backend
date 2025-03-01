const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: "*", // Allow all origins (update this to specific domains in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// MongoDB Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// Default Route with uptime
app.get("/", (req, res) => {
  const uptime = process.uptime();
  const uptimeMessage = `API is working. Uptime: ${Math.floor(
    uptime
  )} seconds.`;
  res.status(200).send(uptimeMessage);
});

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
