var express = require("express");
var router = express.Router();
const Document = require("../models/Document");
const {updateLatex} = require("../latexParser/jsonToLatex");

module.exports.upload_get = async (req, res) => {
  res.send("respond with a resource");
};

const latex = require("node-latex");
const { join, resolve } = require("path");

module.exports.upload_post = async (req, res) => {
  let binaryVersion = atob(req.body.file.toString("base64"));
  let text = binaryVersion.toString();
  const options = {
    inputs: [resolve(join(__dirname, "/"))],
    cmd: "xelatex",
    passes: 2,
  };
  res.setHeader("Content-Type", "application/pdf");
  text = await updateLatex(text, req.body.form);
  console.log(" " + text);
  const pdf = latex(text, options);
  
  if (res.locals.user !== null && res.locals.user !== undefined) {
    // it should be same document actually, because i do nto have label now, it is okay
    var doc = await Document.addOrUpdate(
      res.locals.user._id,
      req.body.title,
      req.body.form,
      text
    );
  }
  pdf.pipe(res);
  pdf.on("error", (err) => {
    res.removeHeader("Content-Type");
    res.status(400).send(JSON.stringify({ error: err.message }));
  });
  pdf.on("finish", () => {
    console.log("All writes are now complete.");
  });
};
