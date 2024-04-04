const express = require("express");
const router = express.Router();

const controller = require("../controllers/posts");

router.get("/", controller.getIndex);
router.post("/", controller.createItem);
router.get("/:postId", controller.getItem);

module.exports = router;
