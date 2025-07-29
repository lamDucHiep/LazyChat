const express = require("express");
const authMiddleware =
  require("../../middlewares/authMiddleware").authMiddleware;
const router = express.Router();
const controller = require("./../../controllers/client/transaction.controller");

router.get("/transaction", authMiddleware, controller.getChat);
router.get(
  "/transaction-filter",
  authMiddleware,
  controller.getFilteredTransactions
);
router.get("/transaction-data", authMiddleware, controller.getTransactions);
router.delete(
  "/transaction-data/:id",
  authMiddleware,
  controller.deleteTransaction
);
router.put("/transaction-data/:id", authMiddleware, controller.putTransaction);

module.exports = router;
