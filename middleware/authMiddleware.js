const jwt = require("jsonwebtoken");
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

module.exports = { requireAuth };
