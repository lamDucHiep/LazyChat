const express = require("express");
const controller = require("./../../controllers/client/statistic.controller");
const authMiddleware =
  require("./../../middlewares/authMiddleware").authMiddleware;
const router = express.Router();

router.get("/statistic", authMiddleware, controller.getStatistic);

router.get(
  "/statistic/expense-data",
  authMiddleware,
  controller.getExpenseData
);

module.exports = router;
