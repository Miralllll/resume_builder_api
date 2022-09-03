module.exports.logout_get = (req, res) => {
  // delete jwt cookie
  // for this --- we create new cookie that will replace previous one
  // and expires soon
  console.log(req.cookies);
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.status(200).send();
};

module.exports.logout_post = async (req, res) => {
  //
};