var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const logoutController = require("../controllers/logoutController");

router.use(bodyParser.json());

router.get("/", logoutController.logout_get);
router.post("/", logoutController.logout_post);

module.exports = router;
