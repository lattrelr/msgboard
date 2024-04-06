const express = require("express");
const authjwt = require("../middleware/authjwt");
const router = express.Router();

const controller = require("../controllers/users");

router.get("/active", authjwt.verifyToken, controller.getActiveUser);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/signup", controller.signup);

module.exports = router;