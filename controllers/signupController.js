const { createToken, maxAge } = require("./token");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.signup_get = (req, res) => {
  // res.render('signup');
};

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  // duplicates error code
  console.log(err.code);
  if (err.code === 11000) {
    errors.email = "That email is already registered!";
    return errors;
  }
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    // cookie send json webtoken
    // it created token forest
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
