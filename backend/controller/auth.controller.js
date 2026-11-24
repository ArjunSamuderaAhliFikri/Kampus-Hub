const { College } = require("../model/College.model");
const { Admin } = require("../model/Admin.model");
const { RefreshToken } = require("../model/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/JWTToken");

const register = async (req, res) => {
  try {
    const { username, password, nim } = req.body;

    if (!username || !password || !nim) {
      return res
        .status(400)
        .json({ error: "Username, password, dan NIM harus diisi!" });
    }

    const isAccountExist = await College.findOne({ username, nim });

    if (!isAccountExist) {
      return res.status(404).json({ error: "Data mahasiswa tidak ditemukan!" });
    }

    if (isAccountExist.isActive) {
      return res.status(400).json({ error: "Akun sudah terdaftar!" });
    }

    const enabledAccount = await College.findOneAndUpdate(
      {
        _id: isAccountExist._id,
      },
      { username, password, nim, isActive: true },
      { new: true },
    );

    if (!enabledAccount) {
      return res.status(500).json({ error: "Akun tidak berhasil diaktifkan!" });
    }

    return res.json({ message: "Registrasi berhasil! Silakan login." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username or Password harus di isi!",
        user: null,
      });
    }

    const isValidCollege = await College.findOne({ username, password });

    let payload = null;
    let userDoc = null;

    if (isValidCollege && isValidCollege.isActive) {
      payload = {
        userId: isValidCollege._id,
        username: isValidCollege.username,
        role: "mahasiswa",
      };
      userDoc = isValidCollege;
    } else {
      const isValidAdmin = await Admin.findOne({ username, password });

      if (isValidAdmin) {
        payload = {
          userId: isValidAdmin._id,
          username: isValidAdmin.username,
          role: "admin",
        };
        userDoc = isValidAdmin;
      }
    }

    if (!payload || !userDoc) {
      return res.status(401).json({
        error: "Username atau password salah, atau akun belum aktif!",
        user: null,
      });
    }

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await RefreshToken.findOneAndUpdate(
      { userId: userDoc._id },
      {
        userId: userDoc._id,
        token: refreshToken,
        expiresAt: expiresAt,
      },
      { upsert: true, new: true },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    return res.json({
      message: `Berhasil login sebagai ${payload.role}!`,
      user: payload,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.body?.refreshToken || req.cookies?.refresh_token;
    const userId = req.body?.userId;

    if (token) {
      await RefreshToken.deleteOne({ token });
    } else if (userId) {
      await RefreshToken.deleteOne({ userId });
    }

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.json({ message: "Logout berhasil!" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.body?.refreshToken ||
      req.cookies?.refresh_token ||
      req.headers["x-refresh-token"];

    const userId = req.body?.userId;

    let tokenDoc = null;

    if (incomingRefreshToken) {
      const decoded = verifyRefreshToken(incomingRefreshToken);

      tokenDoc = await RefreshToken.findOne({
        token: incomingRefreshToken,
        userId: decoded.userId,
      });

      if (!tokenDoc) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Refresh token tidak valid atau telah dicabut!",
        });
      }
    } else if (userId) {
      tokenDoc = await RefreshToken.findOne({ userId });

      if (!tokenDoc) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Refresh token untuk user ini tidak ditemukan!",
        });
      }

      verifyRefreshToken(tokenDoc.token);
    } else {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Refresh token atau User ID tidak ditemukan!",
      });
    }

    let userDoc = await College.findById(tokenDoc.userId);
    let role = "mahasiswa";

    if (!userDoc) {
      userDoc = await Admin.findById(tokenDoc.userId);
      role = "admin";
    }

    if (!userDoc) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Akun user tidak ditemukan!",
      });
    }

    // Untuk mahasiswa, cek isActive
    if (role === "mahasiswa" && !userDoc.isActive) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Akun mahasiswa sedang tidak aktif!",
      });
    }

    const newPayload = {
      userId: userDoc._id,
      username: userDoc.username,
      role: role,
    };

    const newAccessToken = generateAccessToken(newPayload);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    return res.json({
      message: "Token berhasil diperbarui!",
      accessToken: newAccessToken,
      user: newPayload,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error.message);
    return res.status(403).json({
      error: {
        name: error.name,
        message: "Refresh token tidak valid atau sudah kadaluarsa!",
      },
    });
  }
};

module.exports = { register, login, logout, refreshTokenHandler };
