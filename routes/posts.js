const express = require("express");
const authjwt = require("../middleware/authjwt");
const router = express.Router();

const controller = require("../controllers/posts");

router.get("/", controller.getIndex);
router.post("/", authjwt.verifyToken, controller.createItem);
router.get("/:postId", controller.getItem);
router.put("/:postId", authjwt.verifyToken, controller.updateItem);

module.exports = router;
