const { requireAuth } = require("../middleware/authMiddleware");

module.exports.profile_get = async (req, res) => {
  console.log("heree");
  requireAuth(req, res);
  // var mess = {message: "0"};
  // res.status(200).send({mess});
  // res.render('login');
};

module.exports.profile_post = async (req, res) => {
  
};
