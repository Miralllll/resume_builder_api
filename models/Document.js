const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
var _ = require("lodash");

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
  formInfo: {
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

// static method for updating document
documentSchema.statics.addOrUpdate = async function (
  createdBy,
  title,
  formInfo,
  document
) {
  const file = await this.findOne({ title });
  const update = {
    createdBy: createdBy,
    title: title,
    formInfo: formInfo,
    document: document,
  };
  if (file) {
    const filter = { _id: file._id };
    return await this.findOneAndUpdate(filter, update, {
      new: true,
    });
  } else {
    return await this.create({
      createdBy: createdBy,
      title: title,
      formInfo: formInfo,
      document: document,
    });
  }
};

documentSchema.statics.getAll = async function (user_id, required_fields) {
  const docs = await this.find({ createdBy: user_id });
  try {
    var subset = docs.map((value) => _.pick(value, required_fields));
  } catch (error) {
    console.log(error);
  }
  return subset;
};

const Document = mongoose.model("document", documentSchema);
module.exports = Document;
