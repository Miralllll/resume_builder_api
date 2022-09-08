const { createToken, maxAge } = require("./token");
const User = require("../models/User");

module.exports.login_get = (req, res) => {
  console.log("login get");
  res.status(401).send();
};

// handle errors
const handleErrorsLogin = (err) => {
  let errors = { email: "", password: "", name: "" };
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  // incorrect email
  if (err.message === "Incorrect Email") {
    errors.email = err.message;
    return errors;
  }
  // incorrecr password
  if (err.message === "Incorrect Password") {
    errors.password = err.message;
    return errors;
  }
  return errors;
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if those are valid
    const user = await User.login(email, password);
    // create jwt if they are valid
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: true,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrorsLogin(err);
    res.status(400).json({ errors });
  }
};
