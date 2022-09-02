const { requireAuth } = require("./token");

module.exports.profile_get = async (req, res) => {
  console.log("get");
  console.log("here" + req.body + " " + res);
};

module.exports.profile_post = async (req, res) => {
  console.log("post");
  console.log(res.locals.user_id);
};
