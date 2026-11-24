const express = require("express");
const router = express.Router();

const {
  login,
  refreshTokenHandler,
  register,
  logout,
} = require("../controller/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshTokenHandler);

module.exports = router;
