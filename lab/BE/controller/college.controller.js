const { College } = require("../model/College.model");

const createCollege = async (req, res) => {
  try {
    const { username, password, gender, address, faculty } = req.body;

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

module.exports = { createCollege, getAllCollege };
