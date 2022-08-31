var express = require("express");
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const latex = require("node-latex");
const { join, resolve } = require("path");

router.post("/", function (request, response) {
  const options = {
    inputs: [resolve(join(__dirname, "/"))],
    cmd: "xelatex",
    passes: 2,
  };
  response.setHeader("Content-Type", "application/pdf");
  console.log(request.body.pdfpdf);
  let binaryVersion = atob(request.body.pdfpdf.toString("base64"));
  console.log(binaryVersion);
  let text = binaryVersion.toString();
  console.log(text);
  const pdf = latex(text, options);
  console.log("pdf" + pdf);
  pdf.pipe(response);
  pdf.on("error", (err) => {
    console.log("error" + err.message);
    response.removeHeader("Content-Type");
    response.status(400).send(JSON.stringify({ error: err.message }));
  });
  pdf.on("finish", () => {});
});

module.exports = router;
