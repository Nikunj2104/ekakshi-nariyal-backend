const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");

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
  res.status(200).send("API is working.");
});

// Routes
const authRoutes = require("./routes/Auth");
app.use("/api/auth", authRoutes);

app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: "rzp_test_GcZZFDPP0jHtC4",
    key_secret: "6JdtQv2u7oUw7EWziYeyoewJ",
  });

  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  const razorpay = new Razorpay({
    key_id: "rzp_test_GcZZFDPP0jHtC4",
    key_secret: "6JdtQv2u7oUw7EWziYeyoewJ",
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      return res.status(500).json("Error at razorpay loading");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    res.status(500).json("failed to fetch");
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
