const { createToken, maxAge } = require("./token");
const User = require("../models/User");

module.exports.login_get = (req, res) => {
  console.log("here");
  res.status(401).send();
};

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  // incorrect email
  if (err.message === "Incorrect Email") {
    errors.email = "That email is not registered!";
  }
  // incorrecr password
  if (err.message === "Incorrect Password") {
    errors.password = "That password is not correct!";
  }
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.login_post = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // check if those are valid
    const user = await User.login(email, password);
    console.log(user);
    // create jwt if they are valid
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000, secure: true,});
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
