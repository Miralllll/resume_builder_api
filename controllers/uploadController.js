var express = require("express");
var router = express.Router();
const Document = require("../models/Document");

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
  const pdf = latex(text, options);
  if (res.locals.user !== null && res.locals.user !== undefined) {
      console.log("whyyy" + res.locals.user._id);
      var doc = await Document.addOrUpdate(res.locals.user._id, `doc created by `, req.body.form, pdf);
      console.log(doc);
  }
  pdf.pipe(res);
  pdf.on("error", (err) => {
    // console.log("error" + err.message);
    res.removeHeader("Content-Type");
    res.status(400).send(JSON.stringify({ error: err.message }));
  });
  pdf.on("finish", () => {});
};
