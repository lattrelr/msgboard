const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");

router.get("/", controller.getIndex);
router.post("/login", controller.login);

module.exports = router;