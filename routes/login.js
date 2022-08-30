var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const loginController = require('../controllers/loginController');

router.use(bodyParser.json());

router.get("/", loginController.login_get);
router.post("/", loginController.login_post);

module.exports = router;
