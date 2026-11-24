const express = require("express");
const router = express.Router();

const {
  createCollege,
  getAllCollege,
  editCollege,
  deleteCollege,
} = require("../controller/college.controller");

router.get("/", getAllCollege);

router.post("/create-college", createCollege);

router.put("/edit-college/:id", editCollege);

router.delete("/delete-college/:id", deleteCollege);

module.exports = router;
