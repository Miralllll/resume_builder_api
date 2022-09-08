module.exports.isauth_get = async (req, res) => {
  if (res.locals.user === null) res.status(200).send();
  else res.status(401).send();
};

module.exports.isauth_post = async (req, res) => {
  if (res.locals.user === null) res.status(200).send();
  else res.status(401).send();
};
