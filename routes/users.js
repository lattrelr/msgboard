const express = require("express");
const authjwt = require("../middleware/authjwt");
const router = express.Router();

const controller = require("../controllers/users");

router.get("/", controller.getIndex);
router.get("/active", authjwt.verifyToken, controller.getActiveUser);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

module.exports = router;