const express = require("express");
const authjwt = require("../middleware/authjwt");
const router = express.Router();

const controller = require("../controllers/replies");

router.post("/", authjwt.verifyToken, controller.createItem);

module.exports = router;
