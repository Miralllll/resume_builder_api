const jwt = require("jsonwebtoken");
const maxAge = 1 * 24 * 60 * 60;
const secret = "I am gonna make it";

// Uses user id (is payload in jwt), sicret, headers
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

module.exports = { createToken, maxAge, secret };
