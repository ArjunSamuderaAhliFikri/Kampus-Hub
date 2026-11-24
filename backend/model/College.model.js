const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  nim: {
    type: String,
    required: true,
  },
});

const College = mongoose.model("College", CollegeSchema);

module.exports = { College };
