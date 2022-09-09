const { requireAuth } = require("./token");
const Document = require("../models/Document");
const { join, resolve } = require("path");

module.exports.profile_get = async (req, res) => {
  console.log("profile get");
  if (res.locals.user === null) res.status(401).send();
  else res.status(200).send();
};

module.exports.profile_post = async (req, res) => {
  if (res.locals.user === null) {
    res.status(401).send();
    return;
  }
  try {
    var required_fields = ["title", "createdDate", "document"];
    var docs = await Document.getAll(res.locals.user._id, required_fields);
    res.status(200).json({ user_name: res.locals.user.name, docs: docs });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.delete_post = async (req, res) => {
  if (res.locals.user === null) {
    res.status(401).send();
    return;
  }
  const { title } = req.body;
  try {
    await Document.deleteOne({ title: title });
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.add_post = async (req, res) => {
  if (res.locals.user === null) {
    res.status(401).send({ errors: "Not Auth" });
    return
  }
  const { title, formInfo, document } = req.body;
  try {
    var doc = await Document.addOrUpdate(
      res.locals.user._id,
      title,
      formInfo,
      document
    );
    res.status(200).json({ title: doc.title });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
};

module.exports.get_post = async (req, res) => {
  if (res.locals.user === null) {
    res.status(401).send({ errors: "Not Auth" });
    return;
  }
  const { label } = req.body;
  console.log(label);
  try {
    var doc = await Document.findOne({
      createdBy: res.locals.user._id,
      title: label,
    });
    res.status(200).json({ document: doc.document, formInfo: doc.formInfo });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
};
