var express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const resumesController = require("../controllers/resumesController");
var router = express.Router();
var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.json());

router.get("/", resumesController.profile_get);
router.get("/", resumesController.profile_post);

module.exports = router;
