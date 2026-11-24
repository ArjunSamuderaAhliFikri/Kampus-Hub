const mongoose = require("mongoose");
const { College } = require("../model/College.model");

const createCollege = async (req, res) => {
  try {
    const { username, password, gender, address, faculty, nim } = req.body;

    console.log("username : ", username);

    const isExistingCollege = await College.findOne({ username });

    console.log("Existing college : ", isExistingCollege);

    if (isExistingCollege) {
      return res.status(409).json({
        data: [],
        msg: "Username already exists!",
        log: "From existing college",
      });
    }

    const newCollege = await College.create({
      username,
      password,
      gender,
      address,
      faculty,
      nim,
    });

    if (!newCollege) {
      return res.status(401).json({
        msg: "Unvalid data type requirement!",
        log: "Error from Create College Controller!",
      });
    }

    return res
      .status(200)
      .json({ data: req.body, msg: "College created successfully", log: "" });
  } catch (error) {
    res
      .status(500)
      .json({ data: [], msg: error, log: "Error from createCollege" });

    module.exports = { createCollege };
  }
};

const editCollege = async (req, res) => {
  const { id } = req.params;

  // return res.json({ msg: "test" });

  const thereIsCollege = await College.findOne({ _id: id });

  if (!thereIsCollege) {
    return res
      .status(401)
      .json({ data: req.body, msg: "College is not registered yet!" });
  }

  const updatedUser = await College.findOneAndUpdate({ _id: id }, req.body);

  if (!updatedUser) {
    return res
      .status(400)
      .json({ data: req.body, msg: "Failed to updated user!" });
  }

  return res.json({
    msg: "Successfully to updated data college!",
    data: updatedUser,
  });
};

const getAllCollege = async (req, res) => {
  const getAllCollege = await College.find({});

  if (!getAllCollege) {
    return res.status(401).json({
      msg: "Unvalid data type requirement!",
      log: "Error from Get College Controller!",
    });
  }

  return res.status(200).json({
    data: getAllCollege,
    msg: "Get all college successfully",
    log: "",
  });
};

const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        err: "Invalid College ID!",
        msg: "Failed to deleted college!",
      });
    }

    // Find and delete college
    const deletedCollege = await College.findByIdAndDelete(id);

    // Check if college exists
    if (!deletedCollege) {
      return res.status(404).json({
        msg: "College doesn't exist!",
      });
    }

    return res.status(200).json({
      msg: "Successfully deleted college!",
      data: deletedCollege,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { createCollege, getAllCollege, editCollege, deleteCollege };
