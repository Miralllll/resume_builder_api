

module.exports.isauth_get = async (req, res) => {
  console.log("get  fsdfds");
  console.log(res.locals.user);
  if(res.locals.user === null) res.status(200).send();
  else res.status(401).send();
};

module.exports.isauth_post = async (req, res) => {
  console.log("post dsfsfd");
  console.log(res.locals.user);
  if(res.locals.user === null) res.status(200).send();
  else res.status(401).send();
};
