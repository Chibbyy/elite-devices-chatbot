const { getAIResponse } = require("./aiService");
const chatHistory = require("../storage/chatHistory");

const Product = require("../models/Product");
const Order = require("../models/Order");

const faqs = require("../data/faqs.json");
const comparisons = require("../data/comparisons.json");
const recommendations = require("../data/recommendations.json");

const formatPrice = (price) => {
  return `₦${price.toLocaleString("en-NG")}`;
};

const sendReply = (reply) => {
  chatHistory.push({
    role: "assistant",
    content: reply,
    timestamp: new Date().toISOString(),
  });

  return reply;
};

let pendingOrder = null;

const getChatReply = async (message) => {
  const userMessage = message.toLowerCase();

  chatHistory.push({
    role: "user",
    content: message,
    timestamp: new Date().toISOString(),
  });

  if (
    userMessage.includes("show all orders") ||
    userMessage.includes("order history")
  ) {
    const orders = await Order.find({});

    if (orders.length === 0) {
      return sendReply("There are no orders yet.");
    }

    const reply =
      "Order History\n\n" +
      orders
        .map(
          (order) =>
            `• ${order.id}\nProduct: ${order.product}\nQuantity: ${order.quantity}\nDate: ${order.date}`
        )
        .join("\n\n");

    return sendReply(reply);
  }

  const cancelOrderMatch = message.match(/cancel\s+order\s+(ORD-\d+)/i);
  if (cancelOrderMatch) {
    const orderId = cancelOrderMatch[1].toUpperCase();

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return sendReply(`Sorry, I couldn't find an order with ID ${orderId}.`);
    }

    const product = await Product.findOne({ name: order.product });

    if (product) {
      product.stock += order.quantity;
      await product.save();
    }

    await Order.deleteOne({ id: orderId });

    return sendReply(`Your order (${orderId}) has been cancelled successfully.`);
  }

  const orderIdMatch = message.match(/check\s+order\s+(ORD-\d+)/i);
  if (orderIdMatch) {
    const orderId = orderIdMatch[1].toUpperCase();

    const order = await Order.findOne({ id: orderId });

    if (order) {
      const reply = `Order Found\n\nOrder ID: ${order.id}\nProduct: ${order.product}\nQuantity: ${order.quantity}\nDate: ${order.date}`;
      return sendReply(reply);
    }

    return sendReply(`Sorry, I couldn't find an order with ID ${orderId}.`);
  }

  const orderKeywords = ["buy", "order", "purchase"];
  const wantsToOrder = orderKeywords.some((keyword) =>
    userMessage.includes(keyword)
  );

  if (pendingOrder) {
  const quantityMatch = userMessage.match(/\b\d+\b/);

  if (quantityMatch) {
    const quantity = Number(quantityMatch[0]);
    const product = pendingOrder;
    pendingOrder = null;

    if (quantity > product.stock) {
      return sendReply(
        `Sorry, we only have ${product.stock} ${product.name}(s) in stock.`
      );
    }

    const newOrder = new Order({
      id: `ORD-${Date.now()}`,
      product: product.name,
      quantity,
      date: new Date().toISOString(),
    });

    await newOrder.save();

    product.stock -= quantity;
    await product.save();

    const reply = `Great! You've selected ${quantity} ${product.name}${
      quantity > 1 ? "s" : ""
    }. Your order has been saved successfully!\n\nOrder ID: ${newOrder.id}`;

    return sendReply(reply);
  }
}

const orderKeywords = ["buy", "order", "purchase"];
const wantsToOrder = orderKeywords.some((keyword) =>
  userMessage.includes(keyword)
);

