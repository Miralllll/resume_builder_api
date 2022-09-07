const { requireAuth } = require("./token");
// const Document = require("../models/Document");

module.exports.profile_get = async (req, res) => {
  console.log("get");
  console.log("here" + req.body + " " + res);
  if(res.locals.user === null) res.status(401).send();

  res.status(200).send();
};

module.exports.profile_post = async (req, res) => {
  console.log("post");
  console.log(res.locals.user_id);
  if(res.locals.user === null) res.status(401).send();
  // try {
  //   // const user = await Document.create({createdBy: res.locals.user });
  //   // cookie send json webtoken
  //   // it created token forest
  //   res.status(201).json({ user: user._id });
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json({ });
  // }
  res.status(200).send();
};
