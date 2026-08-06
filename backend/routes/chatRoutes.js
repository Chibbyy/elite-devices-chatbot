const express = require("express");
const router = express.Router();

const {
  chat,
  getChatHistory,
} = require("../controllers/chatController");

router.post("/", chat);
router.get("/history", getChatHistory);

module.exports = router;