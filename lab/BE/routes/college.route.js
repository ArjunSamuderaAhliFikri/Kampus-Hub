const express = require("express");
const router = express.Router();

const {
  createCollege,
  getAllCollege,
} = require("../controller/college.controller");

router.get("/", getAllCollege);

router.post("/create-college", createCollege);

module.exports = router;
