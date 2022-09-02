var express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const resumesController = require("../controllers/resumesController");
var router = express.Router();
var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.json());

router.get("/", requireAuth, resumesController.profile_get);
router.post("/", requireAuth, resumesController.profile_post);

module.exports = router;