if (wantsToOrder) {
  const allProducts = await Product.find({});
  const product = allProducts.find((item) =>
    userMessage.includes(item.name.toLowerCase())
  );

  if (product) {
    if (!product.stock) {
      return sendReply(
        `Sorry, the ${product.name} is currently out of stock and cannot be ordered.`
      );
    }

    const quantityMatch = userMessage.match(/\b\d+\b/);

    if (quantityMatch) {
      const quantity = Number(quantityMatch[0]);

      if (quantity > product.stock) {
        return sendReply(
          `Sorry, we only have ${product.stock} ${product.name}(s) in stock.`
        );
      }

      const newOrder = new Order({
        id: `ORD-${Date.now()}`,
        product: product.name,
        quantity,
        date: new Date().toISOString(),
      });

      await newOrder.save();

      product.stock -= quantity;
      await product.save();

      const reply = `Great! You've selected ${quantity} ${product.name}${
        quantity > 1 ? "s" : ""
      }. Your order has been saved successfully!\n\nOrder ID: ${newOrder.id}`;

      return sendReply(reply);
    }

    pendingOrder = product;

    const reply = `Great choice! You'd like to order the ${product.name}. How many would you like to purchase?`;
    return sendReply(reply);
  }

  return sendReply(
    "I'd be happy to help you place an order! Which product would you like to buy?"
  );
}
  const budgetMatch = message.match(/under\s*₦?\s*([\d,]+)/i);

  if (budgetMatch) {
    const budget = Number(budgetMatch[1].replace(/,/g, ""));
    const allProducts = await Product.find({});

    const affordableProducts = allProducts.filter((item) => {
      const matchesBudget = item.price <= budget;

      const matchesCategory =
        !userMessage.includes("laptop") && !userMessage.includes("smartphone")
          ? true
          : userMessage.includes(item.category.toLowerCase()) ||
            userMessage.includes(item.category.toLowerCase().replace(/s$/, ""));

      return matchesBudget && matchesCategory;
    });

    if (affordableProducts.length > 0) {
      const reply =
        `Products under ${formatPrice(budget)}:\n\n` +
        affordableProducts
          .map(
            (item) =>
              `• ${item.name} - ${formatPrice(item.price)} (${
                item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"
              })`
          )
          .join("\n");

      return sendReply(reply);
    }

    return sendReply(
      `Sorry, we don't have any products under ${formatPrice(budget)}.`
    );
  }

  const recommendation = recommendations.find((item) =>
    userMessage.includes(item.purpose.toLowerCase())
  );

  if (recommendation) {
    const reply = `I recommend the ${recommendation.product}.\n\nReason: ${recommendation.reason}`;
    return sendReply(reply);
  }

  const comparison = comparisons.find((item) => {
    const firstProduct = item.products[0].toLowerCase();
    const secondProduct = item.products[1].toLowerCase();

    return (
      (userMessage.includes(firstProduct) && userMessage.includes(secondProduct)) ||
      (userMessage.includes("compare") &&
        (userMessage.includes(firstProduct) || userMessage.includes(secondProduct))) ||
      (userMessage.includes("vs") &&
        (userMessage.includes(firstProduct) || userMessage.includes(secondProduct)))
    );
  });

  if (comparison) {
    const result = comparison.comparison;

    const comparisonText = Object.entries(result)
      .map(([feature, value]) => `• ${feature}\n  ${value}`)
      .join("\n\n");

    const reply = `Comparison Results:\n\n${comparisonText}`;
    return sendReply(reply);
  }

  const allProductsForLookup = await Product.find({});

  const product = allProductsForLookup.find(
    (item) =>
      userMessage.includes(item.name.toLowerCase()) ||
      userMessage.includes(item.brand.toLowerCase())
  );

  if (product) {
    const reply = `${product.name} costs ${formatPrice(product.price)}. ${
      product.stock > 0
        ? `It is currently in stock (${product.stock} available).`
        : "It is currently out of stock."
    }`;

    return sendReply(reply);
  }

  const categoryProducts = allProductsForLookup.filter((item) => {
    const category = item.category.toLowerCase();

    return (
      userMessage.includes(category) ||
      userMessage.includes(category.replace(/s$/, ""))
    );
  });

  if (categoryProducts.length > 0) {
    const reply =
      "We have these " +
      categoryProducts[0].category +
      "s:\n" +
      categoryProducts
        .map(
          (item) =>
            `• ${item.name} - ${formatPrice(item.price)} (${
              item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"
            })`
        )
        .join("\n");

    return sendReply(reply);
  }

  const faq = faqs.find((item) => {
    const questionMatch =
      userMessage.includes(item.question.toLowerCase()) ||
      item.question.toLowerCase().includes(userMessage);

    const keywordMatch = item.keywords.some((keyword) =>
      userMessage.includes(keyword.toLowerCase())
    );

    return questionMatch || keywordMatch;
  });

  if (faq) {
    return sendReply(faq.answer);
  }

  try {
    const systemPrompt = {
      role: "system",
      content:
        "You are a friendly sales assistant for Elite Devices, a phone and gadget store in Nigeria. Keep answers helpful and concise.",
    };

    const recentHistory = chatHistory
      .slice(-10)
      .map((entry) => ({ role: entry.role, content: entry.content }));

    const reply = await getAIResponse([systemPrompt, ...recentHistory]);

    return sendReply(reply);
  } catch (error) {
    console.error("OpenAI Error:", error);

    return sendReply(
      "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later."
    );
  }
};

module.exports = {
  getChatReply,
};