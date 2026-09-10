const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./data/products.json");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    await mongoose.disconnect();
    console.log("Done");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

seedProducts();