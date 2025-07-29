const express = require("express");
const router = express.Router();
const controller = require("./../../controllers/client/chat.controller");
const authMiddleware =
  require("./../../middlewares/authMiddleware").authMiddleware;

router.get("/chat", authMiddleware, controller.getChat);
router.post("/chat", authMiddleware, controller.postChat);

module.exports = router;
