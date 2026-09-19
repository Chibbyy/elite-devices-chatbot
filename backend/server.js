const productRoutes = require("./routes/productRoutes");

require("dotenv").config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminAuth = require("./middleware/adminAuth");

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Allow the server to read JSON data
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);

app.use("/dashboard", adminAuth, dashboardRoutes);
app.use("/products", adminAuth, productRoutes);
app.use("/orders", adminAuth, orderRoutes);

app.get("/", (req, res) => {
  res.send("Elite Devices Backend is Running!");
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});