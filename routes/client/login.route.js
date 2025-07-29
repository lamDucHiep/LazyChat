const express = require("express");
const router = express.Router();
const controller = require("./../../controllers/client/login.controller");

router.get("/login", controller.getLogin);
router.get("/logout", controller.getLogout);
router.post("/login", controller.postLogin);
module.exports = router;
