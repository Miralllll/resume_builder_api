var express = require("express");
var router = express.Router();
const uploadController = require("../controllers/uploadController");

router.get("/", uploadController.upload_get);
router.post("/", uploadController.upload_post);

module.exports = router;
