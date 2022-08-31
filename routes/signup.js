var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const signupController = require("../controllers/signupController");

router.use(bodyParser.json());

router.get("/", signupController.signup_get);
router.post("/", signupController.signup_post);

module.exports = router;
