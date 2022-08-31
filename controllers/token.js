const maxAge = 1 * 24 * 60 * 60;

// Uses user id (is payload in jwt), sicret, headers
const createToken = (id) => {
  return jwt.sign({ id }, "I am gonna make it", {
    expiresIn: maxAge,
  });
};

module.exports = { createToken, maxAge };
