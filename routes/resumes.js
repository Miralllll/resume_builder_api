var express = require("express");
const { checkUser } = require("../middleware/authMiddleware");
const resumesController = require("../controllers/resumesController");
var router = express.Router();
var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.json());

router.get("/", resumesController.profile_get);
router.post("/", resumesController.profile_post);

module.exports = router;
