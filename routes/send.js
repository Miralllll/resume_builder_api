var express = require("express");
var router = express.Router();

const latex = require("node-latex");
const { join, resolve } = require("path");
var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.json());

router.post("/", function (request, response) {
  console.log("bluu" + JSON.stringify(request.body));
});

module.exports = router;
