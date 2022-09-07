const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const documentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  form_info: {
    type: JSON,
    required: true,
  },
  document: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

documentSchema.post("save", function (doc, next) {
  console.log("new user was created and saved", doc);
  next();
});

documentSchema.pre("save", async function (next) {
  console.log("user is about to be created and saved", this);
  next();
});

// static method to login user
documentSchema.statics.addOrUpdate = async function (
  createdBy,
  title,
  form_info,
  document
) {
  const file = await this.findOne({ title });
  const update = {
    createdBy: createdBy,
    title: title,
    form_info: form_info,
    document: document,
  };
  if (file) {
    const filter = { _id: file._id };
    return await Document.findOneAndUpdate(filter, update, {
      new: true,
    });
  } else {
    return await Document.create({
      createdBy: createdBy,
      title: title,
      form_info: form_info,
      document: document,
    });
  }
};

const Document = mongoose.model("document", documentSchema);
module.exports = Document;
