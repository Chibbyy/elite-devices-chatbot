const productRoutes = require("./routes/productRoutes");

require("dotenv").config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Allow the server to read JSON data
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Elite Devices Backend is Running!");
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});