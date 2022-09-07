const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secret } = require("../controllers/token");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  console.log(req.cookies);
  if (token) {
    console.log(secret);
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        console.log("decodedtoken" + decodedToken);
        var { id } = decodedToken;
        console.log("err message" + id);
        res.locals.user_id = id;
        next();
      }
    });
  } else {
    console.log("no token");
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log(token);
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };
