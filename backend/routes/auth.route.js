const express = require("express");
const router = express.Router();

const {
  login,
  refreshTokenHandler,
  register,
  logout,
  getMe,
} = require("../controller/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshTokenHandler);

router.get("/me", getMe);

module.exports = router;
