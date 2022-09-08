const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Empty Name"],
  },
  email: {
    type: String,
    required: [true, "Empty Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: [true, "Empty Password"],
    minlength: [6, "Password must be at least 6 Characters"],
  },
});

// mongoose hook
// fire a function after doc saved to db
// this function appears when we will save new document in the db
userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved", doc);
  next();
});

// fire a function before doc saved to db
// this function appears when we will save new document in the db
userSchema.pre("save", async function (next) {
  // hash password before saving in db with bcrypt
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("user is about to be created and saved", this);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    // compare passwords --- we need to hash it
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
