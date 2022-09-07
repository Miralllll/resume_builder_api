var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const {requireAuth, checkUser} = require('../middleware/authMiddleware');
const isauthController = require("../controllers/isauthController");

router.use(bodyParser.json());

router.get("/", checkUser, isauthController.isauth_get);
router.post("/", checkUser, isauthController.isauth_post);

module.exports = router;
