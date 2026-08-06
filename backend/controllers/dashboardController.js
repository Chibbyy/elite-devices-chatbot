const products = require("../data/products.json");
const orders = require("../data/orders.json");

const getDashboardStats = (req, res) => {
  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
  });
};

module.exports = {
  getDashboardStats,
};