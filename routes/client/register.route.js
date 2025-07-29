const express = require("express");
const router = express.Router();
const controller = require("./../../controllers/client/register.controller");

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

module.exports = router;
